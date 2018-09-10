---
path: '/8-5-18'
title: 'Hello World!'
tags: ['GatsbyJS', 'Markdown']
---

I feel a bit foolish for not starting what I hope to be
a fruitful blogging career a bit sooner, but the journey to this blog has been an arduous one. In fact, the goal of this first post is to catalogue my experience of going from completely blogless to developing the site you are on now.

Before I delve into it , there are a few things to note about this site. First, this site is completely-static, which is likely not a surprise considering it's hosted on gitpages. However, what may be a surprise is that this site is a PWA  (Progressive Web App) built in React, but more on that later.  



This also happens to be markdown, which makes it very easy to do things like this:

```javascript
function CodeSnippet(bool) {
  return function blockCode() {
    return `Markdown's block code is ${ bool ? 'awesome' : 'really awesome' }`
  }
}
```

...as well as other things, like adding
font-accents that are **100%** *necessary.*

This blog also implements **YAML front matter,** which allows you to add useful data to your markdown files. For example, here's a look at the front matter for the markdown files used on this site:

```
---
path: '/8-5-18'
title: 'Hello World!'
tags: ['GatsbyJS', 'Markdown']
---
```

All of this is well and good, but how did we get to this point?

## Dr. Jekyll and Mr. Hyde

I had a problem. I wanted to host a robust site on gitpages (viz., a blog), caveat being that gitpages only supports static sites. What do I mean by a *robust* site? 

Well, the process of hosting a simple static site on gitpages, i.e., basic HTML, CSS, & JS, is immensely tedious if you plan on changing the content of your site and/or have multiple pages. In other words, if you are hosting a basic portfolio site or simple projects (e.g., Pomodoro timer, landing-page template)  on gitpages, then a very basic static site may be the right tool for the job. However, when you have dynamic content, such as with a blog, constantly altering static files is completely impractical.

Presumably like most who've encountered this quandry of wanting to host a complex site on gitpages, I came across [Jekyll](https://jekyllrb.com/) and became very excited. You're telling me I can host a markdown blog on gitpages without a database? Wow, that's amazing!

Now as someone who is not really for the whole meme trend, I apologize for what I'm about to do, but I feel it is the best transition possible.

![Imgur](https://i.imgur.com/fk6VlTyl.jpg)

I've successfully configured Python (and Anaconda), Node, R, C#, and Java on multiple Windows machines, but configuring Jekyll on Windows is a different beast...

From the Jekyll site:

  > While Windows is not an officially-supported platform, it can be used to run Jekyll with the proper tweaks. This page aims to collect some of the general knowledge and lessons that have been unearthed by Windows users.

All this talk of "tweaks" and things being "unearthed", as well as my personal experience attempting to configure it for Windows, made me increasingly disillusioned with Jekyll. Dare I say Dr. Jekyll, and I'm seeing Mr...you understand.



## The Great Gatsby

For awhile my .github.io site lay dormant, hosting a site that I believe totalled six files, three of which were html. Jekyll and the larger world of static site generators were always at the back of my mind, though I never really revisited the topic again. I was quite busy with other projects, work, school, etc., so the idea of enduring the nightmare that was configuring Jekyll on Windows was not very appetizing.

Then one day I am listening to the programming podcast *Syntax* and one of the developers starts to talk about a static-site generator called [Gatsby](https://www.gatsbyjs.org/), which is a "blazing-fast static site generator for React." As someone who loves React, this seemed almost too good to be true &mdash; even more so once some research revealed Gatsby builds can easily be hosted on Gitpages!

## The Force Awakens

After messing around with a couple of the gatsby boilerplates, I knew I finally found what I was looking for. After following [these tutorials](https://www.youtube.com/watch?v=b2H7fWhQcdE&list=PLLnpHn493BHHfoINKLELxDch3uJlSapxg) (created by the podcast host who first introduced me to gatsby), I was finally able to host a markdown blog on gitpages!

Of course, 90% of the work was done for me via the boilerplate and the tutorials linked above, but the point of this site is not to demonstrate my programming skills. Rather, this site &mdash; which, to reiterate, is hosted for free and quite fast &mdash; is meant to make the blog writing process as easy as possible for me, which means being able to write posts in markdown.

Nevertheless, I didn't configure the webpack and I'm not 100% sure how all of this stuff works (though I do have a good idea), so am I phony for using Gatsby?

## Is Gatsby cheating?

Pretending I am qualified to have any sort of valuable opinion on this contrived question I am using for click-bait-esque purposes on my first blog post, I would say the answer is no. How can it be? Someone using GatsbyJS presumably knows React, Node, Git, etc. Needless to say, it takes a lot of learning to get to the point where you can even use boilerplates such as this. 

I have also written my own React and React-Redux boilerplates that use webpack, so I don't feel too bad for using a starter project this one time.

## Conclusion

So I eventually got my blog hosted on gitpages. Of course, there are some issues that need to be addressed, such as the FOUC (Flashing of Unstyled Content), but all good things in time. For right now, I couldn't be happier with my first blog. Now the only thing I have to do is actually write blogs!



