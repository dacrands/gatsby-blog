---
path: '/8-9-18'
title: 'Styled Components'
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

Take note that we're writing CSS, not JS, inside our JS! Let's take a look at how this would appear in our React.   


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

Pretty cool right? Although we miss out on the ultra-readability provided by BEM, we have semantic components -- ergo readable code -- that can be reused and we don't need an inline style tag or a style object. 

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
First let's take note of the `.extend`

By creating a new component with a semantically rich name, we keep our code readable. Contrast this with providing a style object to a `Container` component, where the CSS needs to be deciphered in order to understand what the container is doing. 

Also take note of the nesting. How awesome is that?

Now let's take look at what is going on with that `attrs` method.

```html
<ExtendedContainer bg="#dadada" height="50vh">
  // You'd have child components here
</ExtendedContainer>
```

So
I'm just starting out with this and am not sure if I'd use it outside of Gatsby, but it's very funny to work with in the meantime. 



