<p align="center">
  <a href="https://next.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>

# Gatbsy Blog

GatsbyJS build hosted on gitpages. Features a markdown blog that supports YAML front matter.


## Table of Contents
- [Background](#background)
- [Getting Started](#getting-started)
- [How it works](#how)

## Background
To understand more about how this project came to be, please reference [this blog post](https://dacrands.github.io/8-5-18).

GatsbyJS is a static-site generator that uses React. For individuals that don't want to go through the process of configuring Jekyll, yet want to take advantage of *Gitpages* static-site hosting, Gatsby provides an excellent alternative.

### Markdown CMS
The magic of this application lies in the Markdown pages. From the Gatsby site:

>Gatsby can use markdown files to create pages in your site. You add plugins to read and understand folders with markdown files and from them create pages automatically.

Essentially once you configure some plugins, adding content, such as blog posts, is simply a matter of creating a markdown file.

A powerful feature of using Markdown in Gatsby is frontmatter integration. Frontmatter allows you to add useful data to your markdown files which can be accessed in your components using GraphQL.

For example, here is the frontmatter schema used in this blog:

```m
---
_id : 7
path: '/9-27-18'
title: 'Hide your keys, folks (Part I)'
tags: ['CORS', 'jwt', 'flask', 'redux']
---
```


## Getting Started
To work with Gatsby you need to have node installed. 

### Install Gatsby
```bash
$ npm install --global gatsby-cli
```

### Install and Run
Once you install your packages, you can run development by using `gatsby-develop`.

```bash
~/gatsby-blog $ npm i
~/gatsby-blog $ gatsby develop
```

### Deployment

Here is a look at the `"scripts"` in our `package.json`. To deploy to gitpages, make sure your remote repository has GitHub Pages enabled.

```js
"scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "deploy": "gatsby build && gh-pages -b master -d public",
    "format": "prettier --write 'src/**/*.js'",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

### Version Control
The src of your site deployed to your Github Pages will be a production build, thus you will need a separate remote repo for tracking.

```bash
~/gatsby-blog $ git remote add hub git@github.com:dacrands/gatsby-blog.git
~/gatsby-blog $ git push hub master
```
