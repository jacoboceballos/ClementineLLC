import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AddCustomer from './components/AddCustomer';
import CustomerSearch from './components/CustomerSearch';
import CustomerDetails from './components/CustomerDetails';
import DeleteCustomer from './components/DeleteCustomer';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Toolbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/search" element={<CustomerSearch />} />
          <Route path="/customer-details/:id" element={<CustomerDetails />} />
          <Route path="/delete-customer/:id" element={<DeleteCustomer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

