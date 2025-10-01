import React from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import heroImg from '../../assets/images/hero_1.jpg';

import "./job-listing.css"; // bạn cần copy css từ original vào đây

const JobListing: React.FC = () => {
  return (
    <div id="top">
      {/* OVERLAY + LOADER */}
      <div id="overlayer"></div>
      <div className="loader">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div className="site-wrap">
        {/* HERO SECTION */}
        <section
          className="section-hero home-section overlay inner-page bg-image"
          style={{ backgroundImage: `url(${heroImg})` }}

          id="home-section"
        >
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col md={12}>
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">The Easiest Way To Get Your Dream Job</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quas fugit ex!</p>
                </div>

                <Form method="post" className="search-jobs-form">
                  <Row className="mb-5">
                    <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0">
                      <Form.Control type="text" placeholder="Job title, Company..." />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0">
                      <Form.Select title="Select Region">
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
                    <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0">
                      <Form.Select title="Select Job Type">
                        <option>Part Time</option>
                        <option>Full Time</option>
                      </Form.Select>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0">
                      <Button type="submit" className="btn btn-primary btn-lg btn-block text-white btn-search">
                        <span className="icon-search icon mr-2"></span>Search Job
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="popular-keywords">
                      <h3>Trending Keywords:</h3>
                      <ul className="keywords list-unstyled m-0 p-0">
                        <li><a href="#">UI Designer</a></li>
                        <li><a href="#">Python</a></li>
                        <li><a href="#">Developer</a></li>
                      </ul>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>

          <a href="#next" className="scroll-button smoothscroll">
            <span className=" icon-keyboard_arrow_down"></span>
          </a>
        </section>

        {/* JOB LISTINGS */}
        <section className="site-section" id="next">
          <Container>
            <Row className="mb-5 justify-content-center">
              <Col md={7} className="text-center">
                <h2 className="section-title mb-2">43,167 Job Listed</h2>
              </Col>
            </Row>

            <ul className="job-listings mb-5">
              {[
                { title: "Product Designer", company: "Adidas", location: "New York, New York", type: "Part Time", logo: "images/job_logo_1.jpg", badgeColor: "danger" },
                { title: "Digital Marketing Director", company: "Sprint", location: "Overland Park, Kansas", type: "Full Time", logo: "images/job_logo_2.jpg", badgeColor: "success" },
                { title: "Back-end Engineer (Python)", company: "Amazon", location: "Overland Park, Kansas", type: "Full Time", logo: "images/job_logo_3.jpg", badgeColor: "success" },
                { title: "Senior Art Director", company: "Microsoft", location: "Anywhere", type: "Full Time", logo: "images/job_logo_4.jpg", badgeColor: "success" },
                { title: "Product Designer", company: "Puma", location: "San Mateo, CA", type: "Full Time", logo: "images/job_logo_5.jpg", badgeColor: "success" },
              ].map((job, idx) => (
                <li key={idx} className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                  <a href="job-single.html"></a>
                  <div className="job-listing-logo">
                    <img src={job.logo} alt={job.title} className="img-fluid" />
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
                      <Badge bg={job.badgeColor}>{job.type}</Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* PAGINATION */}
            <Row className="pagination-wrap">
              <Col md={6} className="text-center text-md-left mb-4 mb-md-0">
                <span>Showing 1-7 Of 43,167 Jobs</span>
              </Col>
              <Col md={6} className="text-center text-md-right">
                <div className="custom-pagination ml-auto">
                  <a href="#" className="prev">Prev</a>
                  <div className="d-inline-block">
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                  </div>
                  <a href="#" className="next">Next</a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* SIGN UP BANNER */}
        <section className="py-5 bg-image overlay-primary fixed overlay" style={{ backgroundImage: `url('images/hero_1.jpg')` }}>
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h2 className="text-white">Looking For A Job?</h2>
                <p className="mb-0 text-white lead">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
              </Col>
              <Col md={3} className="ml-auto">
                <Button href="#" className="btn-warning btn-block btn-lg">Sign Up</Button>
              </Col>
            </Row>
          </Container>
        </section>

      </div>
    </div>
  );
};

export default JobListing;
