import Fuse from 'fuse.js';
import React, { useState } from 'react';
import axios from 'axios';


const AddVendorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <label htmlFor="address">Address:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="products">Products:</label>
      <textarea
        id="products"
        name="products"
        value={formData.products}
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="quantity">Quantity:</label>
      <textarea
        id="quantity"
        name="quantity"
        value={formData.pquantity}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Add</button>
    </form>
  );
};

const AddVendor = ({ onAdd }) => {
  const handleAddVendor = (formData) => {
    // Call the onAdd function with the form data
    onAdd(formData);
  };

  return (
    <div>
      <h2>Add Vendor</h2>
      <AddVendorForm onSubmit={handleAddVendor} />
    </div>
  );
};

export default AddVendor;

const EditVendorForm = ({ vendor, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: vendor.name,
    email: vendor.email,
    phone: vendor.phone,
    address: vendor.address,
    products: vendor.products,
    quantity: vendor.quantity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <label htmlFor="address">Address:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="products">Address:</label>
      <textarea
        id="products"
        name="products"
        value={formData.products}
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="quantity">Address:</label>
      <textarea
        id="quantity"
        name="quantity"
        value={formData.pquantity}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Save</button>
    </form>
  );
};

export const EditVendor = ({ vendor, onEdit }) => {
  const handleEditVendor = (formData) => {
    // Call the onEdit function with the form data
    onEdit(formData);
  };

  return (
    <div>
      <h2>Edit Vendor</h2>
      <EditVendorForm vendor={vendor} onSubmit={handleEditVendor} />
    </div>
  );
};

export const searchVendors = (vendors, searchTerm) => {
  const fuse = new Fuse(vendors, {
    keys: ['name', 'email', 'phone', 'address', 'products', 'quantity'],
    includeScore: true,
    threshold: 0.4,
  });
  const results = fuse.search(searchTerm);
  return results.map((result) => result.item);
};

// export const fetchVendors = async () => {
//     try {
//       const response = await fetch('/api/vendors');
//       if (!response.ok) {
//         throw new Error('Failed to fetch vendors');
//       }
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Response is not JSON');
//       }
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//       throw error;
//     }
//   };

export const fetchVendors = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/vendors');
    if (response.status !== 200) {
      throw new Error('Failed to fetch vendors');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

const vendors = await fetchVendors();

const searchTerm = 'products';
const searchResults = searchVendors(vendors, searchTerm);
console.log(searchResults);

export const fetchVendorById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/vendors/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vendor:', error);
    throw error;
  }
};

export const createVendor = async (vendorData) => {
  try {
    const response = await fetch('http://localhost:5000/api/vendors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating vendor:', error);
    throw error;
  }
};

export const updateVendor = async (id, vendorData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/vendors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating vendor:', error);
    throw error;
  }
};

export const deleteVendor = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/vendors/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting vendor:', error);
    throw error;
  }
};
