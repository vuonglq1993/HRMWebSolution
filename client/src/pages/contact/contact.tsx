import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import heroImg from '../../assets/images/hero_1.jpg';
import person1 from '../../assets/images/person_1.jpg';
import person2 from '../../assets/images/person_2.jpg';



const ContactPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section
      className="section-hero overlay inner-page text-white"
      style={{ backgroundImage: `url(${heroImg})` }}
    >        <Container>
          <Row>
            <Col md={7}>
              <h1>Contact Us</h1>
              <div className="custom-breadcrumbs">
                <a href="#" className="text-white">Home</a> / <strong>Contact Us</strong>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="site-section" id="contact-form">
        <Container>
          <Row>
            <Col lg={6} className="mb-5">
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="fname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={7} placeholder="Write your notes or questions here..." />
                </Form.Group>

                <Button variant="primary" type="submit">Send Message</Button>
              </Form>
            </Col>

            <Col lg={5} className="ml-auto">
              <Card className="p-4 mb-3">
                <p className="mb-0 fw-bold">Address</p>
                <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

                <p className="mb-0 fw-bold">Phone</p>
                <p className="mb-4"><a href="#">+1 232 3235 324</a></p>

                <p className="mb-0 fw-bold">Email Address</p>
                <p className="mb-0"><a href="#">youremail@domain.com</a></p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="site-section bg-light">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h2>Happy Candidates Says</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Card className="mb-4 p-3">
                <blockquote className="blockquote">
                  <p>&ldquo;Ipsum harum assumenda in eum vel eveniet numquam cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.&rdquo;</p>
                </blockquote>
                <div className="d-flex align-items-center mt-3">
                  <img src={person1} alt="Elisabeth" className="me-3" width={64} height={64} />
                  <div>
                    <h5>Elisabeth Smith</h5>
                    <small>Creative Director</small>
                  </div>
                </div>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="mb-4 p-3">
                <blockquote className="blockquote">
                  <p>&ldquo;Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.&rdquo;</p>
                </blockquote>
                <div className="d-flex align-items-center mt-3">
                  <img src={person2} alt="Chris" className="me-3" width={64} height={64} />
                  <div>
                    <h5>Chris Peter</h5>
                    <small>Web Designer</small>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
