// App.jsx
import React from 'react';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar/>
      <Hero />
      <Portfolio />
    </div>
  );
}

export default App;