import React from "react";
import { Container, Row, Col, Form, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";

const LoginSignUpPage: React.FC = () => {
  return (
    <div id="top">
      {/* NAVBAR */}


      {/* HERO */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: "url('images/hero_1.jpg')" }}
        id="home-section"
      >
        <Container>
          <Row>
            <Col md={7}>
              <h1 className="text-white font-weight-bold">Sign Up/Login</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Log In</strong>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SIGN UP / LOGIN */}
      <section className="site-section">
        <Container>
          <Row>
            {/* SIGN UP */}
            <Col lg={6} className="mb-5">
              <h2 className="mb-4">Sign Up To JobBoard</h2>
              <Form className="p-4 border rounded">
                <Form.Group className="mb-3" controlId="signupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email address" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="signupRePassword">
                  <Form.Label>Re-Type Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-type Password" />
                </Form.Group>

                <Button type="submit" className="px-4 btn-primary text-white">
                  Sign Up
                </Button>
              </Form>
            </Col>

            {/* LOGIN */}
            <Col lg={6}>
              <h2 className="mb-4">Log In To JobBoard</h2>
              <Form className="p-4 border rounded">
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email address" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button type="submit" className="px-4 btn-primary text-white">
                  Log In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default LoginSignUpPage;
