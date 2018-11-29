---
_id : 8
path: '/10-6-18'
title: 'Downloading SVGs FAST with Python'
tags: ['Python', 'Requests', 'automation', 'SVGs']
---

I just added this super-snazzy slider to the landing page of my blog.

<video style="max-width: 100%;" autoplay  loop>
   <source src="https://i.imgur.com/9AJeBsq.mp4" type="video/mp4">
</video>

The initial css was taken from [this codepen](https://codepen.io/nickcil/pen/BygPMY), though I made some pretty significant modifications. Perhaps I will dedicate a blog post discussing how to create such a marquee, though this post will focus on how I grabbed the lovely svgs that comprise the slider.


## Open-Source SVG Logos
[This github repo](https://github.com/gilbarbara/logos) features over 1,000 svg logos from various tech organizations. I, like many creating a skills section for their portfolio, wanted to feature some of these SVGs to quickly communicate my stack to visitors. Given these SVGs are hosted on github it's not as though we can simply download the images, which would have been a tedious process anyway.

For the first logo I grabbed, I copied the raw svg code to a .txt document and saved it as an SVG &mdash; simple enough. Unfortunately, there was about ten more logos I was interested in and I was not in the mood to repeat the aforementioned process ten more times. Thankfully I know Python and this process can be easily automated.

*Note: It's recommended you use [Jupyter Notebooks](http://jupyter.org/) for this project.*

## Requests
We only need one library for this script &mdash; *requests.*

```python
import requests
``` 
<br>

Let's grab one logo so we can see what our data looks like. When we make a request, we get back a Request-object, which provides some really nice methods for webscraping. For instance, we can call *status_code* on the request to see if everything went smoothly &mdash; if the logo is there we get a status-code of *200,* if it's not we get a *404*.
```python
jsLogo = requests.get(f'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/javascript.svg')
print(jsLogo.status_code)
>>> 200
```
<br>

Seeing that our logo exists, lets look at the text of the request, i.e., our svg.

```python
print(jsLogo.text)
```
```xml
'<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n
  <svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" 
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  preserveAspectRatio="xMidYMid">\n    <g>\n        <path d="M0,0 L256,0 L256,256 L0,256 L0,0 Z" 
  fill="#F7DF1E"></path>\n        <path d="M67.311746,213.932292 L86.902654,202.076241 C90.6821079,
  208.777346 94.1202286,214.447137 102.367086,214.447137 C110.272203,214.447137 115.256076,211.354819 
  115.256076,199.326883 L115.256076,117.528787 L139.313575,117.528787 L139.313575,199.666997 
  C139.313575,224.58433 124.707759,235.925943 103.3984,235.925943 C84.1532952,235.925943 72.9819429,
  225.958603 67.3113397,213.93026" fill="#000000"></path>\n        <path d="M152.380952,211.354413 
  L171.969422,200.0128 C177.125994,208.433981 183.827911,214.619835 195.684368,214.619835 C205.652521,
  214.619835 212.009041,209.635962 212.009041,202.762159 C212.009041,194.513676 205.479416,191.592025 
  194.481168,186.78207 L188.468419,184.202565 C171.111213,176.81473 159.597308,167.53534 159.597308,
  147.944838 C159.597308,129.901308 173.344508,116.153295 194.825752,116.153295 C210.119924,116.153295 
  221.117765,121.48094 229.021663,135.400432 L210.29059,147.428775 C206.166146,140.040127 201.699556,
  137.119289 194.826159,137.119289 C187.78047,137.119289 183.312254,141.587098 183.312254,147.428775 
  C183.312254,154.646349 187.78047,157.568406 198.089956,162.036622 L204.103924,164.614095 C224.553448,
  173.378641 236.067352,182.313448 236.067352,202.418387 C236.067352,224.071924 219.055137,235.927975 
  196.200432,235.927975 C173.860978,235.927975 159.425829,225.274311 152.381359,211.354413" 
  fill="#000000"></path>\n    </g>\n</svg>\n'
```

So we see a number of newline characters (i.e., *\n*), though I really am only concerned about the trailing one. Thankfully, this a really quick fix.

```python
cleanJsLogo = jsLogo.text.rstrip('\n')
print(cleanJsLogo)
```


```xml
'<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<svg width="256px" height="256px" viewBox="0 
0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
preserveAspectRatio="xMidYMid">\n    <g>\n        <path d="M0,0 L256,0 L256,256 L0,256 L0,0 Z" 
fill="#F7DF1E"></path>\n        <path d="M67.311746,213.932292 L86.902654,202.076241 C90.6821079,
208.777346 94.1202286,214.447137 102.367086,214.447137 C110.272203,214.447137 115.256076,211.354819 
115.256076,199.326883 L115.256076,117.528787 L139.313575,117.528787 L139.313575,199.666997 C139.313575,
224.58433 124.707759,235.925943 103.3984,235.925943 C84.1532952,235.925943 72.9819429,225.958603 
67.3113397,213.93026" fill="#000000"></path>\n        <path d="M152.380952,211.354413 L171.969422,
200.0128 C177.125994,208.433981 183.827911,214.619835 195.684368,214.619835 C205.652521,214.619835 
212.009041,209.635962 212.009041,202.762159 C212.009041,194.513676 205.479416,191.592025 194.481168,
186.78207 L188.468419,184.202565 C171.111213,176.81473 159.597308,167.53534 159.597308,147.944838 
C159.597308,129.901308 173.344508,116.153295 194.825752,116.153295 C210.119924,116.153295 221.117765,
121.48094 229.021663,135.400432 L210.29059,147.428775 C206.166146,140.040127 201.699556,137.119289 
194.826159,137.119289 C187.78047,137.119289 183.312254,141.587098 183.312254,147.428775 C183.312254,
154.646349 187.78047,157.568406 198.089956,162.036622 L204.103924,164.614095 C224.553448,173.378641 
236.067352,182.313448 236.067352,202.418387 C236.067352,224.071924 219.055137,235.927975 196.200432,
235.927975 C173.860978,235.927975 159.425829,225.274311 152.381359,211.354413" fill="#000000"></path>\n 
</g>\n</svg>'
```
<br>

The data is now ready to be written to a file.


## Writing the Data
Before we can write to a file, we need to create one. In Python, this is very trivial. We simply need to invoke Python's built-in function *open()*  and pass it two strings, the filename and the mode (e.g., write, read, etc.). We're passing *'w'* as our mode &mdash; this will create a writable file if one doesn't exist (i.e., if there isn't a file matching the passed filename). If one does exist, then it will write over the existing content of that file. [Click here](https://docs.python.org/3/library/functions.html#open) for more information on Python's *open()* function.

Once we create the file, writing to it is just a matter of passing our text to the file-object and then closing the file-object.

```python
jsSvg = open('js-logo.svg', 'w')
jSsvg.write(cleanJsLogo)
jSsvg.close()
```
<br>

And that's pretty much it. Now lets put the pieces together and grab our logos.

## Putting It All Together
I didn't want all 1,000 logos, I only needed a few. Thus, I simply hardcoded a list of the logos I wanted. If you wanted all 1,000 you can import the *BeautifulSoup* library, access the list of logos, iterate through that list, etc., but I won't cover that here.

```python
logoList = ["flask", "css-3", "html-5", "react", "sass", "redux", "nodejs", "heroku", "postman", "webpack", "python"]
```

<br>

Once we have our list, it's just a matter of applying the logic from earlier.

```python
for logo in logoList:
    logoReq = requests.get("https://raw.githubusercontent.com/gilbarbara/logos/master/logos/{0}.svg".format(logo))
    if logoReq.status_code == 200:
        logoSvg = open("{0}-logo.svg".format(logo), "w")
        logoSvg.write(logoReq.text.rstrip("\n"))
        logoSvg.close()
```

<br>

Note we don't need exception handling. If the request does not return a status-code  of *200,* the logo doesn't exist, so we only need logic for successful requests.

And that's about it. Once you run this script, it will populate your current directory with the requested svg files.