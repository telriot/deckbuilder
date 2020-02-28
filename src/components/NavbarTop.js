import React, { Fragment, useContext } from "react"
import { Navbar, Nav, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
import AuthModalButton from "./Navbar/AuthModalButton"

const NavbarTop = () => {
  const { auth, setAuth } = useContext(AuthContext)

  const handleLogout = e => {
    axios
      .post("/api/auth/logout")
      .then(response => {
        if (!response.data.errmsg) {
          setAuth({ isAuthenticated: false, authUser: "", authUserId: "" })
        } else {
          console.log(response.data.errmsg, "no logout")
        }
      })
      .catch(error => {
        console.log("logout error", error)
      })
  }

  return (
    <Navbar bg="light" expand="lg" className="py-1 mb-2">
      <LinkContainer to="/">
        <Navbar.Brand>DeckLog</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="border-0 p-0"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {auth.isAuthenticated && (
            <Fragment>
              <LinkContainer exact to="/build">
                <Nav.Link>DeckBuilder</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to={`/users/${auth.authUserId}/settings`}>
                <Nav.Link>My Profile</Nav.Link>
              </LinkContainer>
            </Fragment>
          )}
          {!auth.isAuthenticated && (
            <Fragment>
              <Nav.Link>
                <AuthModalButton type="Signup" />
              </Nav.Link>
              <Nav.Link>
                <AuthModalButton type="Login" />
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
        {auth.isAuthenticated && (
          <LinkContainer exact to="/" onClick={e => handleLogout(e)}>
            <Button size="sm" variant="dark">
              Logout
            </Button>
          </LinkContainer>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarTop
