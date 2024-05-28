import { configureStore } from "@reduxjs/toolkit";
import totalPriceReducer from "./total";

const store = configureStore({
  reducer: {
    totalPrice: totalPriceReducer,
  },
});

export default store;
