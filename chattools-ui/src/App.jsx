import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AsciiArt from './pages/AsciiArt';
import Placeholder from './pages/Placeholder';
import './App.css';
import Error404 from './pages/Error404';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ascii-art" element={<AsciiArt />} />
            <Route path="/placeholder" element={<Placeholder />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
