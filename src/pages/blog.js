import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

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
  margin-left: 0;
  padding: 0.1rem 0.3rem;
  font-size: 0.8rem;
  color: #f1f1f1;
  background: #1e85d0;
  border-radius: 2px;
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
  // border: 1px solid #dadada;
  margin-bottom: 1.45rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  &:hover {
    background: #ffffff;
    box-shadow: 0 0 6px rgba(30, 133, 208, 0.6);
  }
`;

const LiText = styled.div`
  p {
    margin: 0;
    &:last-of-type {
      color: rgb(135, 140, 145);
    }
  }
`;

const StyledLink = styled(Link)`
  flex-direction: column;
  transition: all 200ms ease;
  text-decoration: none;
  color: #1e85d0;
  display: block;
  padding: 1em;
  padding-left: 1em;
`;

function sortBlogs(blogs) {
  return blogs.allMarkdownRemark.edges.sort((post2, post1) => {
    return post1.node.frontmatter._id - post2.node.frontmatter._id;
  });
}

const SecondPage = ({ data }) => (
  <div>
    <h1 style={{ color: "#1e85d0" }}>Blog</h1>
    <h3 style={{ fontWeight: "100" }}>
      Writings and tutorials about programming.
    </h3>
    <Ul>
      {sortBlogs(data).map(post => (
        <Li>
          <StyledLink to={post.node.frontmatter.path}>
            <LiText>
              <p>{post.node.frontmatter.title}</p>
              <p>{post.node.frontmatter.path.replace(/^\/|\/$/g, "")}</p>
            </LiText>
            <Tags>
              {post.node.frontmatter.tags.map(tag => (
                <Tag>{tag}</Tag>
              ))}
            </Tags>
          </StyledLink>
        </Li>
      ))}
    </Ul>

    <Link to="/"> &larr; Home</Link>
  </div>
);

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(limit: 100) {
      edges {
        node {
          frontmatter {
            _id
            title
            path
            tags
          }
        }
      }
    }
  }
`;

export default SecondPage;
