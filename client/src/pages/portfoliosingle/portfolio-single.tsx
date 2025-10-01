import React from "react";
import { Container, Row, Col, Button, Figure } from "react-bootstrap";

// import ảnh từ assets
import hero1 from "../../assets/images/hero_1.jpg";
import sqImg2 from "../../assets/images/sq_img_2.jpg";
import sqImg6 from "../../assets/images/sq_img_6.jpg";
import sqImg7 from "../../assets/images/sq_img_7.jpg";
import sqImg8 from "../../assets/images/sq_img_8.jpg";
import person1 from "../../assets/images/person_1.jpg";
import person2 from "../../assets/images/person_2.jpg";

const PortfolioSingle: React.FC = () => {
  return (
    <div id="top">
      {/* Overlayer and Loader */}
      <div id="overlayer"></div>
      <div className="loader">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div className="site-wrap">

        {/* Hero */}
        <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: `url(${hero1})` }} id="home-section">
          <Container>
            <Row>
              <Col md={7}>
                <h1 className="text-white font-weight-bold">Portfolio Single (Extra Pages)</h1>
                <div className="custom-breadcrumbs">
                  <a href="index.html">Home</a> <span className="mx-2 slash">/</span>
                  <a href="portfolio.html">Portfolio</a> <span className="mx-2 slash">/</span>
                  <span className="text-white"><strong>Portfolio Single</strong></span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Portfolio Images & Sidebar */}
        <section className="site-section pb-0 portfolio-single" id="next-section">
          <Container>
            <Row className="mb-5 mt-5">
              <Col lg={8}>
                {[sqImg6, sqImg2, sqImg7, sqImg8].map((img, idx) => (
                  <Figure key={idx}>
                    <a href={img} data-fancybox="gallery">
                      <Figure.Image src={img} alt={`Portfolio ${idx}`} className="img-fluid" />
                    </a>
                  </Figure>
                ))}
              </Col>

              <Col lg={4} className="ml-auto h-100 jm-sticky-top">
                <div className="mb-4">
                  <h3 className="mb-4 h4 border-bottom">Project Description</h3>
                  <p className="mb-0">
                    Nostrum iure atque enim quisquam minima distinctio omnis consequatur aliquam suscipit quidem esse aspernatur Libero excepturi animi repellendus porro impedit
                  </p>
                </div>

                <Row className="mb-4">
                  <Col xs={12} className="mb-4">
                    <strong className="d-block text-black">Client</strong>
                    Google, Inc.
                  </Col>
                  <Col xs={12} className="mb-4">
                    <strong className="d-block text-black">Role</strong>
                    Design, Front-End and Back-End (WordPress)
                  </Col>
                  <Col xs={12} className="mb-4">
                    <strong className="d-block text-black">Year Started</strong>
                    2019
                  </Col>
                  <Col xs={12} className="mb-4">
                    <strong className="d-block text-black mb-3">Website URL</strong>
                    <Button variant="outline-primary" className="border-width-2">Visit Website</Button>
                  </Col>
                </Row>

                <div className="block__87154 mb-0">
                  <blockquote>
                    <p>
                      Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit
                    </p>
                  </blockquote>
                  <div className="block__91147 d-flex align-items-center">
                    <Figure className="mr-4">
                      <Figure.Image src={person2} alt="Chris Peter" className="img-fluid" />
                    </Figure>
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

        {/* Project navigation */}
        <section className="py-3 site-section mb-5">
          <Container>
            <Row>
              <Col md={4} className="text-center">
                <Button variant="outline-primary" className="border-width-2 d-block">Previous Project</Button>
              </Col>
              <Col md={4} className="text-center">
                <Button variant="primary" className="border-width-2 d-block">All Projects</Button>
              </Col>
              <Col md={4} className="text-center">
                <Button variant="outline-primary" className="border-width-2 d-block">Next Project</Button>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Testimonials */}
        <section className="site-section bg-light">
          <Container>
            <Row className="mb-5">
              <Col className="text-center" data-aos="fade">
                <h2 className="section-title mb-3">Happy Candidates Says</h2>
              </Col>
            </Row>
            <Row>
              {[
                { img: person1, name: "Elisabeth Smith", position: "Creative Director" },
                { img: person2, name: "Chris Peter", position: "Web Designer" },
              ].map((p, idx) => (
                <Col lg={6} key={idx}>
                  <div className="block__87154 bg-white rounded">
                    <blockquote>
                      <p>
                        Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit
                      </p>
                    </blockquote>
                    <div className="block__91147 d-flex align-items-center">
                      <Figure className="mr-4">
                        <Figure.Image src={p.img} alt={p.name} className="img-fluid" />
                      </Figure>
                      <div>
                        <h3>{p.name}</h3>
                        <span className="position">{p.position}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Footer */}
      </div>
    </div>
  );
};

export default PortfolioSingle;
