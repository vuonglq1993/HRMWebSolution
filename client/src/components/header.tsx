import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SiteNavbar: React.FC = () => {
  return (
    <Navbar expand="lg" className="py-3 bg-light">
      <Container>
        <Navbar.Brand as={Link} to="/">JobBoard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            {/* <Nav.Link as={Link} to="/job-listings">Job Listings</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/services">Pages</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/blog">Blog</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
          </Nav>
          <div className="d-flex">
            <Button variant="outline-primary" className="me-2">Post a Job</Button>
            <Button variant="primary">Log In</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
