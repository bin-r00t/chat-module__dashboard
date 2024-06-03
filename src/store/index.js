import { configureStore } from "@reduxjs/toolkit";
import clientsSlice from "./clients";

const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
  },
});

export default store;