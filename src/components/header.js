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
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link
          exact to="/"
          activeStyle= {{
            color: '#f9f9f9',            
            // color: 'rgb(35,40,45)',            
          }}
          style={{
            // color: 'white',
            color: 'rgb(35,40,45)',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </HeaderContainer>
  </HeaderWrapper>
)

export default Header
