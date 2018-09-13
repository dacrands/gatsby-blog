import React from 'react'
import Link from 'gatsby-link'

import styled from 'styled-components';

import CodeSvg from '../assets/code.svg';
import Tool from '../assets/tool.svg';
import Framework from '../assets/framework.svg';

const LandingWrapper = styled.div.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '55vh'
})`
  position: relative;
  height: 100%;
  min-height: ${props => props.height}   
`;

const Landing = styled.div.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '55vh'
})`
  min-height: ${props => props.height}
  position: absolute;    
  z-index: -1;
  margin-top: -1.45rem;  
  width: 500%;    
  margin-left: -200%;
  height: 100%;  
  background: ${props => props.background};  
`;

const H1 = styled.h1.attrs({
  color: props => props.color || '#1e85d0'
})`
  color: ${props => props.color}
  // color: white;
`;

const LandingContainer = styled.div.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '55vh'
})`
  margin: 0 auto;
  max-width: 960px;
  margin-top: -1.45rem;
  margin-bottom: 1.45rem;
  height: 100%;
  min-height: ${props => props.height} 
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ThreeContainer = LandingContainer.extend.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '55vh'
})`  
  min-height: ${props => props.height}
  padding-bottom: 2.45rem;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  h3 {
    // color: #dadada;
    margin-bottom: 6px;
  }
`;

const H3 = styled.h3.attrs({
  weight: props => props.weight || ''
})`
  font-weight: ${props => props.weight};
`;


const Ul = styled.ul`
  list-style: none;
  margin: 0;  
`;

const Li = styled.li`
  // outline: 3px dashed red;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;  
  margin: 1rem 0;  
  // display: inline-block 
   
  h3 {
    margin-right: .75rem;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  // border: 1px solid #dadada;    
  transition: all 200ms ease;
  text-decoration: none;
  color: #1e85d0;
  padding: 1em;
  // color: rgb(35,40,45);
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
  position: relative;

  p {
    margin: 0;
    &:last-of-type {
      color: rgb(135,140,145);
    }    
  }

  span {
    position: absolute;
    top: 40%;
    right: 0;
    margin-right: 1rem;
    font-size: 1.5rem;
  }

  &:hover {
    background: #ffffff;
    color: rgb(35,40,45);
    // color: #1e85d0;
    box-shadow: 0 0 6px rgba(30, 133, 208, 0.6);
  }
`;

const Box = styled.div`
  text-align: center;
  ul {
    list-style: none;
    margin: 0;
  }
  margin: 0 .475rem;
`;


function sortBlogs(blogs) {
  return blogs.allMarkdownRemark.edges.sort((post2, post1) => {
    return post2 - post1;
  });  
}

const IndexPage = ({ data }) => (
  <div>
    <LandingWrapper>    
      <LandingContainer>        
        <H1>
          Full-stack Node developer          
        </H1>
        <H3 weight="400">
          I build Node apps that are fast and responsive.
        </H3>
      </LandingContainer>
    </LandingWrapper>

    <LandingWrapper height="34vh">   
      <Landing bg="#f4f4f4" height="34vh"/>
      {/* <H1>Skills</H1> */}
      <ThreeContainer height="34vh">              
        <Box>
          <CodeSvg 
            style={{
              width: "100px",
              height: "70px",
              fill: "#1e85d0"
            }}
          />  
          <h3>Lanuages</h3>
          <p>Javascript, Python, HTML, CSS</p>
        </Box>
        <Box>
          <Framework 
            style={{
              width: "100px",
              height: "70px",
              fill: "#1e85d0"
            }}
          />  
          <h3>Frameworks</h3>
          <p>React, Redux, Sass, MongoDB, Express</p>
        </Box>
        <Box>
          <Tool
            style={{
              width: "100px",
              height: "70px",
              fill: "#1e85d0"
            }}
          />    
          <h3>Tools</h3>           
          <p>Webpack, Git, VSCode</p>
        </Box>
      </ThreeContainer>    
    </LandingWrapper>
    
    <LandingWrapper>
    <Landing>
      </Landing>
      <LandingContainer>
        <H1>Blog</H1>
        <Ul>    
          {            
            sortBlogs(data).map(post => (
              <Li>                         
                <StyledLink 
                  to={post.node.frontmatter.path}
                >    
                  <p>{post.node.frontmatter.title}</p>                         
                  <p>{post.node.frontmatter.path.replace(/^\/|\/$/g, '')}</p>
                  <span>{post.node.frontmatter._id}.</span>
                </StyledLink>                
              </Li>
            ))
          }
        </Ul>
        <Link to="/blog">Blog page &rarr;</Link>
      </LandingContainer>
    </LandingWrapper>  
  
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
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
`

export default IndexPage
