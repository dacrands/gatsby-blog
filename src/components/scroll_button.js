import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 1%;
  right: 5%;
  z-index: 3;
  background: #1e85d0;
  color: #ffff;
  padding: 0.25rem;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  display: none;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`;

class ScollButton extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    document.addEventListener("scroll", () => {
      window.scrollY > 500
        ? this.setState({ show: true })
        : this.setState({ show: false });
    });
  }

  scrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <Button
        style={this.state.show ? { display: "block" } : { display: "none" }}
        onClick={this.scrollTop}
      >
        Back to Top
      </Button>
    );
  }
}

export default ScollButton;
