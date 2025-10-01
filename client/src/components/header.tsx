import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SiteNavbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>JobBoard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Job Listings" id="job-dropdown">
              <LinkContainer to="/job-single">
                <NavDropdown.Item>Job Single</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/post-job">
                <NavDropdown.Item>Post a Job</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <NavDropdown title="Pages" id="pages-dropdown">
              <LinkContainer to="/services">
                <NavDropdown.Item>Services</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/blog-single">
                <NavDropdown.Item>Blog Single</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to="/blog">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/contact">
              <Nav.Link active>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
          <div className="d-flex">
            <LinkContainer to="/post-job">
              <Button variant="outline-primary" className="me-2">Post a Job</Button>
            </LinkContainer>
            <LinkContainer to="/login">
              <Button variant="primary">Log In</Button>
            </LinkContainer>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
