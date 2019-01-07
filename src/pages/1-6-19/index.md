---
_id : 11
path: '/1-6-19'
title: 'Connecting Your React Front-end and Your Flask Back-end'
tags: ['React','GatsbyJS','Flask']
--- 

![cookies](https://images.unsplash.com/photo-1512668033346-09cfb0d8597b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60)

Alright, so you feel pretty strong in your frontend development skills, learned a framework like React, and now want build some back-end applications. You create some APIs, learn about databases, authentication, all is well.

Then you may begin to wonder &mdash; how do I connect my front-end SPA with my back-end application? Or more specifically, how does one implement authentication when you can't pass data directly into a template?

This is the question I will answer in this post, though the answer really comes down to one thing &mdash; **cookies**.

### Basic Idea
The basic idea is that if the front-end application submits valid login credentials, the server will open a *Session* and give the front-end app a signed-cookie. The server will check for this cookie when the client attempts to access protected routes. No cookie, no protected content.

## Preqrequisites
---
- Flask knowledge (or some backend and/or python experience)
- Knowledge of a JS framework (I'll be using React)

## Flask
---
I like Flask a lot, primarily because I like Python a lot. Regardless, this general idea can be applied by developers of any stack.

First, let's look at some of the tools that make this possible. We will break down these imports one by one.

```python
from flask_login import login_required, login_user,\
                        current_user, logout_user
```
<br />

### login__user
Guess what this does? Let's see what this looks like in action:
 
```python
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user is None or not user.check_password(request.form['password']):
            return jsonify({"status":401, "msg": "Invalid username and/or password" }), 401  
        login_user(user)        
        return jsonify({
            "status":200, 
            "user": current_user.username,            
             "msg": "Logged in!" })
```
<br />

You may notice the only real difference between this and what would be done with, say, Jinja2 templates, is the returning of *JSON* and not a *render_template* method. 

So what is *login_user* doing anyway? Well, it is creating an active session with the client who made the request. It also checks to see if the cookie the server sends has been modified and other security features.

When you log in a user using *login_user*, you are essentially saying, "Based on the credentials submitted, I trust this person and will give this person a signed-cookie to use on future requests."

It is still the job of the client to include this cookie on subsequent requests, but we will cover that in a bit.

Configuring *login_user* takes a bit of work though. 

### logout_user
Logging out the user is really easy:
```python
@app.route('/logout')
def logout():
    logout_user()
    return jsonify({"status":200, "msg": "Logged out!"})
```
<br />

It does the opposite of *login_user* in that it closes the session and doesn't give the user a cookie. Since we didn't return a cookie, the client now has nothing to give the server for auth routes. It essentially **pops** the user session.

### login_required
This is middleware that will check for that all-important session. If the user presents a valid session, they make it through the middleware, otherwise the user is rerouted.

```python
@app.route('/post/delete/<post_id>', methods=['POST'])
@login_required
def delete_post(post_id):    
    if post_id is None:
        return jsonify({"status":204, "msg":"You did not send me anything"})
    post = Post.query.filter_by(id=post_id).first()
    if post_id is None:
        return jsonify({"status":204, "msg":"Post not found. Are you trying to break me?"})
    db.session.delete(post)
    db.session.commit()
    return jsonify({"status":200, "msg": "Post removed!"})
```
<br />

### current_user

When a user logs in, it's because that person is trying to access data associated with that user. Consequently, the back-end needs to know who the user is for db queries, etc. This is what *current_user* is &mdash; the user returned from the \<User> table when we log a user in.     

Consider the following code:

```python
post = Post(body=request.form['text'], author=current_user)
```
<br />

Really all that is being done here is that *current_user* is referencing the user contained in the session created with *login_user*. Python is really nice, isn't it?

## Front-end
---
The front end work comes down to one thing really, and that is including credentials when using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```javascript
getPosts() {
    fetch('http://api.something.com/post' , {      
      credentials: 'include',
    })
    .then(res => res.json())
    .then(response => {            
      if (response.status !== 200) {
        throw(response)
      }      
      this.setState({posts: response.posts})            
      return 
    })
    .catch(e => {      
      navigate(`/err/`)
      return 
    })
  }
```

Remember how I said the only thing the client needs to do is include the cookie sent by the server &mdash; that is what we're doing we set *credentials: 'include'*. Otherwise, the client won't include the cookie since the Fetch API does not include credential by default, which is a good thing.

### Form Submission
Once a user submits a form, you're all set. Provided the logic of the form submission is sound, the back-end will provide the necessary cookies for authenticated users. I told you it was simple.

## Conclusion
---

Really this whole post can be boild down to a few basic principles, but sometimes it's nice to have things explained. Anyway, let's review said basic principles:

- If a client submits valid username and password that client will get a cookie until the user decides to log out or the cookie expires. This cookie will be used to authenticate future requests.

- Once a user submits a valid login, all the client must do it is include the cookie provided by the server on subsequent requests.

From there, things like rerouting can be handled programmatically by the SPA. Regardless of what a potential hacker does to manipulate the front-end and access privileged pages, the perpetrator will not be able to access data without providing legitimate credentials, and that is really awesome.


