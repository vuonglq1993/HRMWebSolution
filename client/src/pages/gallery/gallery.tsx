

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import heroImg from '../../assets/images/hero_1.jpg';


// Dữ liệu gallery
const images = [
  "sq_img_1.jpg", "sq_img_2.jpg", "sq_img_3.jpg",
  "sq_img_4.jpg", "sq_img_5.jpg", "sq_img_6.jpg",
  "sq_img_11.jpg", "sq_img_2.jpg",
  "sq_img_7.jpg", "sq_img_8.jpg", "sq_img_9.jpg",
  "sq_img_10.jpg", "sq_img_11.jpg", "sq_img_12.jpg"
];

const GalleryPage: React.FC = () => {
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
              <h1>Gallery</h1>
              <div className="custom-breadcrumbs">
                <a href="/" className="text-white">Home</a>{" "}
                / <strong>Gallery</strong>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="site-section" id="gallery-section">
        <Container>
          <Row>
            {images.map((img, idx) => (
              <Col key={idx} md={6} lg={idx === 6 || idx === 7 ? 6 : 4} className="mb-4">
                <a
                  href={`/images/${img}`}
                  className="item-wrap fancybox"
                  data-fancybox="gallery2"
                >
                  <span className="icon-search2"></span>
                  <img className="img-fluid" src={`/images/${img}`} alt={`Gallery ${idx + 1}`} />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GalleryPage;
