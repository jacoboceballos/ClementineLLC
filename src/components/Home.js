import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSearch from './CustomerSearch';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  return (
    <div className="home-container">
      <h2>Customer Management</h2>
      <CustomerSearch />
      <button onClick={handleAddCustomer}>Add Customer</button>
    </div>
  );
}

export default Home;

