import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(loan, loanPurpose) {
        return {
          payload: {
            loan,
            loanPurpose,
          },
        };
      },
      reducer(state, action) {
        (state.loan = action.payload.loan),
          (state.loanPurpose = action.payload.loanPurpose),
          (state.balance += action.payload.loan);
      },
    },
    payLoan(state) {
      (state.balance -= state.loan), (state.loan = 0);
      state.loanPurpose = "";
    },
    convertCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/convertCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;
