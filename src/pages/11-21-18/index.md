---
_id : 10
path: '/11-21-18'
title: 'How NOT to Create a Dropbox Clone'
tags: ['Flask','Python','os library']
--- 

*This post is a WIP*

![flask file app](https://i.imgur.com/LE7G4bH.jpg)

I recently built a file-hosting application using Flask. Nothing fancy &mdash; users can upload, download, and delete files. The catch, however, is that the files are saved directly on the server, and that's not good. 

It's not good because I need that server space, and common file types (e.g., images, powerpoints, etc.) can be **massive**. Consequently, it won't be very long until I run out of memory and things go horribly wrong.

The solution is to host your files on an [Amazon S3](https://aws.amazon.com/s3/), which is quite easy thanks to the library [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html). I will dedicate another post to discuss how I converted this app from hosting the files from the server to S3 (namely because I am still building the S3 version), but first let's look at the **wrong** way to create a file-hosting app.

## Introduction
---

This application is a highly modified version of [Flask's documentation on file-uploading](http://flask.pocoo.org/docs/1.0/patterns/fileuploads/). Before I present the code, here are a few key-points:

- **It's important to designate what files users can upload.** This ensures no one will upload a file that runs on our server and causes damage, such as those with a `.bash` file-extension.

  ```python
  ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'])
  ```
  <br/>

- **You need to secure your file names.** We import `secure_filename` from `werkzeug` to, well, secure our filenames before saving it. Here is a description of `secure_filename` from the docs:
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

Now that we have a 

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

Here is the primary logic of the application. It has not been refactored or cleaned up at all, since I've been converting this to us *S3*. 

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

1. Is the `POST` request sending files?

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

3. Make sure we support the file extension and pass it to `secure_filename` (described above)

    ```python
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
    ``` 
<br/>

4. Ensure user doesn't already have a file with the same name.

     To prevent naming collisions, each file name must be unique.
     Note the filename includes the extension, so a user can
     have `user.docx` and `user.ppt` but not two `user.docx` files.

    ```python
    for f in files:                
        if f.name == filename:
            flash('You already have a file with that name! Please rename your file and upload.')
        return redirect(url_for('index'))
    ``` 
<br/>

### User Folders
All files are uploaded to an `UPLOAD_FOLDER` whose configured in `config.py`

Each user has a designated directory to upload files to, which is named using the user's id. 
Whenever a user upload's a file, we check to see if this user has a folder via `os.path.exists()` If the user doesn't have a folder, we create one using `os.mkdir()`

```python
if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], str(current_user.id))):
    os.mkdir(os.path.join(
        app.config['UPLOAD_FOLDER'], 
        str(current_user.id)))
```
<br/>


## Schemas
---




