import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Evaluation from './pages/Evaluation';
import Journal from './pages/Journal';
import Community from './pages/Community';
import Music from './pages/Music';
import MindfulAssistant from './pages/MindfulAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/community" element={<Community />} />
        <Route path="/music" element={<Music />} />
        <Route path="/assistant" element={<MindfulAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;