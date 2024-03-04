import React from 'react';
import AddVendor from './vendor';
import { createVendor } from './vendorService';

const App = () => {
  const handleAddVendor = async (formData) => {
    try {
      const newVendor = await createVendor(formData);
      console.log('New vendor added:', newVendor);
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <div>
      <h1>Vendor Management System</h1>
      <AddVendor onAdd={handleAddVendor} />
    </div>
  );
};

export default App;
