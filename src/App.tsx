import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Auth from './pages/auth';
import Contact from './pages/contact';
import AboutUs from './pages/aboutus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        {/*routes here*/}
      </Routes>
    </Router>
  );
}

export default App;
