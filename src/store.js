// store.js
import { configureStore } from "@reduxjs/toolkit";
import { thunk as reduxThunk } from "redux-thunk"; // Updated import
import { jobReducer } from "./reducers/reducer"; // Import the root reducer
import { getDefaultNormalizer } from "@testing-library/react";

const store = configureStore({
  reducer: jobReducer, // Pass your root reducer or an object with reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxThunk),
});

export default store;
