---
_id : 9
path: '/10-7-18'
title: 'Hide Your Keys, Folks (Part II)'
tags: ['Python', 'virtual environments', 'pip', 'Requests']
--- 
![Bank Vault](https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/WinonaSavingsBankVault.JPG/1024px-WinonaSavingsBankVault.JPG)

In the [last installment](https://dacrands.github.io/9-27-18), we discussed some ways in which front-end developers can protect their API-keys. Ultimately we came to the conclusion that to truly protect your API-keys, you will need a designated back-end &mdash; a proxy server &mdash; to handle your API calls.

In this example we will be using *Flask* for our back-end, though the general concept can be easily applied by developers of any stack. The idea is that our front-end application will ping our server, our server &mdash; based on the request from the client&mdash; will then access the API. In doing so, we no longer need an API-key to be present in the client request, it will be handled by our back-end.

## Prerequisites
---
My goal is to make this accessible to anyone, including developers who have never used Python. Luckily, Python syntax is very semantic and intuitive, so hopefully developers from other stacks will have no problem following along with the examples used in this post.

Being stack agnostic, you will likely get the most out of this post if you have a general understanding of what servers do, how they handle requests, how they respond, etc. Also, if you're a back-end developer, this is not for you. You know what to do already. This is for our front-end folks who want to hide their keys, nothing more. 


## A Minimal Flask App
---
This app will be extremely minimal. We don't need a database, we just a server to make requests to our API and pass JSON to our Redux app, nothing more. Of course, there will be vulnerabilities in this app, but your API-key will be safe and others will take note of your effort to keep it secret (hopefully).


### Create an Environment
When it comes to Python, I'm an [Anaconda](https://www.anaconda.com/download/) person. If you don't use Anaconda, the following instructions shouldn't be hard to follow using pip.


Now that that's out of the way, go ahead and create an environment for your flask app:

```ps
conda create --name flaskenv
```

<br>

### Activate an Environment
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

Now we can use pip to install our packages, but always make sure your environment is active before doing so. If your environment is not active, not only will you not be downloading all of those packages globally on your machine, but you will not be able to save the packages your use to the `requirements.txt` file, which is used to automatically download all of the packages in your application (Think of the `requirements.txt` as a `package.json` because it essential is).



Once you install `pip`, you can install `flask` using `pip`.

```
(flaskenv) C:\> pip install flask

```

<br>

Presuming everything went smoothly, we can move on to creating our app.


## App It Up
---

A basic flask application has the following structure

```
api-app/
  app/
    __init__.py
    routes.py
  run.py
  requirements.txt
```

<br>

### \__init__.py
```python
from flask import Flask

app = Flask(__name__)
```

If you'd like to learn more about Python class and OOP, [this article](https://jeffknupp.com/blog/2014/06/18/improve-your-python-python-classes-and-object-oriented-programming/) is excellent.

Here we are assigning an instance of the `Flask` class to the variable `app`. As your app becomes more complex, you will pass this class instance to other libraries. For example:


*Note: This is an example and not part of this project.*
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)
```

<br>

This is how inheritance works in Python. The SQLAlchemy class (the child class) instance inherits `app` (the parent class) &mdash; this provides the child class with the attributes and methods of the parent class.

Passing `__name__` to `Flask` tells Python the proper way to execute the file. This has to do with how Python executes imports versus main programs. For more information, you may reference [this stackoverflow post](https://stackoverflow.com/questions/419163/what-does-if-name-main-do).

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


### run.py
```python
from app import app
```

<br>

That's all the file requires. To clarify,  `app` is the Flask instance we created in `__init__.py`, and it is a member of the `app` package. The `app` package refers to the `/app` folder in our directory, thus why in our `__init__.py` file we are able to import our `routes` from `app`.

```
/app
  routes.py
```


<br>

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

If everything goes smoothly, you can visit your app at `http://127:0.0.0.1:5000/`