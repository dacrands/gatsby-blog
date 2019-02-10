import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  // background: #1e85d0;
  /* background: rgb(35,40,45);   */
  margin-bottom: 1.45rem;
  border-bottom: 1px solid #dadada;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0.45rem 0.0875rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Links = styled.ul`
  // outline: 2px dashed red;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  li {
    // outline: 3px dashed orange;
    margin: 0 1rem;
    padding: 0.45rem;
  }

  a {
    text-decoration: none;
    color: #6f7477;
    display: block;

    &:hover {
      color: #1e85d0;
    }
  }

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h2 style={{ margin: 0 }}>
        <Link
          exact
          to="/"
          style={{
            color: " #6f7477",
            // color: 'rgb(35,40,45)',
            alignSelf: "center",
            textDecoration: "none"
          }}
          activeStyle={{
            color: "#f9f9f9",
            color: "#1e85d0"
          }}
        >
          {/* {siteTitle} */}
          Crandal<span style={{ color: "rgb(35,40,45)" }}>logs</span>
        </Link>
      </h2>
      <Links>
        <li>
          <Link
            exact
            to="/blog"
            activeStyle={{
              color: "#f9f9f9",
              color: "rgb(35,40,45)",
              color: "#1e85d0"
            }}
          >
            Blog
          </Link>
        </li>
        <li>
          <a href="https://dcrands.com">Portfolio</a>
        </li>
        <li>
          <a href="https://github.com/dacrands">Github</a>
        </li>
      </Links>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
