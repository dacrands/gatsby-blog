import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

import Git from '../assets/github.svg';
import Home from '../assets/home.svg';

const FooterMain = styled.div`
  // outline: 3px dashed purple;
  
  background: rgb(35, 40, 45);
  // position: fixed;
  // bottom: 0;  
  position: absolute;
  left: 0;
  right: 0;
  margin-top: -2.9rem;
  margin-bottom: 0;
  padding-bottom: .75em;
  padding: 0.2em 1em;
  color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const FooterLink = styled(Link)`
  // outline: 3px dashed blue;  
  text-decoration: none;
  margin: .45rem;
`;

const FooterItem = styled.div`
  // outline: 3px dashed orange;
  display: flex;
  // flex-direction: column;    
  align-items: center;  
  a {    
    color: #f1f1f1;
    text-decoration: none;
    margin: 0 2rem;
    margin-top: 0.45rem;
    &:hover {
      color: #1d669b; 
    }
  }

  p {
    margin-bottom: .45rem;
    font-size: .7rem;
  }
`;

const GitSvg = styled(Git)`
  fill: #f1f1f1;  
  height: 2em;
  &:hover {
    fill: #1d669b;
  }
`;

const HomeSvg = styled(Home)`
  fill: #f1f1f1;  
  height: 2em;
  width: 3em;
  &:hover {
    fill: #1d669b;
  }
`;


const Footer = () => (
  <FooterMain>
      <FooterItem>
        
          <FooterLink exact to="/">
            { <HomeSvg /> }            
          </FooterLink>          
        
          <a target="_blank" href="https://github.com/dacrands">
            { <GitSvg /> }
          </a>                      
      </FooterItem>
      <FooterItem>
        <p>Built by dacrands using Gatsby JS</p>      
      </FooterItem>
  </FooterMain>
);


export default Footer