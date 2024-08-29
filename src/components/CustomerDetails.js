import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CustomerDetails.css';

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);

  // Base URL for the backend API
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backendclementine.azurewebsites.net';

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/customer/${id}`);
        setCustomer(response.data);
        const datesResponse = await axios.get(`${API_BASE_URL}/customer/${id}/dates`);
        setDates(datesResponse.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        alert('An error occurred while fetching customer data');
      }
    };
    fetchCustomer();
  }, [id, API_BASE_URL]);

  const handleDateClick = async (dateId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/date/${dateId}/details`);
      setSelectedDateDetails(response.data.purchase_date_details);
    } catch (error) {
      console.error('Error fetching date details:', error);
      alert('An error occurred while fetching date details');
    }
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/customer/${customer.CustomerID}`, customer);
      alert('Customer updated successfully');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('An error occurred while updating customer');
    }
  };

  const handleDeleteCustomer = () => {
    navigate(`/delete-customer/${customer.CustomerID}`);
  };

  const handleDeleteDate = async (dateId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/date/${dateId}`);
      if (response.data.success) {
        alert('Date deleted successfully');
        setDates(dates.filter(date => date.PurchaseDateID !== dateId));
        setSelectedDateDetails(null);
      } else {
        alert(`Error deleting date: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error deleting date:', error);
      alert('An error occurred while deleting the date');
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="customer-details-container">
      <h2>{customer.FullName}</h2>
      <form onSubmit={handleEditCustomer}>
        <input
          type="text"
          value={customer.FullName}
          onChange={(e) => setCustomer({ ...customer, FullName: e.target.value })}
        />
        <input
          type="email"
          value={customer.Email}
          onChange={(e) => setCustomer({ ...customer, Email: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
      <button className="delete" onClick={handleDeleteCustomer}>Delete Customer</button>
      <h3>Transaction Dates</h3>
      <ul>
        {dates.map((date) => (
          <li key={date.PurchaseDateID}>
            <button className="date-button" onClick={() => handleDateClick(date.PurchaseDateID)}>
              {date.PurchaseDate}
            </button>
            <button className="delete-date-button" onClick={() => handleDeleteDate(date.PurchaseDateID)}>X</button>
          </li>
        ))}
      </ul>

      {selectedDateDetails && (
        <div className="transaction-details">
          <h3>Transaction Details</h3>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Item Price</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {selectedDateDetails.items.map((item) => (
                <tr key={item.ItemID}>
                  <td>{item.ItemDescription}</td>
                  <td>{item.ItemPrice}</td>
                  <td>{item.Size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;