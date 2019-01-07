---
_id : 10
path: '/11-21-18'
title: 'How NOT to Create a Dropbox Clone'
tags: ['Flask','Python','os library']
--- 

![flask file app](https://i.imgur.com/LE7G4bH.jpg)

I recently built a file-hosting application using Flask. Nothing fancy &mdash; users can upload, download, and delete files. The catch, however, is that the files are saved directly on the server, and that's not good. 

It's not good because I need that server space, and common file types (e.g., images, powerpoints, etc.) can be **massive**. Consequently, it won't be very long until I run out of memory and things go horribly wrong.

The solution is to host your files on an [Amazon S3](https://aws.amazon.com/s3/), which is quite easy thanks to the library [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html). I will dedicate another post to discuss how I converted this app from hosting the files from the server to S3 (namely because I am still building the S3 version), but first let's look at the **wrong** way to create a file-hosting app.

## Introduction
---

This application is a highly modified version of [Flask's documentation on file-uploading](http://flask.pocoo.org/docs/1.0/patterns/fileuploads/). Before I present the code, here are a few key-points:

- **It's important to designate what files users can upload.** This ensures no one will upload a file that runs on our server and causes damage, such as those with a *.bash* file-extension.

  ```python
  ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'])
  ```
  <br/>

- **You need to secure your file names.** We import *secure_filename* from *werkzeug* to, well, secure our filenames before saving it. Here is a description of *secure_filename* from the docs:
  > Pass it a filename and it will return a secure version of it. This filename can then safely be stored on a regular file system and passed to os.path.join(). The filename returned is an ASCII only string for maximum portability.

<br/>

- **os library does the heavy lifting.** We need to use the *os* library to create/delete folders for each user and save/delete files to/from the local machine. 
  ```python
  import os
  ...
  # Grab the user folder
  user_file_path = os.path.join(app.config['UPLOAD_FOLDER'], 
                                str(current_user.id))
  # Save the uploaded file(s) to the user's dir
  file.save(os.path.join(user_file_path, filename))
  ```
  <br/>

Now that we covered some of the key points, let us take a look at some code.

<!-- Once users authenticate their account, they may upload files with the following extensions:


| Office | Images | Other |
|:------:|:-----:|:-----:|
| docx | jpg  | pdf  |
| xlsx | png  | txt  |
| ppt  | gif  |      |

These file extensions reflect what I would typically keep on Google drive, Dropbox, or a USB drive. 

```python
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'])

``` -->

<br />

## The Heart of the App
---

Here is the primary logic of the application. It has not been refactored or cleaned up at all since I've been converting this to *S3*. If I were to modify this, I would move the file validation and saving logic to separate functions, but for the purposes of this tutorial having all the logic in one place is more convenient.

If the code below doesn't make much sense, don't worry. In the next section I will be break down precisely what's happening here.

```python
import os
from flask import render_template, redirect, flash, request, \
    url_for, send_from_directory
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.utils import secure_filename
from werkzeug.urls import url_parse
from app import app, db
from app.models import User, File
from app.forms import LoginForm, RegistrationForm, DeleteUserForm

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
@login_required
def index():
    files = current_user.files
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # see if user has file of same name
            # if so, prompt them to rename the file
            for f in files:                
                if f.name == filename:
                    flash('You already have a file with that name! Please rename your file and upload.')
                    return redirect(url_for('index'))
            # make user's dir using ID
            if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], str(current_user.id))):
                os.mkdir(os.path.join(
                    app.config['UPLOAD_FOLDER'], str(current_user.id)))
            user_file_path = os.path.join(
                app.config['UPLOAD_FOLDER'], str(current_user.id))
            file.save(os.path.join(user_file_path, filename))
            user_file = File(path=os.path.join(user_file_path, filename),
                             rel_path=os.path.join(
                                 str(current_user.id), filename),
                             name=filename,
                             user_id=current_user.id)
            db.session.add(user_file)
            db.session.commit()
            flash('File uploaded!')
            return redirect(request.url)
    return render_template('index.html', files=files, user=current_user)
```

<br />


## Uploading Files
---
I won't delve into the authentication aspect of this application because it's fairly trivial. In terms of the file-uploading, users must be logged in to upload and download files. Additionally, users are unable to modify or access the files of other users.

Now let's take a look at the file-uploading logic. 

### Check the File(s)
Before a user upload's a file, we need to check a number of things.

1. Is the *POST* request sending files?

    We only want to be implementing logic if user is uploading files, otherwise
    someone is using the route improperly and will be redirected.
    ```python
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    ``` 
<br/>

2. Check to see if there is a file in the request.
    
    So we already know that the response object contains the files key,
    but does it contain any files? That's what is being asked here.

    ```python
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    ``` 
<br/>

3. Make sure we support the file extension and pass it to *secure_filename* (described above)

    ```python
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
    ``` 
<br/>

4. Ensure user doesn't already have a file with the same name.

     Currently, each user has one folder to upload files to.
     Thus, to prevent naming collisions, each file name must be unique.
     Note the filename includes the extension, so a user can
     have *user.docx* file and *user.ppt* file but not two *user.docx* files.

    ```python
    for f in files:                
        if f.name == filename:
            flash('You already have a file with that name! Please rename your file and upload.')
        return redirect(url_for('index'))
    ``` 
<br/>

### User Folders
All files are uploaded to an *UPLOAD_FOLDER* whose location is configured in *config.py* &mdash; all user folders are a child of this folder.

Each user has a designated directory to upload files to, which is named using the user's id. 
Whenever a user upload's a file, we check to see if this user has a folder via *os.path.exists()*. If the user doesn't have a folder, we create one using *os.mkdir()*

```python
if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], str(current_user.id))):
    os.mkdir(os.path.join(
        app.config['UPLOAD_FOLDER'], 
        str(current_user.id)))
```
<br/>

Once we have a folder for our user, we grab its absolute path and save it to a variable.
This makes the code a bit cleaner for when we save the file. Note that *file* is referencing  *file = request.files['file']* from the *POST* request described above.

```python
user_file_path = os.path.join(
    app.config['UPLOAD_FOLDER'], str(current_user.id))
# Save file 
file.save(os.path.join(user_file_path, filename))
```
<br/>

And that's about it in terms of the file-uploading logic. Now let's look at the database for this application.

## Database
---

First, let's cover some general information. This application's database uses *Postgresql* for deployment, *Sqlite3* for development, and was written using the *SQLAlchemy* ORM. 

The database is built on a one-to-many between the *\<User\>* and *\<File\>* models, i.e., each *User* has a relationship to many objects in the *File* table. 

### Schemas
Take note of the *file* attribute on the *\<User\>* model and the *user_id* attribute on the *\<File\>*, for this is how we connect the two tables.

```python
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    files = db.relationship('File', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.email)

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(120))
    path = db.Column(db.String(240))
    rel_path = db.Column(db.String(120))
    def __repr__(self):
        return '<File {}>'.format(self.path)
```
<br />

Here I will use a modified version of the [SQLAlchemy docs](https://docs.sqlalchemy.org/en/latest/orm/backref.html) to describe what is happening in the *file* attribute:

> The above configuration establishes a collection of File objects on User called User.files. It also establishes a .user attribute on Address which will refer to the parent User object.


I am also using *lazy='dynamic'*, which is a bit of a controversial issue. Essentially the argument is meant to deal with large databases and loading of collections, though I've uncovered some [discussions on github](https://github.com/mitsuhiko/flask-sqlalchemy/issues/435) that indicate it may be not improve performance. Either way, it is a bit beyond the scope of this post.

## Conclusion
---

That's pretty much it. Despite the fact this project is very practically for the reasons mentioned earlier, it provided my first exposure to file uploading and I learned a fair-amount.

However, the best thing to come from this application is that is led me to *S3*, which will enable me to do some really awesome things. 

