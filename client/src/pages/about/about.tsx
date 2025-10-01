import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Image } from 'react-bootstrap';

// Hero Section
const HeroSection: React.FC = () => (
  <section className="section-hero overlay inner-page" style={{ backgroundImage: "url('images/hero_1.jpg')" }}>
    <Container>
      <Row>
        <Col md={7}>
          <h1 className="text-white font-weight-bold">About Us</h1>
          <div className="custom-breadcrumbs">
            <a href="#">Home</a> <span className="mx-2 slash">/</span>
            <span className="text-white"><strong>About Us</strong></span>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

// Stats Section
const StatsSection: React.FC = () => {
  const stats = [
    { number: 1930, caption: "Candidates" },
    { number: 54, caption: "Jobs Posted" },
    { number: 120, caption: "Jobs Filled" },
    { number: 550, caption: "Companies" },
  ];

  return (
    <section className="py-5 bg-image overlay-primary fixed overlay" style={{ backgroundImage: "url('images/hero_1.jpg')" }}>
      <Container>
        <Row className="mb-5 justify-content-center text-center text-white">
          <Col md={7}>
            <h2 className="section-title mb-2">JobBoard Site Stats</h2>
            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
          </Col>
        </Row>
        <Row className="text-center">
          {stats.map((s, idx) => (
            <Col key={idx} xs={6} md={3} className="mb-5 mb-lg-0">
              <div className="d-flex justify-content-center align-items-center mb-2">
                <strong className="number">{s.number}</strong>
              </div>
              <span className="caption">{s.caption}</span>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// About Info Section
const AboutSection: React.FC = () => (
  <section className="site-section pb-0">
    <Container>
      <Row className="align-items-center mb-5">
        <Col lg={6}>
          <a href="https://vimeo.com/317571768" data-fancybox className="block__96788">
            <span className="play-icon"><span className="icon-play"></span></span>
            <Image src="images/sq_img_6.jpg" fluid className="img-shadow" />
          </a>
        </Col>
        <Col lg={5} className="ml-auto">
          <h2 className="section-title mb-3">JobBoard For Freelancers, Web Developers</h2>
          <p className="lead">Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor...</p>
          <p>Ipsum harum assumenda in eum vel eveniet numquam...</p>
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col lg={6} className="order-md-2">
          <a href="https://vimeo.com/317571768" data-fancybox className="block__96788">
            <span className="play-icon"><span className="icon-play"></span></span>
            <Image src="images/sq_img_8.jpg" fluid className="img-shadow" />
          </a>
        </Col>
        <Col lg={5} className="mr-auto order-md-1">
          <h2 className="section-title mb-3">JobBoard For Workers</h2>
          <p className="lead">Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor...</p>
          <p>Ipsum harum assumenda in eum vel eveniet numquam...</p>
        </Col>
      </Row>
    </Container>
  </section>
);

// Team Section
const TeamSection: React.FC = () => {
  const team = [
    { name: "Elisabeth Smith", role: "Creative Director", img: "images/person_6.jpg" },
    { name: "Chintan Patel", role: "Creative Director", img: "images/person_5.jpg" },
  ];

  return (
    <section className="site-section">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="section-title mb-3">Our Team</h2>
          </Col>
        </Row>
        <Row className="align-items-center">
          {team.map((member, idx) => (
            <React.Fragment key={idx}>
              <Col md={6} className={idx % 2 === 1 ? "order-md-2 ml-md-auto" : ""}>
                <Image src={member.img} fluid rounded className="mb-4" />
              </Col>
              <Col md={6}>
                <h3>{member.name}</h3>
                <p className="text-muted">{member.role}</p>
                <p>Soluta quasi cum delectus eum facilis recusandae nesciunt...</p>
                <div className="social mt-4">
                  <a href="#"><span className="icon-facebook"></span></a>
                  <a href="#"><span className="icon-twitter"></span></a>
                  <a href="#"><span className="icon-instagram"></span></a>
                  <a href="#"><span className="icon-linkedin"></span></a>
                </div>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Footer Section

// Main About Page
const About: React.FC = () => (
  <div>
    <HeroSection />
    <StatsSection />
    <AboutSection />
    <TeamSection />
  </div>
);

export default About;
