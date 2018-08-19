import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const Tags = styled.ul`
  // outline: 4px dashed red;
  display: flex;
  list-style: none;
  margin-left: 0;
`;

const Tag = styled.li`
  height: min-content;
  margin: 0.45rem;
  padding: 0.1rem;
  font-size: 0.8rem;
  color: #f1f1f1;
  background: #1d669b;
  border-radius: 5px;
  border: 2px solid #1d669b;
  transition: all 200ms ease;
  &:hover {
    // cursor: pointer;
    font-size: 1.1rem;
    padding: 0.3rem;
    background: #ffffff;
    color: #1d669b;
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: 1.45rem;  
`;

const Li = styled.li`
  border: 1px solid #dadada;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  padding: .6rem;  
  // text-align: center;  
  flex-direction: column;
  transition: all 200ms ease;
  text-decoration: none;
  color: #1d669b;
  // background: #1d669b;
  &:hover {
    background: #dadada;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
`;


const SecondPage = ( {data}) => (
  <div>
    <h1>Blog</h1>
    <p>Just amusing musings</p>

    <Ul>    
        {
          data.allMarkdownRemark.edges.map(post => (
            <Li>
                          
              <StyledLink 
                to={post.node.frontmatter.path}
              >    
              <div>
                <h3>{post.node.frontmatter.title}</h3>
                <h3>{post.node.frontmatter.path.replace(/^\/|\/$/g, '')}</h3>
              </div>
                
              
                <Tags>
                  {
                  post.node.frontmatter.tags.map(tag =>(
                    <Tag>{tag}</Tag>
                  ))
                  }
                </Tags>
              </StyledLink>             
            </Li>
          ))
        }
      </Ul>

      <Link to="/"> &larr; Back</Link>
  </div>
)

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          frontmatter {
            title
            path
            tags
          }
        }
      }
    }
  }
`

export default SecondPage

