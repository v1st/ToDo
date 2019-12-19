import React from 'react';
import './App.css';
import Home from './pages/Index';
import Nav from './components/organisms/NavBar';
import Footer from './components/organisms/Footer';

function App() {
  return (
    <div className="App">
      <Nav />      
        <Home />      
      <Footer />      
    </div>
  );
}

export default App;
