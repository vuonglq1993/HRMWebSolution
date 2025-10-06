import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Form, Button, FormControl } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import heroImg from "../../assets/images/hero_1.jpg";

const API_URL = import.meta.env.VITE_API_URL;

const JobListing: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("title") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        let url = `${API_URL}/recruitment`;

        if (keyword.trim()) {
          url = `${API_URL}/recruitment/search?keyword=${encodeURIComponent(keyword)}`;
        }

        const res = await axios.get(url);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching recruitment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/job-listing?title=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div id="top">
      <div className="site-wrap">
        {/* HERO */}
        <section
          className="section-hero home-section overlay inner-page bg-image"
          style={{ backgroundImage: `url(${heroImg})` }}
          id="home-section"
        >
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col md={12}>
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">
                    {keyword
                      ? `Search results for "${keyword}"`
                      : "All Job Listings"}
                  </h1>

                  {/* 🔍 SEARCH AGAIN FORM */}
                  <Form className="search-jobs-form mt-4" onSubmit={handleSearch}>
                    <Row className="justify-content-center">
                      <Col lg={6} md={8} sm={10}>
                        <FormControl
                          type="text"
                          placeholder="Search again..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control-lg mb-3"
                        />
                      </Col>
                      <Col lg={2} md={4} sm={6}>
                        <Button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block text-white btn-search"
                        >
                          <span className="icon-search icon mr-2"></span>
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* JOB LIST */}
        <section className="site-section" id="next">
          <Container>
            <Row className="mb-5 justify-content-center">
              <Col md={7} className="text-center">
                <h2 className="section-title mb-2">
                  {loading ? "Loading..." : `${jobs.length} Job(s) Found`}
                </h2>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" />
              </div>
            ) : (
              <ul className="job-listings mb-5">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                  >
                    <Link to={`/job-single/${job.id}`} />
                    <div className="job-listing-logo">
                      <img
                        src={"/images/job_logo_1.jpg"}
                        alt={job.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                      <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                        <h2>{job.title}</h2>
                        <strong>{job.companyName}</strong>
                      </div>
                      <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                        <span className="icon-briefcase"></span>{" "}
                        {job.categoryName}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      </div>
    </div>
  );
};

export default JobListing;
