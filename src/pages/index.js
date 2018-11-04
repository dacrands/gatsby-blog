import React from 'react'
import Link from 'gatsby-link'

import styled, { keyframes } from 'styled-components';

import CssLogo from '../assets/logos/css-3-logo.svg';
import ReactLogo from '../assets/logos/react-logo.svg';
import ReduxLogo from '../assets/logos/redux-logo.svg';
import SassLogo from '../assets/logos/sass-logo.svg';
import PostmanLogo from '../assets/logos/postman-logo.svg';
import WebpackLogo from '../assets/logos/webpack-logo.svg';
import NodeLogo from '../assets/logos/nodejs-logo.svg';
import HerokuLogo from '../assets/logos/heroku-logo.svg';
import JsLogo from '../assets/logos/js-logo.svg';
import HtmlLogo from '../assets/logos/html-5-logo.svg';
import FlaskLogo from '../assets/logos/flask-logo.svg';


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
  h3 {
    margin-right: .75rem;
  }
`;

const StyledLink = styled(Link)`
  display: block;  
  transition: all 200ms ease;
  text-decoration: none;
  color: #1e85d0;
  padding: 1em;  
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
    // color: rgb(35,40,45);
    // color: #1e85d0;
    box-shadow: 0 0 6px rgba(30, 133, 208, 0.6);
  }
`;

const LandingWrapper = styled.div.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '34vh'
})`
  position: relative;
  height: 100%;
  /* min-height: ${props => props.height}    */
`;


const H1 = styled.h1.attrs({
  color: props => props.color || '#1e85d0'
})`
  color: ${props => props.color}
  // color: white;
`;

const LandingContainer = styled.div.attrs({
  background: props => props.bg || '#ffffff',
  height: props => props.height || '30vh'
})`
  margin: 0 auto;
  max-width: 960px;  
  height: 100%;
  min-height: ${props => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Marquee = styled.section`
  // max-width: 1400px;
  margin: 0 auto;
  // outline: 2px solid orange;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 2.45rem;
`;

const slider = keyframes`
  0% { left: 0; }
  100% { left: -920px; }
`;

const MarqueeInner = styled.div`
  width: 1840px;
  position: absolute;
  display: block;
  animation: ${slider} 20s linear infinite;
`;

const MarqueeSpan = styled.span`
  float: left;
  width: 50%;
`;

const svgStyle = {
  width: "83px",
  height: "83px",
  display: "inline-block",
}


function sortBlogs(blogs) {
  return blogs.allMarkdownRemark.edges.sort((post1, post2) => {
    return post1.node.frontmatter._id - post2.node.frontmatter._id;
  })
}

const IndexPage = ({ data }) => (
  <div>
    <LandingWrapper>
      <LandingContainer>
        <H1 style={{ marginTop: "1.45rem" }}>
          Full-stack Web Developer
        </H1>
        <H3 weight="400">
          I love building <span style={{ color: "#1e85d0" }}>awesome</span> websites.
        </H3>        
      </LandingContainer>
    </LandingWrapper>

    <LandingWrapper height="34vh">
      {/* <Landing bg="#f4f4f4" height="34vh"/>       */}
      <Marquee>
        <MarqueeInner>
          <MarqueeSpan>
            <ReactLogo style={svgStyle} />
            <ReduxLogo style={svgStyle} />
            <CssLogo style={svgStyle} />
            <SassLogo style={svgStyle} />
            <PostmanLogo style={svgStyle} />
            <HerokuLogo style={svgStyle} />
            <NodeLogo style={svgStyle} />
            <WebpackLogo style={svgStyle} />
            <JsLogo style={svgStyle} />
            <HtmlLogo style={svgStyle} />
            <FlaskLogo style={svgStyle} />
          </MarqueeSpan>
          <MarqueeSpan>
            <ReactLogo style={svgStyle} />
            <ReduxLogo style={svgStyle} />
            <CssLogo style={svgStyle} />
            <SassLogo style={svgStyle} />
            <PostmanLogo style={svgStyle} />
            <HerokuLogo style={svgStyle} />
            <NodeLogo style={svgStyle} />
            <WebpackLogo style={svgStyle} />
            <JsLogo style={svgStyle} />
            <HtmlLogo style={svgStyle} />
            <FlaskLogo style={svgStyle} />
          </MarqueeSpan>
        </MarqueeInner>
      </Marquee>
    </LandingWrapper>
    <LandingWrapper>
      {/* <Landing>
      </Landing> */}
      <LandingContainer>
        <H1>Blog</H1>
        <Ul>
          {
            sortBlogs(data).slice(5).reverse().map(post => (
              <Li>
                <StyledLink
                  to={post.node.frontmatter.path}
                >
                  <p>{post.node.frontmatter.title}</p>
                  <p>{post.node.frontmatter.path.replace(/^\/|\/$/g, '')}</p>
                </StyledLink>
              </Li>
            ))
          }
        </Ul>
        <Link to="/blog">Read more blogs &rarr;</Link>
      </LandingContainer>
    </LandingWrapper>
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 90) {
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
