import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPlans from './components/PricingPlans';
import Dashboard from './components/Dashboard'; // Make sure you create this component
import Calendar from './components/Calendar'; // Make sure you create this component
import SocialListening from './components/SocialListening'; // Make sure you create this component
//import Posts from './components/Posts'; // Make sure you create this component



//import Sidebar from './components/Sidebar'; // Optional: if you have or will add a Sidebar

function App() {
  return (
    <div className="App">
      <Router>
        {/* Optional Sidebar, if needed */}
        {/* <Sidebar /> */}

        <Routes>
          <Route path="/" element={<PricingPlans />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/social-listening" element={<SocialListening />} />
          {/* <Route path="/posts" element={<Posts />} /> */}


        </Routes>
      </Router>
    </div>
  );
}

export default App;