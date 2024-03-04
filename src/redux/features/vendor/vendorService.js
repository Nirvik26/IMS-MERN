import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/vendors/`;

// Create New Vendor
const createVendor = async (vendorData) => {
  const response = await axios.post(API_URL, vendorData);
  return response.data;
};

// Get all vendors
const getVendors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Vendor
const deleteVendor = async (id) => {
  const response = await axios.delete(API_URL + id);

  return id;
};

// Get a Vendor
const getVendor = async (id) => {
  const response = await axios.get(API_URL + id);
  return response;
};

// Update Vendor
const updateVendor = async (id, vendorData) => {
  const response = await axios.put(`${API_URL}${id}`, vendorData);
  return response.data;
};

const vendorService = {
  createVendor,
  getVendors,
  getVendor,
  deleteVendor,
  updateVendor,
};

export default vendorService;
