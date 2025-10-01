import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// Import ảnh
import heroImg from "../../assets/images/hero_1.jpg";
import sq1 from "../../assets/images/sq_img_1.jpg";
import sq2 from "../../assets/images/sq_img_2.jpg";
import sq3 from "../../assets/images/sq_img_3.jpg";
import sq4 from "../../assets/images/sq_img_4.jpg";
import sq5 from "../../assets/images/sq_img_5.jpg";
import sq6 from "../../assets/images/sq_img_6.jpg";
import sq7 from "../../assets/images/sq_img_7.jpg";
import sq8 from "../../assets/images/sq_img_8.jpg";
import sq9 from "../../assets/images/sq_img_9.jpg";
import sq10 from "../../assets/images/sq_img_10.jpg";
import sq11 from "../../assets/images/sq_img_11.jpg";
import sq12 from "../../assets/images/sq_img_12.jpg";
import person1 from "../../assets/images/person_1.jpg";
import person2 from "../../assets/images/person_2.jpg";

const portfolioItems = [
  { img: sq1, category: "web" },
  { img: sq2, category: "web" },
  { img: sq3, category: "brand" },
  { img: sq4, category: "design" },
  { img: sq5, category: "web" },
  { img: sq6, category: "brand" },
  { img: sq7, category: "web" },
  { img: sq8, category: "design" },
  { img: sq9, category: "web" },
  { img: sq10, category: "design" },
  { img: sq11, category: "brand" },
  { img: sq12, category: "design" },
];

const Portfolio: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: `url(${heroImg})` }}
        id="home-section"
      >
        <Container>
          <Row>
            <Col md={7}>
              <h1 className="text-white font-weight-bold">Portfolio (Extra Pages)</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Portfolio</strong></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Portfolio Filter & Items */}
      <section className="site-section block__62272" id="next-section">
        <Container>
          <Row className="justify-content-center mb-5" data-aos="fade-up">
            <div id="filters" className="filters text-center button-group col-md-7">
              <Button className="btn-primary active">All</Button>{" "}
              <Button className="btn-primary">Web</Button>{" "}
              <Button className="btn-primary">Design</Button>{" "}
              <Button className="btn-primary">Brand</Button>
            </div>
          </Row>
          <Row id="posts" className="no-gutter">
            {portfolioItems.map((item, idx) => (
              <Col
                key={idx}
                className={`item ${item.category} col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4`}
              >
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img src={item.img} className="img-fluid" alt={`Portfolio ${idx + 1}`} />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Happy Candidates */}
      <section className="site-section bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center" data-aos="fade">
              <h2 className="section-title mb-3">Happy Candidates Says</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Card className="block__87154 bg-white rounded">
                <blockquote>
                  <p>
                    Ipsum harum assumenda in eum vel eveniet numquam cumque vero vitae enim cupiditate
                    deserunt eligendi officia modi consectetur. Expedita tempora quos nobis earum hic
                    ex asperiores quisquam optio nostrum sit
                  </p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <figure className="mr-4">
                    <img src={person1} alt="Elisabeth" className="img-fluid" />
                  </figure>
                  <div>
                    <h3>Elisabeth Smith</h3>
                    <span className="position">Creative Director</span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="block__87154 bg-white rounded">
                <blockquote>
                  <p>
                    Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim
                    cupiditate deserunt eligendi officia modi consectetur. Expedita tempora quos
                    nobis earum hic ex asperiores quisquam optio nostrum sit
                  </p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <figure className="mr-4">
                    <img src={person2} alt="Chris" className="img-fluid" />
                  </figure>
                  <div>
                    <h3>Chris Peter</h3>
                    <span className="position">Web Designer</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>


    </div>
  );
};

export default Portfolio;
