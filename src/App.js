import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registro';
import Dashboard from './components/formularios/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Home from './components/Inicio';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Inicio" element={<Home/>} /> 
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

