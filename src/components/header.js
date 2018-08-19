import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background: #1d669b;  
  // background: rgb(15,20,25);  
  margin-bottom: 1.45rem;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`

const Links = styled.ul`
  // outline: 2px dashed red;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
  // outline: 3px dashed orange;
   margin: 0 1rem;
   padding: .45rem;
  }

  a {
    text-decoration: none;
    color: #f1f1f1;
    display: block;

    &:hover {
      color: rgb(35,40,45);
    }
  }

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link
          exact to="/"
          style={{
            color: '#f1f1f1',
            // color: 'rgb(35,40,45)',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Links>
        <li>
          <Link 
            exact to="/blog"
            activeStyle= {{
              color: '#f9f9f9',            
              color: 'rgb(35,40,45)',                    
            }}
          >
            Blog
          </Link>
        </li>
        <li>
          <a href="https://github.com/dacrands">Github</a>
        </li>        
      </Links>      
    </HeaderContainer>
  </HeaderWrapper>
)

export default Header
