import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vendorService from './vendorService';

import { toast } from 'react-toastify';

const initialState = {
  SelectVendor: null,
  vendors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create New Vendor
export const createVendor = createAsyncThunk(
  'vendors/create',
  async (vendorData, thunkAPI) => {
    try {
      return await vendorService.createVendor(vendorData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all vendors
export const getVendors = createAsyncThunk('vendors/getAll', async () => {
  const response = await vendorService.getVendors();
  return response.data;
});
// Get all vendors
export const getVendor = createAsyncThunk('vendors/getById', async (id) => {
  const response = await vendorService.getVendor(id);
  console.log(response.data.data);
  return response.data.data;
});

// Delete a Vendor
export const deleteVendor = createAsyncThunk(
  'vendors/delete',
  async (id, thunkAPI) => {
    try {
      const response =await vendorService.deleteVendor(id);
      return response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a Vendor

// Update Vendor
export const updateVendor = createAsyncThunk(
  'vendors/updateVendor',
  async ({ id, vendorData }, thunkAPI) => {
    try {
      return await vendorService.updateVendor(id, vendorData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.vendors.push(action.payload);
        toast.success('Vendor added successfully');
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.vendors = action.payload;
      })
      .addCase(getVendors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const index= state.vendors.findIndex((item)=> item.id === action.payload)
        state.vendors.splice(index,1);
        toast.success('Vendor deleted successfully');
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.SelectVendor = action.payload;
      })
      .addCase(getVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Vendor updated successfully');
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});
export const selectAllVendors = (state) => state.vendor.vendors;
export const selectedVendor = (state) => state.vendor.SelectVendor;

export default vendorSlice.reducer;
