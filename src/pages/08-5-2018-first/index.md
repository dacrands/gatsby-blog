---
path: '/8-5-18'
title: 'Hello World!'
tags: ['GatsbyJS', 'Markdown']
---


I feel a bit foolish for not starting what I hope to be
a fruitful blogging career a bit sooner, but I suppose it's better late than never. To be fair, I believe the wait was well worth it. This blog is hosted for free and is very fast, two features I **really** like. 

This also happens to be markdown, which makes it very easy to do things like this:

```javascript
function CodeSnippet(bool) {
  return function blockCode() {
    return `Markdown's block code is ${ bool ? 'awesome' : 'really awesome' }`
  }
}
```

As well as other things, like adding
font-accents that are **100%** *necessary.*

## Introducing Gatsby

So you may be wondering how I made this super-cool blog site. Well, the truth is I didn't really make it...*per se*...

I am using [Gatsby](https://www.gatsbyjs.org/), which is a static-site generator for React. I'm typically not one for using boilerplates I didn't write, but I am making an exception with this site. As someone who loves React and doesn't love the idea of configuring Jekyll on Windows, the ability to write a React app that can be hosted on Gitpages is amazing!

Even though this boilerplate is highly modified &mdash; mostly with the help of these [tutorials](https://www.youtube.com/watch?v=b2H7fWhQcdE&list=PLLnpHn493BHHfoINKLELxDch3uJlSapxg) &mdash;

Although all this stuff is well and **great**, I must admit I do feel like a bit of an phony for using the Gatsby starter project for this site. I did some npm installs and it was essentially a complete product. I haven't ran into any serious issues in terms of doing what I want, but there is just something so distinctly different between starting from a fresh package.json and npm installing an essentially complete product (i.e., I didn't have to configure webpack).




## Is Gatsby cheating?

Pretending I am qualified to have any sort of valuable opinion on this contrived question I am using for click-bait-esque purposes on my first blog post, I would say the answer is no. How can it be? Someone using GatsbyJS presumably knows React, Node, Git, etc. Needless to say, it takes a lot of learning to get to the point where you can even use boilerplates. 

I have also written React and React-Redux boilerplates that I use regularly, so I don't feel too much guilt for using someone else's this one time.

## Conclusion

For me, GatsbyJS is an amazing tool that I really have no interest in understanding further at the moment. I have many other priorities in my learning than understanding precisely how GraphQL is delivering my data or other features of Gatsby. As of right now I have a static-site, written in React, and hosted on Gitpages &mdash; life is very good. 




