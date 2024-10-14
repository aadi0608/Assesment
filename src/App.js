import './App.css';
import React, { useState } from 'react';

const App = () => {
  // State to manage visibility
  const [showItemDetails, setShowItemDetails] = useState(true);
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);

  // State for form inputs
  const [itemData, setItemData] = useState({ itemName: '', quantity: '', unitPrice: '', submissionDate: '' });
  const [supplierData, setSupplierData] = useState({ supplierName: '', companyName: '', country: 'USA', state: 'Florida', email: '', phoneNumber: '' });
  const [message, setMessage] = useState(''); 

  // State for storing submitted data
  const [submittedItems, setSubmittedItems] = useState([]);
  const [submittedSuppliers, setSubmittedSuppliers] = useState([]);

  // Handle checkbox selection
  const handleItemCheckbox = () => {
    setShowItemDetails(true);
    setShowSupplierDetails(false);
  };

  const handleSupplierCheckbox = () => {
    setShowItemDetails(false);
    setShowSupplierDetails(true);
  };

  // Handle form submission for Items
const handleItemSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('https://apis-technical-test.conqt.com/Api/Item-Supplier/Get-All-Items', { // Update endpoint here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...itemData, supplier: supplierData.supplierName }), // Ensure this matches API expectations
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Item submitted successfully:', result);
      setMessage('Item submitted successfully!');
      setSubmittedItems([...submittedItems, { ...itemData, supplier: supplierData.supplierName }]); 
      setItemData({ itemName: '', quantity: '', unitPrice: '', submissionDate: '' });
    } else {
      const errorResponse = await response.json(); // Get error response for debugging
      console.error('Error response from server:', errorResponse);
      throw new Error('Failed to submit item: ' + errorResponse.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error submitting item:', error);
    setMessage('Error submitting item: ' + error.message); // Show specific error message
  }
};

// Update the supplier submission function similarly
const handleSupplierSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('https://apis-technical-test.conqt.com/Api/Item-Supplier/Add-Supplier', { // Update endpoint here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplierData), // Ensure this matches API expectations
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Supplier submitted successfully:', result);
      setMessage('Supplier submitted successfully!'); 
      setSubmittedSuppliers([...submittedSuppliers, supplierData]);  
      setSupplierData({ supplierName: '', companyName: '', country: 'USA', state: 'Florida', email: '', phoneNumber: '' }); 
    } else {
      const errorResponse = await response.json(); // Get error response for debugging
      console.error('Error response from server:', errorResponse);
      throw new Error('Failed to submit supplier: ' + errorResponse.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error submitting supplier:', error);
    setMessage('Error submitting supplier: ' + error.message); // Show specific error message
  }
};


  // Handle input change for items
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  // Handle input change for suppliers
  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  // Inline styles for simple CSS
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    checkboxContainer: {
      marginBottom: '20px',
    },
    h2: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    message: {
      color: 'green',
      fontSize: '18px',
      marginTop: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      borderBottom: '2px solid #ddd',
      padding: '8px',
      textAlign: 'left',
      backgroundColor: '#f2f2f2',
    },
    td: {
      borderBottom: '1px solid #ddd',
      padding: '8px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Checkbox options */}
      <div style={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={showItemDetails}
          onChange={handleItemCheckbox}
        />
        <label>Item</label>

        <input
          type="checkbox"
          checked={showSupplierDetails}
          onChange={handleSupplierCheckbox}
        />
        <label>Supplier</label>
      </div>

      {/* Message for success or error */}
      {message && <div style={styles.message}>{message}</div>}

      {/* Render Item Details Form */}
      {showItemDetails && (
        <form style={styles.form} onSubmit={handleItemSubmit}>
          <h2 style={styles.h2}>Item Details</h2>
          <div>
            <label style={styles.label}>Item Name:</label>
            <input
              type="text"
              name="itemName"
              value={itemData.itemName}
              onChange={handleItemChange}
              style={styles.input}
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label style={styles.label}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={itemData.quantity}
              onChange={handleItemChange}
              style={styles.input}
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label style={styles.label}>Unit Price:</label>
            <input
              type="text"
              name="unitPrice"
              value={itemData.unitPrice}
              onChange={handleItemChange}
              style={styles.input}
              placeholder="Enter unit price"
            />
          </div>
          <div>
            <label style={styles.label}>Date of Submission:</label>
            <input
              type="date"
              name="submissionDate"
              value={itemData.submissionDate}
              onChange={handleItemChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Submit Item</button>
        </form>
      )}

      {/* Render Supplier Details Form */}
      {showSupplierDetails && (
        <form style={styles.form} onSubmit={handleSupplierSubmit}>
          <h2 style={styles.h2}>Supplier Details</h2>
          <div>
            <label style={styles.label}>Supplier Name:</label>
            <input
              type="text"
              name="supplierName"
              value={supplierData.supplierName}
              onChange={handleSupplierChange}
              style={styles.input}
              placeholder="Enter supplier name"
            />
          </div>
          <div>
            <label style={styles.label}>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={supplierData.companyName}
              onChange={handleSupplierChange}
              style={styles.input}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label style={styles.label}>Country:</label>
            <select
              name="country"
              value={supplierData.country}
              onChange={handleSupplierChange}
              style={styles.input}
            >
              <option value="USA">USA</option>
              {/* Add more countries here */}
            </select>
          </div>
          <div>
            <label style={styles.label}>State:</label>
            <select
              name="state"
              value={supplierData.state}
              onChange={handleSupplierChange}
              style={styles.input}
            >
              <option value="Florida">Florida</option>
              {/* Add more states here */}
            </select>
          </div>
          <div>
            <label style={styles.label}>Email Address:</label>
            <input
              type="email"
              name="email"
              value={supplierData.email}
              onChange={handleSupplierChange}
              style={styles.input}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label style={styles.label}>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={supplierData.phoneNumber}
              onChange={handleSupplierChange}
              style={styles.input}
              placeholder="Enter phone number"
            />
          </div>
          <button type="submit" style={styles.button}>Submit Supplier</button>
        </form>
      )}

      {/* Table to display submitted data */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Supplier</th>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Unit Price</th>
            <th style={styles.th}>City, Country</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over submitted items and suppliers to display them */}
          {submittedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.supplier}</td>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
              <td>{`${supplierData.state}, ${supplierData.country}`}</td>
              <td>{supplierData.email}</td>
              <td>{supplierData.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
