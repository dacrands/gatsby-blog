---
path: '/8-5-18'
title: 'Hello World!'
tags: ['GatsbyJS', 'Markdown']
---


---


T feel a bit foolish for not starting what I hope to be
a fruitful blogging career a bit sooner, but such is
life. The fact is here we are, I am writing and you 
are reading what I write through a very fast static-site generator, so perhaps the wait was worth it. This also happens to be markdown, which makes it very easy to do things like this:

```javascript
function CodeSnippet(bool) {
  return function blockCode() {
    return `Markdown's block code is ${ bool ? 'awesome' : 'really awesome' }`
  }
}
```

As well as other things, like adding
font-accents that are **100%** *necessary.*


Although all this stuff is well and **great**, I must admit I do feel like a bit of an phony (pardon the salty language) for using the Gatsby starter project for this site. I did some npm installs and it was essentially a complete product. I haven't ran into any serious issues in terms of doing what I want, but there is just something so distinctly different between starting from a fresh package.json and npm installing an essentially complete product.

When I build a boilerplate I know precisely how the server works, what is happening in the development and production builds, how Redux is delivering the data. However, in this new and, at the moment, fairly opaque realm of Gatsby with its GraphQL and layouts, I don't feel that deep understanding &mdash; I don't feel a  *connection* with the code. Nonetheless, here we are, me writing and you reading, performance is incredible, and this is **React!** and I'm on **Windows!!** Basically it is win/win for you as the user and me as the developer, so is there really anything to be concerned about here?

#### *tl:dr; I feel like a scam for using a preconfigured project. Is my shame legitimate or am I just a victim of low self-esteem?*

## Is Gatsby cheating?

Pretending I am qualified to have any sort of valuable opinion on this contrived question I am using for click-bait-esque purposes on my first blog post, I would say the answer is no. How can it be? Someone using GatsbyJS presumably knows React, Node, and we could continue to engage in *modus ponens* to develop our picture of who GatsbyJS users are. Needless to say, it takes a lot of learning to get to the point where you can even use boilerplates.

For me, GatsbyJS is an amazing tool that I really have no interest in understanding further at the moment. I have many other priorities in my learning than understanding precisely how GraphQL is delivering my data or other features of Gatsby. As of right now I have a static-site, written in React, and hosted on Gitpages &mdash; life is very good. 



```javascript
export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path} }) {
      html
      frontmatter {
        path
        title
        tags
      }
    }
  }
`
```

It's sort of like SASS for Objects. But I am not sure (at the time of writing this) what is going on




