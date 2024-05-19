import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home'
import AboutUs from './pages/aboutus';
import Contact from './pages/contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact />} />
        {/*routes here*/}
      </Routes>
    </Router>
  );
}

export default App;
