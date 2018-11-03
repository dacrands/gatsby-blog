---
_id : 9
path: '/10-7-18'
title: 'Hide Your Keys, Folks (Part II)'
tags: ['Python', 'virtual environments', 'pip', 'Requests']
--- 
![Bank Vault](https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/WinonaSavingsBankVault.JPG/1024px-WinonaSavingsBankVault.JPG)

*(This blog post is a work in progress.)*

In the [last installment](https://dacrands.github.io/9-27-18), we discussed some ways in which front-end developers can protect their API-keys. .We came to the conclusion that to truly protect your API-keys, you will need a designated back-end &mdash; a proxy server &mdash; to handle your API calls.

In this example we will be using *Flask* to create such an application, though the general concept can be easily applied by developers of any stack. The idea is that our front-end application will send a request to our *Flask* app. Then our app, based on the request from the client, will send a request to the API. In doing so, we no longer need an API-key to be present in the client request since it will be handled by our back-end.

## Table of Contents
---

- [Prerequisites](#prereq)
- [What we're making](#theApp)
- [Environments](#env)
  - [Create an Environment](#createEnv)
  - [Activate an Environment](#activeEnv)
- [App It Up](#appItUp)
  - [\__init__.py](#init)
  - [routes.py](#routes)
  - [run.py](#run)
  - [FLASK_APP](#flaskApp)
- [Configuration](#config)
  - [config.py](#configPy)
- [Requests](#requests)
  - [Let's make a request](#makeRequest)

<a id="prereq"></a>

## Prerequisites
---

- an API you're interested in and any necessary keys. [Here a big list of APIs](https://apilist.fun/)
- Basic command-line skills
- Python 3

My goal is to make this tutorial accessible to front-end developers with limited back-end experience, including developers who have never used Python. Luckily, Python syntax is very semantic and intuitive, so hopefully developers from other stacks will have no problem following along with the examples used in this post.

If you're a back-end developer, this is not for you. You know what to do already. This is for our beginner front-end developers who want to hide their keys, nothing more.

<a id="theApp"></a>

## What We're Making
---

![Imgur](https://i.imgur.com/8RAVXwH.png)

This app is an extremely minimal Flask server. We don't need a database, we just need a server to make requests to our API and pass JSON to our React/Redux app. Of course, there will be vulnerabilities in this app, but your API-key will be safe and others will take note of your effort to keep it secret (hopefully).

If you're looking for an in-depth introduction to Flask, Miguel Ginberg's [Flask mega tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) is excellent.


<a id="env"></a>

## Environments
---

For any Python project, regardless of it's size or complexity, it's a good idea to create a virtual environment. This ensures that as libraries update and backwards-compatability becomes an issue, your app will still work.

<a id="createEnv"></a>

### Create an Environment

When it comes to Python, I'm an  [Anaconda](https://www.anaconda.com/) person. Anconda is basically Python but it comes bundled with a lot of data-science libraries and other features like [Jupyter Notebooks](http://jupyter.org/). I suggest you give it a try. 

Find the [download instructions](https://www.anaconda.com/download) for your OS and install Anaconda. If you don't use Anaconda, here are the instructions for [creating a virtualenv with pip](https://packaging.python.org/guides/installing-using-pip-and-virtualenv/). We will only being using `conda`, the Anaconda CLI, for creating our environment and downloading `pip`. After that, we will use `pip` for everything else.


Now that that's out of the way, go ahead and create an environment for your Flask app using `conda`:

```commandline
C:\> conda create --name flaskenv
```

<br>

This will create a virtual environment named `flaskenv`.
To see a list of your virtual environments, run the following:

```commandline
C:\> conda info --env
```
<br>

This will print a list of your environments to the console. Learn more about [managing environments with conda](https://conda.io/docs/user-guide/tasks/manage-environments.html).

<a id="activeEnv"></a>

### Activating an Environment

I will demonstrate how to activate a Python environment on a Windows OS, simply because Windows users have it hard enough as it is.


I love *PowerShell,* but when it comes to Python virtual-environments, you'll want to use the command prompt. We have a lot to cover in this post, so I won't go in-depth as to why we are using the latter versus the former, though I encourage you to play around with both options to discover the answer organically.

```commandline
C:\> activate flaskenv
(flaskenv) C:\> 
```

<br>



Once your environment is activated, you can start installing your packages. The first package you will need is `pip`, as this is how we will be downloading our packages. I know this may appear a bit strange to download a package-manager inside a package-manager, but it demonstrates the flexibility of using `conda`.

```
(flaskenv) C:\> conda install pip

```

<br>

Now we can use `pip` to install our packages, but always make sure your environment is active before doing so. If your environment is not active, not only will you be downloading all of those packages globally on your machine, but you will not be able to save the packages you use to the `requirements.txt` file, which is used to automatically download all of the packages in your application (Think of the `requirements.txt` as a `package.json` because it essentially is).



Once you install `pip`, you can install `flask` using `pip`.

```
(flaskenv) C:\> pip install flask

```

<br>

Presuming everything went smoothly, we can move on to creating our app.

<a id="appItUp"></a>

## App It Up
---

Create a new directory `api-app` with the following structure:

```
api-app/
  app/
    __init__.py
    routes.py
  run.py
```

<br>

<a id="init"></a>

### \__init__.py

```python
from flask import Flask

app = Flask(__name__)
```

<br>

If you'd like to learn more about Python class and OOP, [this article](https://jeffknupp.com/blog/2014/06/18/improve-your-python-python-classes-and-object-oriented-programming/) by Jeff Knupp is a good start.

Here we are assigning an instance of the `Flask` class to the variable `app`. As your app becomes more complex, you will pass this class instance to other libraries. For example:



```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)
```
*Note: This example is not part of this project.*
<br>

This is how inheritance works in Python. The SQLAlchemy class (the child class) instance inherits `app` (the parent class) &mdash; this provides the child class with the attributes and methods of the parent class.

Passing `__name__` to `Flask` tells Python the proper way to execute the file. This has to do with how Python executes programs. For more information, you may reference [this stackoverflow post](https://stackoverflow.com/questions/419163/what-does-if-name-main-do).


<a id="routes"></a>

### routes.py

```python
from app import app

@app.route('/')
def index():
    return 'Hello, World!'
```

<br>

For brevity sake, we won't delve too much into the syntax here. Hopefully it's somewhat readily apparent what is happening here. If it's not, it will be as we create more routes.

Now that we have a route created, we can import our routes into our `__init__.py` file.

```python
# app/__init__.py
from flask import Flask

app = Flask(__name__)

from app import routes
```

<br>

We place the routes import at the bottom to avoid what's known as a *circular dependency* &mdash; you can learn more about this issue [here](https://stackabuse.com/python-circular-imports/).

<a id="run"></a>

### run.py
```python
from app import app
```

<br>

That's all the file requires. To clarify,  `app` is the Flask instance we created in `__init__.py`, and it is a member of the `app` package. The `app` package refers to the `/app` folder in our directory, thus why in our `__init__.py` file we are able to import our `routes` from `app`.

<!-- ```
/app
  routes.py
``` -->

<!-- <br> -->

<a id="flaskApp"></a>

### FLASK_APP
```
(flaskenv) C:\api-app\>set FLASK_APP=run.py
```

Flask will look for an environment `FLASK_APP` set to, in this case, `run.py`. This will instruct Flask on the proper way to import our application.


### Run it!
```
(flaskenv) C:\api-app\>flask run
```

<br>

If everything goes smoothly, you can visit your app at `http://127:0.0.0.1:5000/` and hopefully see "Hello, World" in the browser.

<a id="config"></a>

## Configuration
---
We are going to add a `config.py` file to our project. This is where the developer can define some variables that will be used throughout the application. It's a good place to create variables that the developer wants to keep secret, such as API-keys.

Once you add the `config.py` file, your project structure should look something like this:

```
api-app/
  app/
    __init__.py
    routes.py
  run.py
  config.py
```
<br>

Once we create our `config.py`, we need to tell our `app` to use it. Here config is referencing our file `config.py` and not an installed library.

```python
# app/__init__.py
from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from app import routes
```
<br>


<a id="configPy"></a>

### config.py

```python
# app/config.py
import os

class Config(object):
  API_KEY = os.environ.get('API_KEY') or 'nice-try'  
```
<br>

Recall in the first post when we used `process.env.API_KEY` to keep the API out of version-control? Well, `os.environ.get('API_KEY')` is doing the same thing. The configuration object will check to see if the environment variable `API_KEY` exists, if it doesn't we provide a sarcastic fallback.

As a reminder, you set environment variables like this:

```bash
# Bash
$ export API_KEY=someKey
```

```commandline
:: windows
(flaskenv) C:\api-app\> set API_KEY=someKey
```

<br>

As I mentioned this app is minimal, thus our `config.py` only contains one *key*. Yes, a *key*. For JavaScript developers, you can think of our configuration object as a JS-object &mdash; a collection of *key*, *value* pairings. 

For example, accessing the `API_KEY` defined in our `config.py` file will look something like this:

```python
from app import app

...

API_KEY = app.config['API_KEY']
```
<br>

I hope it's becoming clearer what is taking place in our `__init__.py` file. If not, there is no issue with treating this application as a bit of a black-box while you continue learning. I made it made it clear the purpose of this application is hiding your API-key from wrong-doers. For front-end developers with no interest in learning Python, not having a deep-understanding of Python modules is okay. In other words, this blog post is getting quite lengthy and I don't have time to elaborate on the nuances of Python here.

<a id="requests"></a>

## Requests
---

Now that our basic Flask app is in place, we can begin creating the routes our front-end will access. For this tutorial we will only create one route, though the logic is easily replicable for additional routes.


To access the API, we will use the Python's `requests` library. 

Run the following in your terminal:

```
(flaskenv) C:\api-app\> pip install requests
```

<br>

<a id="makeRequest"></a>

### Lets make a request

Close your app if it's running, and enter `python` in your terminal. This will activate the Python command-line, which is where we'll explore the `requests` library.

```commandline
(flaskenv) C:\api-app\>python
Python 3.6.0 |Anaconda custom (64-bit)| (default, Dec 23 2016, 11:57:41) 
[MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>

```
*To exit the Python terminal,  enter* `quit()`*, because* `ctrl-c` *won't do it.*


For this example, let's use an API that doesn't require a key. We will use the [IEX API](https://iextrading.com/developer/docs/), a free stock API.

**Copy this URL:** `https://api.iextrading.com/1.0/stock/market/batch?symbols=fb,f&types=quote,news`

Here `fb` and `f` are ticker symbols for Facebook and Ford, respectively. Even if you pass invalid symbol parameters (i.e., ticker symbols that don't exist), the API response will still return data for valid queries, which is really nice.

Let's make our first request. Enter the following in your Python terminal:

```
>>>import requests
>>>res = requests.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=fb,asdasdasd,f&types=quote,news')
```

<br>

`requests.get()` will make a *GET* request to the passed URL and return a `<Response>` object. This object will have attributes expected in an HTTP response.

For example, let's make sure the request was succcessful:

```
>>> res.status_code
200
```
<br>

If everything goes well, we get the glorious status code of `200`.

Since we know our request was successful, let's take a look at the data:

```
>>> resJson = res.json()
>>> resJson
{'FB': {'quote': {'symbol': 'FB','companyName': 'Facebook Inc.''primaryExchange': 'Nasdaq Global Select' 'sector':
...
```

<br>

Sorry for the console dump, but you get a sense of the data. By calling `res.json()` we can now index our data, so let's get some data that's a bit more managable:

```
>>> resJson['FB']['quote']['open']
145.83
```

<br>

I encourage you to play around a bit with the `requests` library. Otherwise, let's get back to the app.

## Routes
---

Make the following modifications to `app/routes.py`:
```python
from app import app
from flask import jsonify
import requests

@app.route('/')
def index():
    res = requests.get(
        'https://api.your-api.com/something.json?api-key={0}'
        .format(app.config['API_KEY']))
    
    if res.status_code != 200:
        errData = {'status': res.status_code, 'error': 'There was an error'}
        return jsonify(errData), res.status_code

    apiData = jsonify(res.json())
    return apiData
```

<br>

As you can see, we pass our `res.json()` to `jsonify()`, which is imported from `flask`. This is because `res.json()` does not provide the encoding we need. By passing our data to `jsonify`, we now get a flask *Response* object that will properly serialize our data as *application/json* mimetype.

Visit `http://localhost:5000` and you should see a whole bunch of data. If you use *Chrome,* [download JSON view](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en). *JSON view* will format your JSON data so it doesn't appear as one big mess in your browser.

Once you download *JSON view,* you should see something like this when you access the route:

![Imgur](https://i.imgur.com/KSS78J5l.jpg)

## Hosting
---

So your basic application is now in place, so how do you use it?















