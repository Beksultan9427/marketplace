import React, { createContext, useReducer } from "react";
import { whatchesApi } from "../helpers/Const";
export const AdminContext = createContext();

const reducer = (state, action) => {
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const sendNewWatch = (newWatch) => {
    fetch(whatchesApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWatch),
    });
  };

  const data = {
    sendNewWatch,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
