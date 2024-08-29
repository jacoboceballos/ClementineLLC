import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCustomer.css';

function AddCustomer() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    Email: '',
    FullName: '',
    Date: '',
    NumOfAdultItems: 0,
    NumOfKidsItems: 0,
    AdultRetailValue: 0,
    KidsRetailValue: 0,
    NumOfThriftItemsAdult: 0,
    NumOfThriftItemsKids: 0,
    ThriftValueAdult: 0,
    ThriftValueKids: 0,
    NumOfDonationItemsAdult: 0,
    NumOfDonationItemsKids: 0,
    TotalPayout: 0,
    NumOfSBBagsPurchased: 0,
    Items: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...customer.Items];
    items[index] = {
      ...items[index],
      [name]: value
    };
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      Items: items
    }));
  };

  const addItem = () => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      Items: [
        ...prevCustomer.Items,
        {
          ItemDescription: '',
          ItemPrice: 0,
          Size: '',
          ItemizedReceipt: null  // Explicitly setting ItemizedReceipt to null
        }
      ]
    }));
  };

  const removeItem = (index) => {
    const items = [...customer.Items];
    items.splice(index, 1);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      Items: items
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backendclementine.azurewebsites.net/add-customer', customer);
      if (response.data.success) {
        alert('Customer added successfully');
        navigate('/home');
      } else {
        alert(`Error adding customer: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('An error occurred while adding the customer');
    }
  };

  return (
    <div className="add-customer-container">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="FullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="date" name="Date" placeholder="Date" onChange={handleChange} required />
        <input type="number" name="NumOfAdultItems" placeholder="Num of Adult Items" onChange={handleChange} required />
        <input type="number" name="NumOfKidsItems" placeholder="Num of Kids Items" onChange={handleChange} required />
        <input type="number" step="0.01" name="AdultRetailValue" placeholder="Adult Retail Value" onChange={handleChange} required />
        <input type="number" step="0.01" name="KidsRetailValue" placeholder="Kids Retail Value" onChange={handleChange} required />
        <input type="number" name="NumOfThriftItemsAdult" placeholder="Num of Thrift Items - Adult" onChange={handleChange} required />
        <input type="number" name="NumOfThriftItemsKids" placeholder="Num of Thrift Items - Kids" onChange={handleChange} required />
        <input type="number" step="0.01" name="ThriftValueAdult" placeholder="Thrift Value - Adult" onChange={handleChange} required />
        <input type="number" step="0.01" name="ThriftValueKids" placeholder="Thrift Value - Kids" onChange={handleChange} required />
        <input type="number" name="NumOfDonationItemsAdult" placeholder="Num of Donation Items - Adult" onChange={handleChange} required />
        <input type="number" name="NumOfDonationItemsKids" placeholder="Num of Donation Items - Kids" onChange={handleChange} required />
        <input type="number" step="0.01" name="TotalPayout" placeholder="Total Payout" onChange={handleChange} required />
        <input type="number" name="NumOfSBBagsPurchased" placeholder="Num of SB Bags Purchased" onChange={handleChange} required />
        
        <h3>Items</h3>
        {customer.Items.map((item, index) => (
          <div key={index} className="item-container">
            <input
              type="text"
              name="ItemDescription"
              placeholder="Item Description"
              value={item.ItemDescription}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <input
              type="number"
              name="ItemPrice"
              placeholder="Item Price"
              value={item.ItemPrice}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <input
              type="text"
              name="Size"
              placeholder="Size"
              value={item.Size}
              onChange={(e) => handleItemChange(index, e)}
            />
            <button type="button" className="remove-item-button" onClick={() => removeItem(index)}>Remove Item</button>
          </div>
        ))}
        <button type="button" className="add-item-button" onClick={addItem}>Add Item</button>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;