import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "../utils/likeSlice";

// Configure the Redux store
const store = configureStore({
  // Define reducers
  reducer: {
    // Assign the likeReducer to the 'like' slice
    like: likeReducer,
  },
});

// Export the configured Redux store
export default store;
