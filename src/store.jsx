import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    account: accountReducer,
  },
});

export default store;
