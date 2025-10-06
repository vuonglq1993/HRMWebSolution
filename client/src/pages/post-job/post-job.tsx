import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import heroImage from "../../assets/images/hero_1.jpg";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PostJob = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Type: "Full-time",
    Salary: "",
    Quantity: "",
    Experience: "",
    Rank: "",
    Address: "",
    Deadline: "",
    CategoryId: "",
    CompanyId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // 👈 nếu có bảo mật
      const res = await axios.post(`${API_URL}/recruitment`, {
        ...formData,
        Status: 1,
        Views: 0,
        CreatedAt: new Date().toISOString(),
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      setMessage("✅ Job posted successfully!");
      setFormData({
        Title: "",
        Description: "",
        Type: "Full-time",
        Salary: "",
        Quantity: "",
        Experience: "",
        Rank: "",
        Address: "",
        Deadline: "",
        CategoryId: "",
        CompanyId: "",
      });
    } catch (err: any) {
      console.error("Error posting job:", err);
      setError("❌ Failed to post job. Check your data or token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-wrap">
      {/* HERO */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: `url(${heroImage})` }}
        id="home-section"
      >
        <Container>
          <Row>
            <Col md={7}>
              <h1 className="text-white font-weight-bold">Post A Job</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
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
          </Row>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form className="p-4 p-md-5 border rounded" onSubmit={handleSubmit}>
            <h3 className="text-black mb-4 border-bottom pb-2">Job Details</h3>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="Backend Developer"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Job description here..."
                rows={4}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="Type" value={formData.Type} onChange={handleChange}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Intern">Intern</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="Salary"
                    value={formData.Salary}
                    onChange={handleChange}
                    placeholder="1000-1500 USD"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="Quantity"
                    value={formData.Quantity}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="Experience"
                    value={formData.Experience}
                    onChange={handleChange}
                    placeholder="1-3 years"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rank</Form.Label>
                  <Form.Control
                    type="text"
                    name="Rank"
                    value={formData.Rank}
                    onChange={handleChange}
                    placeholder="Junior / Senior"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    placeholder="Hanoi, Vietnam"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="Deadline"
                    value={formData.Deadline}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Category ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="CategoryId"
                    value={formData.CategoryId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Company ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="CompanyId"
                    value={formData.CompanyId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : "Post Job"}
              </Button>
            </div>
          </Form>
        </Container>
      </section>
    </div>
  );
};

export default PostJob;
