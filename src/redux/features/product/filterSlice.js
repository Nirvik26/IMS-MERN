import { createSlice } from '@reduxjs/toolkit';
import Fuse from 'fuse.js'; // Import Fuse.js library

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;

      if (!search) {
        // If no search term is provided, show all products
        state.filteredProducts = products;
        return;
      }

      
      // Initialize Fuse.js options
      const fuseOptions = {
        keys: ['name', 'category'], // Define which fields to search in
        includeScore: true, // Include search score for ranking
        threshold: 0.4, // Set threshold for fuzzy search
      };

      // Create a new Fuse instance with products and options
      const fuse = new Fuse(products, fuseOptions);

      // Perform fuzzy search on products
      const searchResults = fuse.search(search);

      // Map search results to extract original product objects
      const tempProducts = searchResults.map((result) => result.item);

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
