import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import Git from "../assets/github.svg";
import Home from "../assets/home.svg";

const FooterMain = styled.footer`
  background: rgb(35, 40, 45);
  position: absolute;
  left: 0;
  right: 0;
  margin-bottom: 0;
  padding-bottom: 0.75em;
  padding: 0.2em 1em;
  color: #f1f1f1;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 0.7rem;
  a {
    color: #f1f1f1;
    text-decoration: none;
    margin: 0 2rem;
    margin-top: 0.45rem;
    &:hover {
      color: #1e85d0;
    }
    &:first-of-type {
      margin-left: 0;
    }
  }

  p {
    margin-bottom: 0.45rem;
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  /* margin: .45rem; */
`;

const FooterItem = styled.div`
  a {
    color: #f1f1f1;
    text-decoration: none;
    margin-right: 1rem;
    margin-top: 0.45rem;
    &:hover {
      color: #1e85d0;
    }
  }

  p {
    margin-bottom: 0.45rem;
    font-size: 0.7rem;
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
    {/* <FooterItem>         */}
    <FooterLink exact to="/">
      Home
    </FooterLink>
    <span>&#8729;</span>
    <a target="_blank" href="https://github.com/dacrands">
      Github
    </a>
    <span>&#8729;</span>
    <a target="_blank" href="https://dcrands.com/">
      Portfolio
    </a>
    <p>© 2018 by David Crandall. All rights reserved. 🌏</p>
    {/* </FooterItem> */}
  </FooterMain>
);

export default Footer;
