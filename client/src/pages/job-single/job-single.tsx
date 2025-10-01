import React from "react";
import heroImg from '../../assets/images/hero_1.jpg';

const JobSinglePage = () => {
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
              <h1 className="text-white font-weight-bold">Product Designer</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <a href="#">Job</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Product Designer</strong></span>
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
                  <img src="images/job_logo_5.jpg" alt="Logo" />
                </div>
                <div>
                  <h2>Product Designer</h2>
                  <div>
                    <span className="ml-0 mr-2 mb-2">
                      <span className="icon-briefcase mr-2"></span>Puma
                    </span>
                    <span className="m-2">
                      <span className="icon-room mr-2"></span>New York City
                    </span>
                    <span className="m-2">
                      <span className="icon-clock-o mr-2"></span>
                      <span className="text-primary">Full Time</span>
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
                  <button className="btn btn-block btn-primary btn-md">Apply Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-lg-8">
              {/* Job Description */}
              <div className="mb-5">
                <figure className="mb-5">
                  <img
                    src="images/job_single_img_1.jpg"
                    alt="Job"
                    className="img-fluid rounded"
                  />
                </figure>
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-align-left mr-3"></span>Job Description
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga
                  eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore
                  beatae voluptates nemo blanditiis iste eius officia minus.
                </p>
                <p>
                  Velit unde aliquam et voluptas reiciendis non sapiente labore, deleniti
                  asperiores blanditiis nihil quia officiis dolor vero iste dolore vel molestiae
                  saepe. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!
                </p>
              </div>

              {/* Responsibilities */}
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-rocket mr-3"></span>Responsibilities
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>Necessitatibus quibusdam facilis</span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>
                      Velit unde aliquam et voluptas reiciendis non sapiente labore
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>Commodi quae ipsum quas est itaque</span>
                  </li>
                </ul>
              </div>

              {/* Education + Experience */}
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-book mr-3"></span>Education + Experience
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>Necessitatibus quibusdam facilis</span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>Velit unde aliquam et voluptas reiciendis non sapiente labore</span>
                  </li>
                </ul>
              </div>

              {/* Other Benefits */}
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-turned_in mr-3"></span>Other Benefits
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>Velit unde aliquam et voluptas reiciendis non sapiente labore</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-4">
              <div className="bg-light p-3 border rounded mb-4">
                <h3 className="text-primary mt-3 h5 pl-3 mb-3">Job Summary</h3>
                <ul className="list-unstyled pl-3 mb-0">
                  <li className="mb-2"><strong className="text-black">Published on:</strong> April 14, 2019</li>
                  <li className="mb-2"><strong className="text-black">Vacancy:</strong> 20</li>
                  <li className="mb-2"><strong className="text-black">Employment Status:</strong> Full-time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED JOBS */}
      <section className="site-section" id="next">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">22,392 Related Jobs</h2>
            </div>
          </div>
          <ul className="job-listings mb-5">
            <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
              <div className="job-listing-logo">
                <img src="images/job_logo_1.jpg" alt="Logo" className="img-fluid" />
              </div>
              <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                  <h2>Product Designer</h2>
                  <strong>Adidas</strong>
                </div>
                <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                  <span className="icon-room"></span> New York, New York
                </div>
                <div className="job-listing-meta">
                  <span className="badge badge-danger">Part Time</span>
                </div>
              </div>
            </li>
            {/* Thêm các job khác tương tự */}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default JobSinglePage;
