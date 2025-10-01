import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/sq_img_1.jpg';
import img2 from '../../assets/images/sq_img_2.jpg';
import img3 from '../../assets/images/sq_img_4.jpg';

const BlogPage: React.FC = () => {
  const posts = [
    { id: 1, title: '7 Factors for Choosing Between Two Jobs', image: img1, date: 'April 15, 2019' },
    { id: 2, title: 'How to Write a Creative Cover Letter', image: img2, date: 'April 15, 2019' },
    { id: 3, title: 'The Right Way to Quit a Job You Started', image: img3, date: 'April 15, 2019' },
  ];


  return (
    <Container className="my-5">
      <Row>
        {posts.map(post => (
          <Col md={6} lg={4} className="mb-4" key={post.id}>
            <Card>
              <Link to={`/blog/${post.id}`}>
                <Card.Img variant="top" src={post.image} />
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </Card.Title>
                <Card.Text>{post.date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogPage;
