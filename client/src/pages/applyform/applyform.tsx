import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ApplyForm() {
  const { id } = useParams<{ id: string }>(); // lấy từ route /apply/:id
  const recruitmentId = parseInt(id || "0");

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId"); // lấy từ login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !cvFile) {
      setMessage("Please login and select a CV file!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // 1. Upload file PDF
      const formData = new FormData();
      formData.append("file", cvFile);

      const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = uploadRes.data.url;

      // 2. Apply post
      await axios.post(`${API_URL}/applypost`, {
        userId: parseInt(userId),
        recruitmentId,
        nameCv: fileUrl,
        text,
        status: 1, // Pending
        createdAt: new Date().toISOString(),
      });

      setMessage("Apply successful!");
      setCvFile(null);
      setText("");
    } catch (err) {
      console.error(err);
      setMessage("Apply failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!recruitmentId) return <p>Invalid recruitment id</p>;

  return (
    <div className="container mt-5">
      <h2>Apply for Recruitment #{recruitmentId}</h2>
      <Form onSubmit={handleSubmit}>
        {message && <Alert variant="info">{message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Upload CV (PDF)</Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Apply"}
        </Button>
      </Form>
    </div>
  );
}
