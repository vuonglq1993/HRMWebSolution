import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heroImg from "../../assets/images/hero_1.jpg";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();


  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_URL}/recruitment/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!job) return <p className="text-center mt-5">Job not found</p>;

  return (
    <div>
      {/* HERO */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: `url(${heroImg})` }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">{job.title}</h1>
              <div className="custom-breadcrumbs">
                <a href="/">Home</a> <span className="mx-2 slash">/</span>
                <a href="/jobs">Jobs</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>{job.title}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOB DETAILS */}
      <section className="site-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="d-flex align-items-center">
                <div className="border p-2 d-inline-block mr-3 rounded">
                  <img src="/images/job_logo_5.jpg" alt="Logo" />
                </div>
                <div>
                  <h2>{job.title}</h2>
                  <div>
                    <span className="ml-0 mr-2 mb-2">
                      <span className="icon-briefcase mr-2"></span>
                      {job.companyName}
                    </span>
                    <span className="m-2">
                      <span className="icon-room mr-2"></span>
                      {job.categoryName}
                    </span>
                    <span className="m-2">
                      <span className="icon-clock-o mr-2"></span>
                      <span className="text-primary">
                        {job.status === 1 ? "Open" : "Closed"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="row">
                <div className="col-6">
                  <button className="btn btn-block btn-light btn-md">
                    <span className="icon-heart-o mr-2 text-danger"></span>
                    Save Job
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-block btn-primary btn-md"
                    onClick={() => navigate(`/apply-form/${id}`)}
                  >Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bạn có thể thêm mô tả, yêu cầu từ backend sau này */}
        </div>
      </section>
    </div>
  );
};

export default JobSinglePage;
