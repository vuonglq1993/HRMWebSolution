import React from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

const BlogSingle: React.FC = () => {
  return (
    <>

      {/* Hero */}
      <section className="bg-dark text-white p-5">
        <Container>
          <h1>Where Do You Learn HTML & CSS in 2020?</h1>
          <p>Posted by Admin &bullet; April 15, 2019</p>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            {/* Blog Content */}
            <Col lg={8}>
              <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit</h3>
              <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <Image src="/images/job_single_img_1.jpg" fluid rounded />
              <p>Lorem ipsum dolor sit amet...</p>

              <blockquote className="blockquote">
                <p>Lorem ipsum dolor sit amet...</p>
              </blockquote>

              {/* Comments */}
              <div className="pt-5">
                <h3 className="mb-5">6 Comments</h3>
                {/* Map comments here */}
              </div>

              {/* Comment Form */}
              <div className="pt-5">
                <h3 className="mb-5">Leave a comment</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="url" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                  </Form.Group>
                  <Button type="submit">Post Comment</Button>
                </Form>
              </div>
            </Col>

            {/* Sidebar */}
            <Col lg={4}>
              <div className="mb-4">
                <Form.Control placeholder="Search..." />
              </div>
              <div className="mb-4 text-center">
                <Image src="/images/person_1.jpg" roundedCircle fluid className="w-50 mb-3" />
                <h3>About The Author</h3>
                <p>Lorem ipsum dolor sit amet...</p>
                <Button size="sm">Read More</Button>
              </div>
              <div className="mb-4">
                <h3>Categories</h3>
                <ul>
                  <li>Creatives (12)</li>
                  <li>News (22)</li>
                  <li>Design (37)</li>
                  <li>HTML (42)</li>
                  <li>Web Development (14)</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
};

export default BlogSingle;
