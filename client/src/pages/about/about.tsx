import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// --- IMPORT IMAGE ---
import heroImg from "../../assets/images/hero_1.jpg";
import sqImg6 from "../../assets/images/sq_img_6.jpg";
import sqImg8 from "../../assets/images/sq_img_8.jpg";
import person5 from "../../assets/images/person_5.jpg";
import person6 from "../../assets/images/person_6.jpg";

const About: React.FC = () => {
  return (
    <div id="top">
      {/* HERO */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: `url(${heroImg})` }}
        id="home-section"
      >
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

      {/* STATS */}
      <section
        className="py-5 bg-image overlay-primary fixed overlay"
        id="next-section"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <Container>
          <Row className="mb-5 justify-content-center">
            <Col md={7} className="text-center">
              <h2 className="section-title mb-2 text-white">JobBoard Site Stats</h2>
              <p className="lead text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.
              </p>
            </Col>
          </Row>
          <Row className="pb-0 block__19738 section-counter">
            <Col xs={6} md={3} className="mb-5 mb-lg-0 text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="1930">0</strong>
              </div>
              <span className="caption">Candidates</span>
            </Col>
            <Col xs={6} md={3} className="mb-5 mb-lg-0 text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="54">0</strong>
              </div>
              <span className="caption">Jobs Posted</span>
            </Col>
            <Col xs={6} md={3} className="mb-5 mb-lg-0 text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="120">0</strong>
              </div>
              <span className="caption">Jobs Filled</span>
            </Col>
            <Col xs={6} md={3} className="mb-5 mb-lg-0 text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="550">0</strong>
              </div>
              <span className="caption">Companies</span>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VIDEO SECTIONS */}
      <section className="site-section pb-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <a data-fancybox data-ratio="2" href="https://vimeo.com/317571768" className="block__96788">
                <span className="play-icon"><span className="icon-play"></span></span>
                <img src={sqImg6} alt="Image" className="img-fluid img-shadow" />
              </a>
            </Col>
            <Col lg={5} className="ml-auto">
              <h2 className="section-title mb-3">JobBoard For Freelancers, Web Developers</h2>
              <p className="lead">
                Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor, sed facere corporis qui, ea quisquam quis odit minus nulla vitae. Sit, voluptatem.
              </p>
              <p>
                Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="site-section pt-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0 order-md-2">
              <a data-fancybox data-ratio="2" href="https://vimeo.com/317571768" className="block__96788">
                <span className="play-icon"><span className="icon-play"></span></span>
                <img src={sqImg8} alt="Image" className="img-fluid img-shadow" />
              </a>
            </Col>
            <Col lg={5} className="mr-auto order-md-1 mb-5 mb-lg-0">
              <h2 className="section-title mb-3">JobBoard For Workers</h2>
              <p className="lead">
                Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor, sed facere corporis qui, ea quisquam quis odit minus nulla vitae. Sit, voluptatem.
              </p>
              <p>
                Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TEAM */}
      <section className="site-section">
        <Container>
          <Row className="mb-5">
            <Col className="text-center" data-aos="fade">
              <h2 className="section-title mb-3">Our Team</h2>
            </Col>
          </Row>
          <Row className="align-items-center block__69944">
            <Col md={6}>
              <img src={person6} alt="Elisabeth" className="img-fluid mb-4 rounded" />
            </Col>
            <Col md={6}>
              <h3>Elisabeth Smith</h3>
              <p className="text-muted">Creative Director</p>
              <p>
                Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel ad explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.
              </p>
            </Col>

            <Col md={6} className="order-md-2 ml-md-auto">
              <img src={person5} alt="Chintan" className="img-fluid mb-4 rounded" />
            </Col>
            <Col md={6}>
              <h3>Chintan Patel</h3>
              <p className="text-muted">Creative Director</p>
              <p>
                Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel ad explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
