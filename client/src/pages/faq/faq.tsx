import React from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import heroImg from '../../assets/images/hero_1.jpg';


const FAQPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section
        className="section-hero overlay inner-page bg-image text-white"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <Container>
          <Row>
            <Col md={7}>
              <h1>Frequently Ask Questions</h1>
              <div className="custom-breadcrumbs">
                <a href="/" className="text-white">
                  Home
                </a>{" "}
                / <strong>FAQ</strong>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Accordion */}
      <section className="site-section" id="accordion-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={6}>
              <img
                src="/images/sq_img_8.jpg"
                alt="FAQ"
                className="img-fluid rounded mb-4"
              />
            </Col>
            <Col lg={5}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What is the name of your company?</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Consequatur quae cumque perspiciatis aperiam accusantium
                      facilis provident aspernatur nisi optio debitis dolorum,
                      est eum eligendi vero aut ad necessitatibus nulla sit labore
                      doloremque magnam!
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>How much pay for 3 months?</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Vel ad laborum expedita. Nostrum iure atque enim quisquam
                      minima distinctio omnis, consequatur aliquam suscipit,
                      quidem, esse aspernatur!
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Do I need to register?</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Vel ad laborum expedita. Nostrum iure atque enim quisquam
                      minima distinctio omnis, consequatur aliquam suscipit,
                      quidem, esse aspernatur!
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Who should I contact in case of support?</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Vel ad laborum expedita. Nostrum iure atque enim quisquam
                      minima distinctio omnis, consequatur aliquam suscipit,
                      quidem, esse aspernatur!
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
                  <p>
                    &ldquo;Ipsum harum assumenda in eum vel eveniet numquam cumque vero
                    vitae enim cupiditate deserunt eligendi officia modi consectetur.&rdquo;
                  </p>
                </blockquote>
                <div className="d-flex align-items-center mt-3">
                  <img src="/images/person_1.jpg" alt="Elisabeth" className="me-3" width={64} height={64} />
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
                  <p>
                    &ldquo;Ipsum harum assumenda in eum vel eveniet numquam, cumque vero
                    vitae enim cupiditate deserunt eligendi officia modi consectetur.&rdquo;
                  </p>
                </blockquote>
                <div className="d-flex align-items-center mt-3">
                  <img src="/images/person_2.jpg" alt="Chris" className="me-3" width={64} height={64} />
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

export default FAQPage;
