import React from "react";
import Card from "../components/Card";

export default function Home({
  searchValue,
  searchInputValue,
  items,
  addToFavorite,
  addItemToCart,
  setSearchValue,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onClickPlus={(obj) => addItemToCart(obj)}
        onClickFavorite={(obj) => addToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex align-center">
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="removeBtn cu-p clear"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          )}
          <img src="/img/search.svg" alt="Search" />
          <input
            value={searchValue}
            onChange={searchInputValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}
