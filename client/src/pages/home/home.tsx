import React, { useState } from "react";
import heroImg from "../../assets/images/hero_1.jpg";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: "",
    region: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // tạo query string từ filters
    const query = new URLSearchParams({
      title: filters.title,
      region: filters.region,
      type: filters.type,
    }).toString();

    // chuyển hướng sang /job-listing kèm query
    navigate(`/job-listing?${query}`);
  };

  return (
    <div className="site-wrap">
      <section
        className="home-section section-hero overlay bg-image"
        style={{ backgroundImage: `url(${heroImg})` }}
        id="home-section"
      >
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={12} className="text-center mb-5">
              <h1 className="text-white font-weight-bold">
                The Easiest Way To Get Your Dream Job
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate est, consequuntur perferendis.
              </p>

              {/* 🔍 FORM SEARCH */}
              <Form className="search-jobs-form" onSubmit={handleSearch}>
                <Row className="mb-5">
                  <Col lg={9} md={6} sm={6} className="mb-4 mb-lg-0">
                    <FormControl
                      name="title"
                      type="text"
                      placeholder="Job title or company"
                      value={filters.title}
                      onChange={handleChange}
                      className="form-control-lg"
                    />
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block text-white btn-search"
                    >
                      <span className="icon-search icon mr-2"></span>
                      Search Job
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
