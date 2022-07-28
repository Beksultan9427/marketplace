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

  const limit = 2;
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getWatches = () => {
    fetch(
      `${watchesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      // ! res - делает запрос на сервер => (data)
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      // ! data - backend(база данных)
      .then((data) => {
        // ! Math.ceil() - округляет вверх (1.2 = 2, 1.1 = 2)
        // ! Math.floor() - окргуляет вниз (1.9 = 1, 1.1 = 1)
        // ! Math.round() - округляет как в матиматике (1.1 = 1, 1.6 = 2)
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const addWatchToBasket = (watch) => {
    // ! localStorage.setItem() - добавление
    // ! localStorage.getItem() -
    // ! localStorage.removeItem() -
    // ! localStorage.clear() - очитска всего
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }

    let watchToBasket = {
      ...watch,
      count: 1,
      subPrice: watch.price,
    };
    basket.products.push(watchToBasket);
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    console.log(basket);
  };

  const data = {
    watches: state.watches,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    getWatches,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addWatchToBasket,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
