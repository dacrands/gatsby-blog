---
_id : 7
path: '/9-27-18'
title: 'Hide your keys, folks (Part I)'
tags: ['CORS', 'jwt', 'flask', 'redux']
---

<!-- I had a problem. I built this awesome React/Redux SPA featuring the *New York Times* API, but my API calls were coming directly from my front-end. Why is that a problem?

Well, if someone opens the "Network" tab in development tools, they can easily view the app's requests to the NYT API, and consequently the URL containing my API-key.  -->

So you've learned the basics of front-end development and you want to build something using an API &mdash; awesome. APIs are great because they provide access to troves of data that is being currated by someone else, so front-end developers can jump right in and start building. 

However, practically all APIs require users to acquire a *secret-key,* which needs part of the URL making the request to the API. Without this key, users trying to access the API will receive a *403 forbidden error.*

This is where the front-end developer runs into some problems. Remember, we are talking about a *secret-key,* not a *please-share-with-everybody-key,* ergo this key shouldn't be shared with anyone. Sorry for the pedanticism, but I see a number of projects that have hard-coded API-keys and I'm not sure why.

Part I of this two part series will go through the three phases of working with API-keys for front-end developers. The conclusion will be that to truly hide your API-keys you will need a backend, but let's not get ahead of ourselves. 


## Phase I: Keys in the code
---
As the title indicates, this is where the API-key is hard-coded into the app. For beginners, this may be an unavoidable situation. For example, if you are hosting a simply weather-app project on gitpages that you aren't planning on sharing with many people, then having an API-key in your code is understandable. One thing I recommend, however, is assigning the key to its own variable so your code is more maintainable:


**Bad**
```javascript
const url = "https://api.badhabits.com/key=WHY_IS_THIS_HERE/";
```
<br>

**Better**
```javascript
const API_KEY = "BEST_PRACTICE";
const url = `https://api.badhabits.com/key=${API_KEY}/`;
```
<br>

But other then that, there is not much you can do in this situation. Again, if you're starting out this is fine for now. It's probably more important that you focus on building stuff with data, than becoming overly concerned over whether someone will use your free api-key.

If you're not hosting a static-site, however, there is not much excuse to leave the keys in the code.

### API Calls
Obviously depending on your stack this will vary slightly, nonetheless a general API-call make look like this: 

*Note: These examples will be in React and Redux.*

```jsx
const API_KEY = "BEST_PRACTICE";
const API_URL = `https://api.badhabits.com/key=${API_KEY}/`;
export function fetchData() {
    return fetch(API_URL)
    .then((response) => {
        return response.json();
    }).then((request) => {        
        return {
            type: FETCH_DATA,
            payload: request 
        }
    }).catch(e => return e;);
}
```
<br>

For brevity I removed error-handling. As we move through our phases, we'll be improving this API-call.

## Phase II: Environment Variables
One step close to securing an API-key is using environment variables. These are variables that the developer creates from the terminal and that your program will use for configuring certain things, such as the `PORT` for the app to listen on. The naming convention for these variable is upper-case, snake-case, e.g., ENV_VAR

Depending on your OS, configuring environment variables will look different:

```bash
# Bash
$ export API_KEY=someKey
```
```powershell
# PowerShell
C:\> $env:API_KEY="someKey"
```
<br>


### API Call
In our example, once the developer configures the environment variable `API_KEY`, the app will be able to use it for the API calls (Good thing we didn't hard-code the API-key into the URL, now we can just update `const API_KEY` to use the environment variable!):

```jsx
const API_KEY = process.env.API_KEY || 'nice-try';
const API_URL = `https://api.badhabits.com/key=${API_KEY}/`;
export function fetchData() {
    return fetch(API_URL)
    .then((response) => {
        return response.json();
    }).then((request) => {        
        return {
            type: FETCH_DATA,
            payload: request 
        }
    }).catch(e => return e;);
}
```
<br>

Note we provide a fallback when assigning the `const API_KEY`. If the environment variable being called is not been configured, the app has a value to fallback on. Try playing around with environment variables to find out why this is a good idea. 

So we're all set. Our API-key can be removed the code and now no one will ever be able to see our API-key.

Well, not exactly...

![exposed api-key in devtools](https://i.imgur.com/DMbGmGSl.jpg)

Even though you went through all that trouble of configuring your environment variables, people can still see our API-key!

At this point the person viewing this API-key will likely be a developer too and hopefully wouldn't do anything malicious, but as web-developers it's important to get in the practice of securing private information.

So how do we fix this? Well, we need to build a simple server that will act as a proxy between our front-end and our the API. In Part II we will build this tiny application.

