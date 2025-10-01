import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about/about';
import BlogSingle from './pages/blog-single/blog-single';
// import Home from './pages/Home'; // Giả sử bạn có trang Home.tsx

import SiteNavbar from './components/header';
import Footer from './components/footer';

const App: React.FC = () => {
  return (
    <Router>

      <SiteNavbar />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        {/* Bạn có thể thêm các route khác */}
      </Routes>

      <Footer />
    </Router>

  );
};

export default App;
