// store.js
import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./reducers/reducer"; // Import the root reducer

const store = configureStore({
  reducer: jobReducer, // Pass your root reducer or an object with reducers
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
