---
_id : 2
path: '/8-9-18'
title: 'Styled Components'
tags: ['CSS-in-JS', 'styled-components']
---

---

I'm not a big fan of CSS-in-JS. When I see style objects in components it feels out of place, sort of like those iq tests where you have to find the item that doesn't belong.

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Raven_Matrix.svg/290px-Raven_Matrix.svg.png)



Perhaps the primary issue is feeling bound to the component. This may reflect my lack of familiarity with CSS-in-JS design conventions, but when I think of writing designs, I think of writing styles I can reuse throughout many components, that span the document. To me, inline styles are the antithesis of what I think good CSS should be -- reuasble. 


### Introducing styled-components
I believe keeping an open-mind is important. That said, as I was learning about this Gatsby stuff I came across a rather intriguing technology that had me rethink this whole CSS-in-JS way of life. 

I'm talking about [styled-components](https://www.styled-components.com/). Let's take a look at some examples. 

*All of these code snippets are taken from the code I used to create the landing page of this site (with some slight modifications for the purposes of this blog).*

```javascript
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  margin: 0;  
`;

const Li = styled.li` 
  margin: .75rem .525rem;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: .6rem;
  border: 1px solid #dadada;
  text-align: center;
  transition: all 200ms ease;
  &:hover {
    background: #dadada;
  }
`;
```

Take note that we're writing CSS, not JS, inside our JS! Why am I so jazzed about this? Because I feel at home when I read and write styles in CSS. Of course this means you'll need to download a new vscode plugin, [which you can find here](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components).

Let's take a look at how this would appear in our React.   


```html
<Ul>    
  {
    data.allMarkdownRemark.edges.map(post => (
      <Li>
        <StyledLink 
          to={post.node.frontmatter.path}
        >
          {post.node.frontmatter.title}
        </StyledLink>              
      </Li>
    ))
  }
</Ul>
```

Pretty cool right? Although we miss out on the ultra-readability provided by something like BEM, the code is still readable since we have **semantic** components that can be reused. Also note how clean our components are. We don't have any classNames, style objects, or style props. Visually, our CSS is more removed from our JS than it would be if we were to use conventional CSS selectors. What really counts is the quality of our component names, which is within our control.

### Now the good stuff

Of course, that's not all styled-components can do -- if it were, we wouldn't be here right now. Let's take a look at some more use cases.

```javascript
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;  
`;

const ExtendedContainer = Container.extend.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '40vh'
})`  
  min-height: ${props => props.height}
  background: ${props => props.background}
  padding-bottom: 1.45rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  h3 {
    margin-bottom: 6px;
  }
`;
```
First let's take note of *.extend*

By using extend we can continue to generate semantically rich components while keeping our code DRY. Furthermore, this inheritance allows us to, once again, keep all references to an component's styles within the component name. I'm using *\<ExtendedContainer\>* for the demonstrative purposes, but you can understand the power of something like *\<FlexContainer\>* extending a *\<Container\>* style-component. 

Also take note of the nesting. Yes, styled-components supports Sass!

Now let's take look at what is going on with that *.attrs* method.

```html
<ExtendedContainer bg="#dadada" height="50vh">
  // You'd have child components here
</ExtendedContainer>
```
So there may be some cases were props makes sense. If a component's only task is providing styles, such as a container component which makes an elaborate grid, it makes sense to pass styles through props since ultimately these props get sent to our CSS. In other words, we wouldn't expect to see any *onClick* or *to* events on these components since they are strictly for stylings.


### Final Thoughts
I'm just starting out with this and am not sure if I'd use it outside of Gatsby, but it's very funny to work with in the meantime. The idea of having super clean components and JSX through styled containers, extending components, and intelligent use of props, is very cool.



