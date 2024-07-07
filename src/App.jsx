import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations";
import "./App.scss";
import Balance from "./features/accounts/Balance";
import CreateCustomer from "./features/customers/CreateCustomer";

function App() {
  const user = useSelector((state) => state.customer.fullName);

  return (
    <div className="app-container">
      <h1 className="app-title">🏦 The React-Redux Bank ⚛️</h1>
      {!user ? (
        <CreateCustomer />
      ) : (
        <>
          <AccountOperations />
          <Balance />
        </>
      )}
    </div>
  );
}

export default App;
