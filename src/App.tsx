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
          <Route path='/add-goal' element={<AddGoal />} />
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
