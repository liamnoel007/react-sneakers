import React from "react";
import Info from "./Info";
import axios from "axios";
import btn_remove from "/img/btn-remove.svg";
import { AppContext } from "../App";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({ onClose, items = [], onRemove }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://f5debea09bacfab8.mokky.dev/orders",
        {
          items: cartItems,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://f5debea09bacfab8.mokky.dev/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="removeBtn cu-p"
            src={btn_remove}
            alt="Remove"
            onClick={onClose}
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="card-item d-flex align-center mb-20"
                >
                  <div
                    className="card-item-img"
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  ></div>
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    className="removeBtn"
                    src={btn_remove}
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "img/ZakazDone.png" : "img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}
