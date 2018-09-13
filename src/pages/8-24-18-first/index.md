---
_id : 6
path: '/8-24-18'
title: 'NeXT Logo in HTML and CSS'
tags: ['Steve Jobs', 'Paul Rand', 'NeXT', 'Logo']
---

# The Original

![Next Logo](https://www.logodesignlove.com/images/classic/next-logo-paul-rand.jpg)

![Imgur](https://i.imgur.com/TwwHjONl.jpg)

# The Code

## HTML
___
Let's start with the html for the first box. This will eventually be a grid element, thus why we wrap the h1s in divs. Also, imitating the kearning skills of Paul Rand will require precise control over our padding.


```html
<div class="box">
  <div><h1>N</h1></div>
  <div><h1>e</h1></div>
  <div><h1>X</h1></div>
  <div><h1>T</h1></div>
</div>
```
![Imgur](https://i.imgur.com/w0b1MpOl.jpg)

<!-- <div style="background: #000"> -->
## SCSS
<!-- </div> -->
___

```css
@import url('https://fonts.googleapis.com/css?family=Roboto');

$red: #f53e30;
$green: #5ec059;
$yellow: #fdf02f;
$pink: #e15fa5;
```
I used the chrome color picker to grab the colors from the logo. Also, for the moment I am using the Roboto font since it's somewhat close to the font used in the logo, though the characters are too narrow &mdash; I will research alternatives, but it will do for now.


Now lets get the first of three polygons that will comprise our cube.

```css
.box {
  background: #000;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -165px;
  margin-left: -180px;  
  padding-top: 5px;
  font-family: $font-family;
  display: grid;
  grid-template-columns: 175px 175px;
  grid-template-rows: 175px 175px;
  grid-auto-flow: row;
  transform: rotate(-25deg);
}
```
![Imgur](https://i.imgur.com/QouIPJZl.jpg)

Here we have a 2x2 grid that will wrap our divs, where each div contains one letter.

Right now we have a square, though this will cause some problems once we try to kearn our letters, but we'll cross that div when we get to it. For right now, let's get some basic font sizing.

```css
.box {
  background: #000;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -165px;
  margin-left: -180px;  
  padding-top: 5px;
  font-family: $font-family;
  display: grid;
  grid-template-columns: 175px 175px;
  grid-template-rows: 175px 175px;
  grid-auto-flow: row;
  transform: rotate(-25deg);
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $red;   
    font-size: 7rem;
  }
}
```

![Imgur](https://i.imgur.com/JtGOiCol.jpg)

Obviously we need to increase the size of the lower-case so it matches the other letters.

```css
.box {  
  background: #000;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -165px;
  margin-left: -180px;  
  padding-top: 5px;
  font-family: $font-family;
  display: grid;
  grid-template-columns: 175px 175px;
  grid-template-rows: 175px 175px;
  grid-auto-flow: row;
  transform: rotate(-25deg);
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;    
    color: $red;   
    font-size: 7rem;
  
    &:nth-of-type(2) {
      color: $yellow;
      font-size: 9rem;
      margin-top: -55px;
    }
  }
```

![Imgur](https://i.imgur.com/AUfh3Ofl.jpg)

The size and spacing needs some tinkering, but for right now it's passable.

Let's add the rest of our colors.


```css
.box {
  background: #000;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -165px;
  margin-left: -180px;  
  padding-top: 5px;
  font-family: $font-family;
  display: grid;
  grid-template-columns: 175px 175px;
  grid-template-rows: 175px 175px;
  grid-auto-flow: row;
  transform: rotate(-25deg);
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $red;   
    font-size: 7rem;
  
    &:nth-of-type(2) {
      color: $yellow;
      font-size: 9rem;
      margin-top: -55px;
    }

    &:nth-of-type(3) {
      color: $green;
    }

    &:nth-of-type(4) {
      color: $pink;
    }
  }
}
```
![Imgur](https://i.imgur.com/yVxOZL5l.jpg)

Now we see the primary issue with our font &mdash; it's too narrow four our square. Until we find a wider font with characters that have a squarer aspect ratio, we will need to cheat a bit.

We'll change the grid on our box element from this:

```css
.box {
  grid-template-columns: 175px 175px;
  grid-template-rows: 175px 175px;
}
```

To this:

```css
.box {
  grid-template-columns: 155px 155px;
  grid-template-rows: 185px 185px;
}
```

![Imgur](https://i.imgur.com/WpW3e2Pl.jpg)

To me, the most amazing story in perhaps all of American history is that of Steve Jobs.

<p data-height="827" data-theme-id="0" data-slug-hash="qMOXeR" data-default-tab="result" data-user="dacrands" data-pen-title="NeXT Logo " class="codepen">See the Pen <a href="https://codepen.io/dacrands/pen/qMOXeR/">NeXT Logo </a> by David Crandall (<a href="https://codepen.io/dacrands">@dacrands</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

