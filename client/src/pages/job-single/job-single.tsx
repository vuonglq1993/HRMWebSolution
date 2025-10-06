// src/pages/job/JobSinglePage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import heroImg from "../../assets/images/hero_1.jpg";

interface Job {
  id: number;
  title: string;
  companyName: string;
  categoryName: string;
  status: number;
}

const JobSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);

        // Fetch job
        const jobRes = await fetch(`${API_URL}/recruitment/${id}`);
        if (!jobRes.ok) throw new Error("Failed to fetch job");
        const jobData: Job = await jobRes.json();
        setJob(jobData);

        // Check saved
        if (userId) {
          const checkRes = await fetch(
            `${API_URL}/savejob/check-saved?userId=${userId}&recruitmentId=${id}`
          );
          if (!checkRes.ok) throw new Error("Failed to check saved status");
          const data = await checkRes.json();
          setSaved(data.saved);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, userId]);

  const handleToggleSaveJob = async () => {
    if (!userId) {
      alert("You must be logged in to save a job.");
      navigate("/login");
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const uid = parseInt(userId);
      const rid = parseInt(id || "0");

      if (!saved) {
        const res = await fetch(`${API_URL}/savejob`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: uid, recruitmentId: rid }),
        });
        if (!res.ok) throw new Error("Error saving job");
        setSaved(true);
        setMessage("✅ Job saved successfully!");
      } else {
        const res = await fetch(
          `${API_URL}/savejob/unsave?userId=${uid}&recruitmentId=${rid}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Error removing saved job");
        setSaved(false);
        setMessage("🗑️ Job removed from saved list.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Try again!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 2500);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!job) return <p className="text-center mt-5">Job not found</p>;

  return (
    <div>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: `url(${heroImg})` }}
        id="home-section"
      >
        <div className="container">
          <h1 className="text-white font-weight-bold">{job.title}</h1>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8">
              <h2>{job.title}</h2>
              <p>{job.companyName} - {job.categoryName}</p>
              <p>Status: {job.status === 1 ? "Open" : "Closed"}</p>
            </div>
            <div className="col-lg-4">
              <button
                className={`btn btn-block ${saved ? "btn-danger" : "btn-light"}`}
                onClick={handleToggleSaveJob}
                disabled={saving}
              >
                {saving ? "⏳..." : saved ? "Saved" : "Save Job"}
              </button>
              <button
                className="btn btn-block btn-primary mt-2"
                onClick={() => navigate(`/apply-form/${id}`)}
              >
                Apply Now
              </button>
              {message && <p className="text-center mt-2">{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobSinglePage;
