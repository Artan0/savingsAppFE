import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import AboutUs from './pages/Aboutus';
import Goals from './pages/Goals';
import AddGoal from './pages/Add-Goal';
import GoalDetails from './pages/Goal-Details';
import EditGoal from './pages/Edit-Goal';
import Profile from './pages/Profile';
import { UserProvider } from './context/User-context';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/goals/add' element={<AddGoal />} />
          <Route path='/goals/:id' element={<GoalDetails />} />
          <Route path='/goal/edit/:id' element={<EditGoal />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          {/*routes here*/}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
