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