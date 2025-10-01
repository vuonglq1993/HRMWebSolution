import React from "react";
import heroImg from '../../assets/images/hero_1.jpg';

import { Container, Row, Col, Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <div className="site-wrap">
      {/* NAVBAR */}
      {/* HOME HERO */}
      <section
        className="home-section section-hero overlay bg-image"
        style={{ backgroundImage: `url(${heroImg})` }}
        id="home-section"
      >
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={12} className="text-center mb-5">
              <h1 className="text-white font-weight-bold">The Easiest Way To Get Your Dream Job</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est, consequuntur perferendis.</p>

              <Form className="search-jobs-form">
                <Row className="mb-5">
                  <Col lg={3} md={6} sm={6} className="mb-4 mb-lg-0">
                    <FormControl type="text" placeholder="Job title, Company..." className="form-control-lg" />
                  </Col>
                  <Col lg={3} md={6} sm={6} className="mb-4 mb-lg-0">
                    <Form.Select className="selectpicker" title="Select Region">
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
                  </Col>
                  <Col lg={3} md={6} sm={6} className="mb-4 mb-lg-0">
                    <Form.Select className="selectpicker" title="Select Job Type">
                      <option>Part Time</option>
                      <option>Full Time</option>
                    </Form.Select>
                  </Col>
                  <Col lg={3} md={6} sm={6} className="mb-4 mb-lg-0">
                    <Button type="submit" className="btn btn-primary btn-lg btn-block text-white btn-search">
                      <span className="icon-search icon mr-2"></span>Search Job
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* STATISTICS */}
      <section className="py-5 bg-image overlay-primary fixed overlay" style={{ backgroundImage: "url('images/hero_1.jpg')" }}>
        <Container>
          <Row className="mb-5 justify-content-center text-center">
            <Col md={7}>
              <h2 className="section-title mb-2 text-white">JobBoard Site Stats</h2>
              <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
            </Col>
          </Row>
          <Row className="pb-0 block__19738 section-counter text-center">
            {[
              { number: 1930, caption: "Candidates" },
              { number: 54, caption: "Jobs Posted" },
              { number: 120, caption: "Jobs Filled" },
              { number: 550, caption: "Companies" },
            ].map((stat, idx) => (
              <Col key={idx} xs={6} md={6} lg={3} className="mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number">{stat.number}</strong>
                </div>
                <span className="caption">{stat.caption}</span>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* JOB LISTINGS */}
      <section className="site-section">
        <Container>
          <Row className="mb-5 justify-content-center">
            <Col md={7} className="text-center">
              <h2 className="section-title mb-2">43,167 Job Listed</h2>
            </Col>
          </Row>

          <ul className="job-listings mb-5">
            {[
              { title: "Product Designer", company: "Adidas", location: "New York, New York", type: "Part Time", logo: "job_logo_1.jpg" },
              { title: "Digital Marketing Director", company: "Sprint", location: "Overland Park, Kansas", type: "Full Time", logo: "job_logo_2.jpg" },
              { title: "Back-end Engineer (Python)", company: "Amazon", location: "Overland Park, Kansas", type: "Full Time", logo: "job_logo_3.jpg" },
              { title: "Senior Art Director", company: "Microsoft", location: "Anywhere", type: "Full Time", logo: "job_logo_4.jpg" },
            ].map((job, idx) => (
              <li key={idx} className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <a href="job-single.html"></a>
                <div className="job-listing-logo">
                  <img src={`images/${job.logo}`} alt="logo" className="img-fluid" />
                </div>
                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{job.title}</h2>
                    <strong>{job.company}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span> {job.location}
                  </div>
                  <div className="job-listing-meta">
                    <span className={`badge ${job.type === "Part Time" ? "badge-danger" : "badge-success"}`}>{job.type}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
};

export default Home;
