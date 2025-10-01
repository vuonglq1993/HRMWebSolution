import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about/about';
import BlogSingle from './pages/blog-single/blog-single';
import BlogPage from './pages/blog/blog';
import ContactPage from './pages/contact/contact';
import FAQPage from './pages/faq/faq';
import GalleryPage from './pages/gallery/gallery';
import Home from './pages/home/home';
import JobListing from './pages/job-listing/job-listing';
import JobSinglePage from './pages/job-single/job-single';
import LoginSignUpPage from './pages/login/login';
import PortfolioSingle from './pages/portfoliosingle/portfolio-single';
import Portfolio from './pages/portfolio/portfolio';
import PostJob from './pages/post-job/post-job';
import './App.css';
// import Home from './pages/Home'; // Giả sử bạn có trang Home.tsx

import SiteNavbar from './components/header';
import Footer from './components/footer';

const App: React.FC = () => {
  return (
    <Router>

      <SiteNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/job-single" element={<JobSinglePage />} />
        <Route path="/login" element={<LoginSignUpPage />} />
        <Route path="/portfolio-single" element={<PortfolioSingle />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/post-job" element={<PostJob />} />
        {/* Bạn có thể thêm các route khác */}
      </Routes>

      <Footer />
    </Router>

  );
};

export default App;
