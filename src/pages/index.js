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
  display: flex;
  flex-direction: column;
  // justify-content: space-around;  
  margin: .75rem .525rem;
  h3 {
    margin-right: .75rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  padding: .6rem;
  border: 1px solid #dadada;
  // text-align: center;
  justify-content: space-between;
  transition: all 200ms ease;
  text-decoration: none;
  color: #1e85d0;
  // color: rgb(35,40,45);
  &:hover {
    background: #ffffff;
    color: rgb(35,40,45);
    // color: #1e85d0;
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
          data.allMarkdownRemark.edges.map(post => (
            <Li>
                          
              <StyledLink 
                to={post.node.frontmatter.path}
              >    
                <h3>{post.node.frontmatter.title}</h3>                            
                <h3>{post.node.frontmatter.path.replace(/^\/|\/$/g, '')}</h3>
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
