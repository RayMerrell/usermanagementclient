import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserState } from "../context/context";

const Header = () => {
  try {
    const {
      userState: { currentUser },
    } = UserState();
  
    return (
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link className="headerLink" to="/">
              Home page
            </Link>
          </Navbar.Brand>
          {currentUser.id > 0 ? (
              <span className="headerUserName">
                {currentUser.userName} |  
                <Link className="headerLink" to="/logout">
                  Log Out
                </Link>
              </span>
          ) : (
            <Link className="headerLink" to="/login">
              Login
            </Link>
          )}
        </Container>
      </Navbar>
    );
  } catch (error) {
    console.error("header component error", error);
  }
};

export default Header;
