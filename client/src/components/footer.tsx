import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col md={3}>
            <h5>Search Trending</h5>
            <ul>
              <li>Web Design</li>
              <li>Graphic Design</li>
              <li>Web Developers</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Company</h5>
            <ul>
              <li>About Us</li>
              <li>Career</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Support</h5>
            <ul>
              <li>Support</li>
              <li>Privacy</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} JobBoard. Template by Colorlib</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
