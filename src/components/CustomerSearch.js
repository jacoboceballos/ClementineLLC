import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustomerSearch.css';

function CustomerSearch() {
  const [query, setQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://backendclementine.azurewebsites.net/customers', { params: { query } });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error during customer search:', error);
      alert('An error occurred while searching for customers');
    }
  };

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    // Fetch matching customers as the user types
    if (e.target.value) {
      try {
        const response = await axios.get('https://backendclementine.azurewebsites.net/customers', { params: { query: e.target.value } });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    } else {
      setCustomers([]);
    }
  };

  const handleCustomerClick = (customerId) => {
    navigate(`/customer-details/${customerId}`);
  };

  return (
    <div className="customer-search-container">
      <h2>Search Customers</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {customers.length > 0 && (
        <div className="customer-list">
          <h3>Results</h3>
          <ul>
            {customers.map((customer) => (
              <li key={customer.CustomerID} onClick={() => handleCustomerClick(customer.CustomerID)}>
                {customer.FullName} ({customer.Email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerSearch;