import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth';
import Home from './pages/home'
import Auth from './pages/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        {/*routes here*/}
      </Routes>
    </Router>
  );
}

export default App;
