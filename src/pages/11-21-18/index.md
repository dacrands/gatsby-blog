---
_id : 10
path: '/11-21-18'
title: 'How NOT to Create a Dropbox Clone'
tags: ['Flask','Python','os library']
--- 

*This post is a WIP*

![flask file app](https://i.imgur.com/LE7G4bH.jpg)

I recently built a file-hosting application using Flask. Nothing fancy &mdash; users can upload, download, and delete files. The catch, however, is that the files are saved directly on the server and that's not good. 

It's not good because I need that server space, and common file types (e.g., images, powerpoints, etc.) are **massive**. Consequently, it won't be very long until I run out of memory and things go horribly wrong.

The solution is to host your files on an [Amazon S3](https://aws.amazon.com/s3/), which thanks to the library [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) is quite easy. I will dedicate another post to discuss how I converted this app from hosting the files from the server to S3, but first let's look at the **wrong** way to create a file-hosting app.

## The App
---

This application is a highly modified version of [Flask's documentation on file-uploading](http://flask.pocoo.org/docs/1.0/patterns/fileuploads/). Before I present the code, here are a few key-points:

- It's important to designate what files users can upload. This ensures no one will upload a file that runs on our server and causes damage, such as those with a `.bash` file-extension.

  ```python
  ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'])
  ```
  <br/>

- We import `secure_filename` from `werkzeug` to, well, secure our filenames before saving it. Here is a description of `secure_filename` from the docs:
  > Pass it a filename and it will return a secure version of it. This filename can then safely be stored on a regular file system and passed to os.path.join(). The filename returned is an ASCII only string for maximum portability.

<br/>

- We need to use the *os* library to create/delete folders for each user and save/delete files to/from the local machine. 
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





## How it works
---



## Schemas
---




