import React from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css';

function Toolbar() {
  return (
    <div className="toolbar">
      <Link to="/home">Home</Link>
      <Link to="/add-customer">Add Customer</Link>
      <Link to="/search">Search Customer</Link>
    </div>
  );
}

export default Toolbar;

