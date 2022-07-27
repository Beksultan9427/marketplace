import React, { createContext, useReducer } from "react";
import { watchesApi } from "../helpers/Const";
export const AdminContext = createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES") {
    return {
      ...state,
      watches: action.payload,
    };
  }
  if (action.type === "GET_WATCH_TO_EDIT") {
    return {
      ...state,
      watchToEdit: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    watches: [],
    watchToEdit: null,
  });

  const sendNewWatch = (newWatch) => {
    fetch(watchesApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWatch),
    });
  };

  const getWatches = () => {
    fetch(watchesApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! delete
  const deleteWatch = (id) => {
    fetch(`${watchesApi}/${id}`, {
      method: "DELETE",
    }).then(() => getWatches());
  };

  // ! UPDATE PART-1

  const getWatchToEdit = (id) => {
    fetch(`${watchesApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_WATCH_TO_EDIT",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! UPDATE PART-2

  const saveEditedWatch = (editedWatch) => {
    fetch(`${watchesApi}/${editedWatch.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedWatch),
    });
  };

  const data = {
    watches: state.watches,
    watchToEdit: state.watchToEdit,
    sendNewWatch,
    getWatches,
    deleteWatch,
    getWatchToEdit,
    saveEditedWatch,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
