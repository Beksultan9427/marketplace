import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { watchesApi } from "../helpers/Const";

export const ClientContext = createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES") {
    return {
      ...state,
      watches: action.payload,
    };
  }
  if (action.type === "GET_WATCHES_FROM_BASKET") {
    return {
      ...state,
      basketWatches: action.payload,
    };
  }
  if (action.payload === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    watches: [],
    basketWatches: {
      products: [],
      totalPrice: 0,
    },
    basketCount: 0,
  });

  const [searchWord, setSearchWord] = useState("");
  const [filterByPrice, setFilterByPrice] = useState([0, 5000]);
  const [minMax, setMinMax] = useState([0, 5000]);

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

    let check = basket.products.find((item) => {
      return item.id === watchToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === watchToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(watchToBasket);
    }

    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);

    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getWatchesFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_WATCHES_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  // ! fix price
  const getPrices = () => {
    fetch(watchesApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  // ! fix отображения кол-во товара в navbar
  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        products: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.products.kength,
    };
    dispatch(action);
  };
  // !

  useEffect(() => {
    getPrices();
    getBasketCount();
  }, []);

  const data = {
    watches: state.watches,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketWatches: state.basketWatches,
    minMax,
    basketCount: state.basketCount,
    getWatches,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addWatchToBasket,
    getWatchesFromBasket,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
