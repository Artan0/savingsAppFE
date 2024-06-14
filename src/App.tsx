import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Auth from './pages/auth';
import Contact from './pages/contact';
import AboutUs from './pages/aboutus';
import Goals from './pages/goals';
import AddGoal from './pages/add-goal';
import GoalDetails from './pages/Goal-details';
import EditGoal from './pages/Edit-goal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/add-goal' element={<AddGoal />} />
        <Route path='/goal/:id' element={<GoalDetails />} />
        <Route path='/goal/edit/:id' element={<EditGoal />} />
        {/*routes here*/}
      </Routes>
    </Router>
  );
}

export default App;
