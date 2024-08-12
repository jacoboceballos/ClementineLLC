import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/customer/${id}`);
      if (response.data.success) {
        setIsDeleted(true);
        alert('Customer deleted successfully');
        navigate('/home');
      } else {
        alert(`Error deleting customer: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('An error occurred while deleting the customer');
    }
  };

  return (
    <div className="delete-customer-container">
      {!isDeleted ? (
        <div>
          <h2>Are you sure you want to delete this customer?</h2>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
      ) : (
        <h2>Customer has been deleted.</h2>
      )}
    </div>
  );
}

export default DeleteCustomer;

