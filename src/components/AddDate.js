import React, { useState } from 'react';
import './AddDate.css';

function AddDate({ addDate }) {
  const [date, setDate] = useState({
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
    NumOfSBBagsPurchased: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDate(date);
    setDate({
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
      NumOfSBBagsPurchased: 0
    });
  };

  return (
    <form className="add-date-form" onSubmit={handleSubmit}>
      <h3>Add New Transaction Date</h3>
      <input type="date" name="Date" value={date.Date} onChange={handleChange} required />
      <input type="number" name="NumOfAdultItems" placeholder="Num of Adult Items" value={date.NumOfAdultItems} onChange={handleChange} required />
      <input type="number" name="NumOfKidsItems" placeholder="Num of Kids Items" value={date.NumOfKidsItems} onChange={handleChange} required />
      <input type="number" step="0.01" name="AdultRetailValue" placeholder="Adult Retail Value" value={date.AdultRetailValue} onChange={handleChange} required />
      <input type="number" step="0.01" name="KidsRetailValue" placeholder="Kids Retail Value" value={date.KidsRetailValue} onChange={handleChange} required />
      <input type="number" name="NumOfThriftItemsAdult" placeholder="Num of Thrift Items - Adult" value={date.NumOfThriftItemsAdult} onChange={handleChange} required />
      <input type="number" name="NumOfThriftItemsKids" placeholder="Num of Thrift Items - Kids" value={date.NumOfThriftItemsKids} onChange={handleChange} required />
      <input type="number" step="0.01" name="ThriftValueAdult" placeholder="Thrift Value - Adult" value={date.ThriftValueAdult} onChange={handleChange} required />
      <input type="number" step="0.01" name="ThriftValueKids" placeholder="Thrift Value - Kids" value={date.ThriftValueKids} onChange={handleChange} required />
      <input type="number" name="NumOfDonationItemsAdult" placeholder="Num of Donation Items - Adult" value={date.NumOfDonationItemsAdult} onChange={handleChange} required />
      <input type="number" name="NumOfDonationItemsKids" placeholder="Num of Donation Items - Kids" value={date.NumOfDonationItemsKids} onChange={handleChange} required />
      <input type="number" step="0.01" name="TotalPayout" placeholder="Total Payout" value={date.TotalPayout} onChange={handleChange} required />
      <input type="number" name="NumOfSBBagsPurchased" placeholder="Num of SB Bags Purchased" value={date.NumOfSBBagsPurchased} onChange={handleChange} required />
      <button type="submit">Add Date</button>
    </form>
  );
}

export default AddDate;

