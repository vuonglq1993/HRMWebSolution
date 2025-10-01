import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import heroImage from "../../assets/images/hero_1.jpg";
import person1 from "../../assets/images/person_1.jpg";
import person2 from "../../assets/images/person_2.jpg";

const PostJob = () => {
  return (
    <div className="site-wrap">


      {/* HERO */}
      <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: `url(${heroImage})` }} id="home-section">
        <Container>
          <Row>
            <Col md={7}>
              <h1 className="text-white font-weight-bold">Post A Job</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <a href="#">Job</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Post a Job</strong></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FORM */}
      <section className="site-section">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={8} className="mb-4 mb-lg-0">
              <h2>Post A Job</h2>
            </Col>
            <Col lg={4}>
              <Row>
                <Col xs={6}>
                  <Button variant="light" className="btn-block"><span className="icon-open_in_new mr-2"></span>Preview</Button>
                </Col>
                <Col xs={6}>
                  <Button variant="primary" className="btn-block">Save Job</Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form className="p-4 p-md-5 border rounded">
            <h3 className="text-black mb-5 border-bottom pb-2">Job Details</h3>

            <Form.Group>
              <Form.Label className="d-block">Upload Featured Image</Form.Label>
              <Form.Control type="file" hidden />
              <Button className="btn btn-primary btn-md btn-file">Browse File</Button>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="you@yourdomain.com" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" placeholder="Product Designer" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="e.g. New York" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Job Region</Form.Label>
              <Form.Select>
                <option>Anywhere</option>
                <option>San Francisco</option>
                <option>Palo Alto</option>
                <option>New York</option>
                <option>Manhattan</option>
                <option>Ontario</option>
                <option>Toronto</option>
                <option>Kansas</option>
                <option>Mountain View</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Job Type</Form.Label>
              <Form.Select>
                <option>Part Time</option>
                <option>Full Time</option>
              </Form.Select>
            </Form.Group>

            {/* Company Details */}
            <h3 className="text-black my-5 border-bottom pb-2">Company Details</h3>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="e.g. New York" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tagline (Optional)</Form.Label>
              <Form.Control type="text" placeholder="e.g. New York" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Website (Optional)</Form.Label>
              <Form.Control type="text" placeholder="https://" />
            </Form.Group>
          </Form>

        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="site-section bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="col-12 text-center" data-aos="fade">
              <h2 className="section-title mb-3">Happy Candidates Says</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="block__87154 bg-white rounded">
                <blockquote>
                  <p>Ipsum harum assumenda in eum vel eveniet numquam cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur...</p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <img src={person1} alt="Elisabeth" className="mr-4 img-fluid" width={64} height={64}/>
                  <div>
                    <h3>Elisabeth Smith</h3>
                    <span className="position">Creative Director</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="block__87154 bg-white rounded">
                <blockquote>
                  <p>Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur...</p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <img src={person2} alt="Chris" className="mr-4 img-fluid" width={64} height={64}/>
                  <div>
                    <h3>Chris Peter</h3>
                    <span className="position">Web Designer</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default PostJob;
