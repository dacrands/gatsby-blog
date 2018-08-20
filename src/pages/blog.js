import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const Tags = styled.ul`
  // outline: 4px dashed red;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-left: 0;
`;

const Tag = styled.li`
  height: min-content;
  margin: 0.45rem;
  padding: 0.1rem 0.3rem;
  font-size: 0.8rem;
  color: #f1f1f1;
  background: #1e85d0;
  // border-radius: 5px;
  // border: 2px solid #1e85d0;
  transition: all 200ms ease;
  &:hover {
    // cursor: pointer;
    background: #ffffff;
    color: #1e85d0;
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
  color: #1e85d0;
  // background: #1e85d0;
  &:hover {
    background: #dadada;
  }

  div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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

      <Link to="/"> &larr; Home</Link>
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

