---
_id : 9
path: '/10-7-18'
title: 'Hide Your Keys, Folks (Part II)'
tags: ['Python', 'virtual environments', 'pip', 'Requests']
--- 
![Bank Vault](https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/WinonaSavingsBankVault.JPG/1024px-WinonaSavingsBankVault.JPG)

*(This blog post is a work in progress.)*

In the [last installment](https://dacrands.github.io/9-27-18), we discussed some ways in which front-end developers can protect their API-keys. We came to the conclusion that to truly protect your API-keys, you will need a designated back-end &mdash; a proxy server &mdash; to handle your API calls.

In this example we will be using *Flask* to create such an application, though the general concept can be easily applied by developers of any stack. The idea is that our front-end application will send a request to our *Flask* app. Then our app, based on the request from the client, will send a request to the API. In doing so, we no longer need an API-key to be present in the client request since it will be handled by our back-end.

## Table of Contents
---

- [Prerequisites](#prereq)
  <!-- - [Git/Github](#git)   -->
- [What we're making](#theApp)
- [Environments](#env)
  <!-- - [Create an Environment](#createEnv) -->
  <!-- - [Activate an Environment](#activeEnv) -->
- [App It Up](#appItUp)
  <!-- - [\__init__.py](#init) -->
  <!-- - [routes.py](#routesPy) -->
  <!-- - [run.py](#run) -->
  <!-- - [FLASK_APP](#flaskApp) -->
- [Configuration](#config)
  <!-- - [config.py](#configPy) -->
- [Requests](#requests)
  <!-- - [Let's make a request](#makeRequest) -->
- [Routes](#requests)
- [Hosting](#hosting)
  <!-- - [Download Heroku](#heroku) -->

<a id="prereq"></a>

## Prerequisites
---

- an API you're interested in and any necessary keys. [Here a big list of APIs](https://apilist.fun/)
- Basic command-line skills
- Python 3
- Git/Github

My goal is to make this tutorial accessible to front-end developers with limited back-end experience, including developers who have never used Python. Luckily, Python syntax is very semantic and intuitive, so hopefully developers from other stacks will have no problem following along with the examples used in this post.

If you're a back-end developer, this is not for you. You know what to do already. This is for our beginner front-end developers who want to hide their keys, nothing more.

<a id="git"></a>

### Git/Github
At some point in this project, you will need to create a git repo. At what point in the application you integrate version-control is up to you, but having basic git-skills is needed for when we host the finished-product on *Heroku.*


<a id="theApp"></a>

## What We're Making
---

![Imgur](https://i.imgur.com/8RAVXwH.png)

Here is [Github repo](https://github.com/dacrands/flask-blog-tutorial) for what we're building.

This app is an extremely minimal Flask app. We don't need a database, we just need a server to make requests to our API and pass JSON to our React/Redux app. Of course, there will be vulnerabilities in this app, but your API-key will be safe and others will take note of your effort to keep it secret (hopefully).

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

### pip


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

### requirements.txt
```
(flaskenv) C:\api-app\> pip freeze > requirements.txt
```

This will save your packages to a file that can be used to install your app dependencies.

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


<a id="routesPy"></a>

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

## Debug
---


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

![JSON view example](https://i.imgur.com/KSS78J5l.jpg)

Now what you see in the browser when you visit `localhost:5000` should look **exactly** the same as when you place the actual API URL in the browser. The primary difference, of course, is now your API-key will not appear in the response:

![Example of response with no API-key](https://i.imgur.com/4jtwzwdl.jpg)

<!-- ### More routes -->


### Development

When developing, the only thing you need to do is make sure your front-end app and back-end app are listening on different ports. For example, your front-end app will run on port `8000` and your back-end app will run on port `5000`.

<a id="hosting"></a>

## Hosting
---

<!-- Your basic application is now in place, so how do you use it? Well it needs to be hosted on a server. We are going to configure two servers: one for  **development** and one for **production**. The development server will be served locally on your machine &mdash; this is the server you will use while you build and debug your front-end application. The production will be hosted on [Heroku](https://www.heroku.com/), which offers both free and reasonably priced monthly plans ($7 a month).  -->

<!-- Configuring the development server will be extremely easy. In fact, it's about one line from the console. The production server, however, will take a bit more effort. Heroku will provide you -->




<!-- #### Run on a different machine

Although you can run both your front-end and back-end on the same computer, you may not want to. Luckily, provided you have Python configured on another machien

First, find our your IP-address. If you have *PowerShell,* run the following:

```ps
C:\> Get-NetIPAddress
```
<br>

In the output, look for the IP-address starting with `192.168.0.xxx`

Once you have your IP-address, run the following in the console.

```commandline
(flaskenv) C:\api-app\>flask run --host 0.0.0.0
```

<br>

Now visit the following in the browser:
```
192.168.0.xxx:5000
```
<br>

Okay, so what's the difference between this and simply running the 
Now find another device with a web-browser and visit the same address. It still works! How cool is that? Now you can free up `localhost` to host your front-end application &mdash; just point it to API-calls to `192.168.0.xxx:5000`. -->

We will use *Heroku* to host our application since it is the most user-friendly option, however I suggest you check out *Digitalocean,* go through some tutorials, and challenge yourself a bit. Otherwise, *Heroku* is still an excellent and popular hosting service.

<a id="heroku"></a>

### Download Heroku

The first thing you need to do is [download the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and go through the tutorial &mdash; this will take you through the proces of creating your first heroku app.

We will be using Heroku's free plan, because it's free. The catch, however, is that your application will turn off after 30 minutes. If you decide to upgrade your plan to `hobby`, it's only about $7 a month depending on your site's traffic.

### Gunicorn
```
(flaskenv) C:\api-app\> pip install gunicorn
```
<br>

[Gunicorn](https://gunicorn.org/) is a "Python WSGI HTTP Server for UNIX." Basically it will provide the production server for our application. 


### Procfile
We need to tell Heroku how to run our application &mdash; this is where the `Procfile` comes in. In the `Procfile` we will tell our `dyno` (the server instance our application is running on) what it should do once the server starts up.

Create a new file in the root-directory named `Procfile` &mdash; no extensions, simply **Procfile**
```
api-app/
  app/
    __init__.py
    routes.py
  run.py
  config.py
  requirements.txt
  Procfile
```
<br>

Inside your `Procfile`, add the following code:

```
web: gunicorn: run:app
```
<br>

First, `web` defines our process &mdash; this tells our `dyno` that we want a web-server. Second, we pass `run:app` to `gunicorn` to start our server, where `run` refers to `run.py` and `app` refers to the `app` we've created, i.e., the one imported in `run.py`.

Now that our serve is in place, let's  configure our environment variables.

### heroku config

You can configure environment variables in two ways with Heroku:
1. Through the Heroku dashboard on their site
2. Through the `Heroku CLI`

Since this is a programming tutorial, we'll be using the CLI to configure the two environment variables used in this application. Also, Heroku has a really cool CLI.

Run the following in the terminal:

```commandline
(flaskenv) C:\api-app\>heroku config:set FLASK__APP=run.py
...
(flaskenv) C:\api-app\>heroku config:set API_KEY=<YOUR_API_KEY>
```
<br>

### git push heroku master

Now comes the moment of truth &mdash; pushing your `master` branch to Heroku. Two item checklist before pushing to Heroku:

1. Make sure all necessary packages are in your `requirements.txt` file:
```
(flaskenv) C:\api-app\> pip freeze > requirements.txt
```
<br>
2. Make sure your `master` branch is up to date.

And that's about it. If you've done those two things, then you're ready to push to Heroku:

```
(flaskenv) C:\api-app\>git push heroku master
```

<br>

You should see some command-line output, followed by `Verifying deploy... done.`

Now open your app and see your data:
```
(flaskenv) C:\api-app\>heroku open
```
<br>

When the site opens in your browser, you should see your JSON.

And that's about it. When you're ready to show your app to people you can upgrade your plan and the server won't turn off after thirty-minutes.


## Conclusion

This is only a start. Obviously anyone could potentially create target your heroku-app since we did not implement CORS, but it's better than leaving your keys in the code or making API calls directly from the client. By implementing an app such as this you demonstrate you're a front-end developer who is security conscious, which is important.





















