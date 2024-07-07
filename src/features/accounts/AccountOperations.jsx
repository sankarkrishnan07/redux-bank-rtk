import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

export default function AccountOperations() {
  const [depositamt, setDepositAmt] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [withdrawAmt, setWithDrawAmt] = useState("");
  const [loan, setLoan] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const dispatch = useDispatch();

  const { fullName: user } = useSelector((store) => store.customer);

  const {
    loan: currentLoan,
    loanPurpose: purpose,
    isLoading,
  } = useSelector((store) => store.account);

  function handleDeposit() {
    if (!depositamt) return;
    dispatch(deposit(depositamt, currency));
    setDepositAmt("");
  }

  function handleWithdraw() {
    if (!withdrawAmt) return;
    dispatch(withdraw(withdrawAmt));
    setWithDrawAmt("");
  }

  function handleRequestLoan() {
    if (!loan || !loanPurpose) return;
    dispatch(requestLoan(loan, loanPurpose));
    setLoan("");
    setWithDrawAmt("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div className="app-account">
      <h2>👋 Welcome {user}!</h2>
      <div className="app-account__ops">
        <h4>Your Account Operations</h4>

        <div className="app-account__ops-input">
          <div className="input-wrap">
            <label htmlFor="deposit">Deposit</label>
            <input
              type="number"
              name="deposit"
              id="deposit"
              value={depositamt}
              onChange={(e) => setDepositAmt(+e.target.value)}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">US Dollar</option>
              <option value="EUR">Euro</option>
              <option value="GBP">British Pound</option>
            </select>
            <button onClick={handleDeposit} disabled={isLoading}>
              {isLoading ? "converting..." : `Deposit ${depositamt}`}
            </button>
          </div>
          <div className="input-wrap">
            <label htmlFor="withdraw">Withdraw</label>
            <input
              type="number"
              name="withdraw"
              id="withdraw"
              value={withdrawAmt}
              onChange={(e) => setWithDrawAmt(+e.target.value)}
            />
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
          <div className="input-wrap">
            <label htmlFor="loan">Request Loan</label>
            <input
              type="number"
              name="loan"
              id="loan"
              value={loan}
              onChange={(e) => setLoan(+e.target.value)}
            />
            <input
              type="text"
              name="loan-purpose"
              id="loan-purpose"
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
            />
            <button onClick={handleRequestLoan}>Request Loan</button>
          </div>
          {currentLoan ? (
            <div className="input-wrap">
              <label>{`Pay back $${currentLoan} (${purpose})`}</label>
              <button onClick={handlePayLoan}>Pay Loan</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
