import React from 'react';
import Helmet from 'react-helmet';
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

export default function Template({ data }){
  const { markdownRemark: post } = data; 

  return (
    <div style={{paddingBottom: "1.45rem"}}>
      <h1>{post.frontmatter.title}</h1>
      <Tags>
        {
          post.frontmatter.tags.map(tag => {
            return <Tag>{tag}</Tag> 
          })
        }
      </Tags>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  )
};

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