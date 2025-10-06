import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- State ---
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // --- Auth info ---
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const recruitmentId = Number(id) || 0;

  // --- Auto load token + id từ localStorage ---
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!storedToken || !storedUserId) {
      setMessage("⚠️ Please log in before applying.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    setToken(storedToken);
    setUserId(Number(storedUserId));
  }, [navigate]);

  // --- Validate ---
  const validate = () => {
    if (!token || !userId) return "Please login first.";
    if (!cvFile) return "Please select a CV file.";
    if (!recruitmentId) return "Invalid recruitment ID.";
    return null;
  };

  // --- Upload CV ---
  const uploadCV = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", String(userId)); // ✅ thêm dòng này


    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("upload response:", res.data);
    const fileUrl = res.data.url || res.data.fileName || res.data.path;
    if (!fileUrl) throw new Error("Invalid upload response (no URL returned)");
    return fileUrl;
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // 1️⃣ Upload CV file
      const fileUrl = await uploadCV(cvFile!);

      // 2️⃣ Tạo payload apply
      const payload = {
        userId,
        recruitmentId,
        nameCv: fileUrl,
        text,
        status: 1,
        createdAt: new Date().toISOString(),
      };

      // 3️⃣ Gửi song song apply + lưu CV
      await Promise.all([
        axios.post(`${API_URL}/applypost`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.post(
          `${API_URL}/cv`,
          { userId, fileName: fileUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      setMessage("✅ Apply successful!");
      setCvFile(null);
      setText("");
    } catch (err: any) {
      console.error("Backend error:", err.response?.data || err.message);
      setMessage(
        "❌ Apply failed. " +
          (err.response?.data?.message || "Check console for details.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Apply for Recruitment #{recruitmentId}</h2>

      <Form onSubmit={handleSubmit}>
        {message && (
          <Alert variant={message.includes("✅") ? "success" : "danger"}>
            {message}
          </Alert>
        )}

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
