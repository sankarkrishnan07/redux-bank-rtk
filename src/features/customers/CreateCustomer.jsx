import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

export default function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [nationalID, setNationalID] = useState("");

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    if (!fullName || !nationalID) return;
    dispatch(createCustomer(fullName, nationalID));
  }

  return (
    <div className="app-create-customer">
      <h3>Create New Customer</h3>
      <form>
        <div className="input-wrap">
          <label htmlFor="fullname">Customer Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="nationalID">National ID</label>
          <input
            type="text"
            name="nationalID"
            id="nationalID"
            value={nationalID}
            onChange={(e) => setNationalID(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create New Customer</button>
      </form>
    </div>
  );
}
