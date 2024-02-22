import { createContext, useEffect, useState } from "react";
import Home from "./pages/home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";

export const AppContext = createContext({});

export default function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartRes = await axios.get(
        "https://f5debea09bacfab8.mokky.dev/cart"
      );
      const favRes = await axios.get(
        "https://f5debea09bacfab8.mokky.dev/favorites"
      );
      const itemsRes = await axios.get(
        "https://f5debea09bacfab8.mokky.dev/items"
      );

      setIsLoading(false);

      setCartItems(cartRes.data);
      setFavorites(favRes.data);
      setItems(itemsRes.data);
    }
    fetchData();
  }, []);

  const addItemToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        console.log(obj.id);
        axios.delete(`https://f5debea09bacfab8.mokky.dev/cart/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) != Number(obj.id))
        );
      } else {
        console.log(obj.id);
        axios.post("https://f5debea09bacfab8.mokky.dev/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchInputValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://f5debea09bacfab8.mokky.dev/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) != Number(id))
    );
  };

  const addToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://f5debea09bacfab8.mokky.dev/favorites/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) != Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://f5debea09bacfab8.mokky.dev/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        addToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchInputValue={searchInputValue}
                addToFavorite={addToFavorite}
                addItemToCart={addItemToCart}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
            exact
          />

          <Route path="/favorites" element={<Favorites />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
