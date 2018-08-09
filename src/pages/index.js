import React from 'react'
import Link from 'gatsby-link'

import styled from 'styled-components';

const LandingWrapper = styled.div`
  min-height: 40vh;    
  
`;

const Landing = styled.main.attrs({
  background: props => props.bg || '#ffffff'
})`
  min-height: 40vh;
  position: absolute;    
  margin-top: -1.45rem;
  left: 0;
  right: 0;    
  background: ${props => props.background}
`;

const Title = styled.h1.attrs({
  color: props => props.color || '#1d669b'
})`
  color: ${props => props.color}
  // color: white;
`;

const LandingContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  height: 100%;
  min-height: 40vh;  
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;  
`;

const Li = styled.li`
  // display: inline-block;  
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

`

const DarkLandingContainer = LandingContainer.extend`
  color: #f9f9f9;
`

const IndexPage = ({ data }) => (
  <div>
  <LandingWrapper>
    <Landing bg="#f6f6f6">
      <LandingContainer>
        {/* <Title>About</Title> */}
        <Title>
          Full-stack Node developer          
        </Title>
        {/* <hr/> */}
        <h4>
          I build Node apps that are fast and responsive.
        </h4>
        <h4>
          I spend most of my time
          using Node, React, Redux, MongoDB, Webpack, and Sass.
        </h4>
      </LandingContainer>
    </Landing>
    </LandingWrapper>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
    <LandingWrapper>
      <Landing>
        <LandingContainer>
        <Title>Blog</Title>
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
        </LandingContainer>
      </Landing>
    </LandingWrapper>

    <LandingWrapper>
      <Landing Landing bg="rgb(35,40,45)">
        <LandingContainer>
        <Title color="#f6f6f6">Projects</Title>
        
        </LandingContainer>
      </Landing>
    </LandingWrapper>
    
    
  
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

export default IndexPage
