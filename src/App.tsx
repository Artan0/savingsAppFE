import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth';
import Home from './pages/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact />} />
        {/*routes here*/}
      </Routes>
    </Router>
  );
}

export default App;
