---
_id : 6
path: '/8-24-18'
title: 'NeXT Logo in HTML and CSS'
tags: ['Steve Jobs', 'Paul Rand', 'NeXT', 'Logo']
---

## The Original

![Next Logo](https://www.logodesignlove.com/images/classic/next-logo-paul-rand.jpg)

## My Version

![my version of the next logo](https://i.imgur.com/TwwHjONl.jpg)

Okay, so far from an exact copy, but that's okay (for now).  

## Content First, Style Second
Let's start by adding the only content for this little project. This first `.box` will eventually be a grid element. I wrapped the h1s in divs to help with padding once we try to fine tune the kearning.


```html
<div class="box">
  <div><h1>N</h1></div>
  <div><h1>e</h1></div>
  <div><h1>X</h1></div>
  <div><h1>T</h1></div>
</div>
```
![Imgur](https://i.imgur.com/w0b1MpOl.jpg)

## Font and Colors
I used the chrome color picker to grab the colors from the logo. Also, for the moment I am using the Roboto font since it's somewhat close to the font used in the logo, though the characters are too narrow &mdash; I will research alternatives, but it will do for now.

```css
@import url('https://fonts.googleapis.com/css?family=Roboto');

$red: #f53e30;
$green: #5ec059;
$yellow: #fdf02f;
$pink: #e15fa5;
```
<br>

## The Main Box
Now lets get the first of three "squares" that will comprise our cube. It is a 2x2 grid that will wrap our divs, where each div contains one letter.

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


## Kearning
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

<br>

## It's a Lower Case e!
Obviously we need to increase the size of the lower-case so it matches the other letters, so let's do that.

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


## Colors

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

<br>

## Fine Tuning

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
  grid-template-columns: 175px 175px;
  grid-template-rows: 195px 195px;
}
```

![Imgur](https://i.imgur.com/WpW3e2Pl.jpg)
<br>

## The Home Stretch

Now let's add the two squares we'll need to create the cube. This is the hard part that requires a lot of fine tuning, so I encourage you to play around with the code.

```html
<div class="box-2"></div>
<div class="box-3"></div>
```

<iframe height='565' scrolling='no' title='NeXT Logo ' src='//codepen.io/dacrands/embed/qMOXeR/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/dacrands/pen/qMOXeR/'>NeXT Logo </a> by David Crandall (<a href='https://codepen.io/dacrands'>@dacrands</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>