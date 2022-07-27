import React, { createContext, useContext, useReducer, useState } from "react";
import { watchesApi } from "../helpers/Const";

export const ClientContext = createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES") {
    return {
      ...state,
      watches: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    watches: [],
  });

  const [searchWord, setSearchWord] = useState("");
  const [filterByPrice, setFilterByPrice] = useState([0, 5000]);

  const getWatches = () => {
    fetch(
      `${watchesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte${filterByPrice[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const data = {
    watches: state.watches,
    searchWord,
    filterByPrice,
    getWatches,
    setSearchWord,
    setFilterByPrice,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
