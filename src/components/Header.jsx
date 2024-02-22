import React from "react";
import logo from "/img/logo.png";
import cart from "/img/cart.svg";
import user from "/img/user.svg";
import { Link } from "react-router-dom";

export default function Header({ onClickCart }) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="header-left d-flex align-center">
        <Link to="/">
          <img src={logo} width={40} height={40} />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>
      <div>
        <ul className="d-flex align-center justify-center">
          <li onClick={onClickCart} className="cu-p">
            <img src={cart} alt="Корзина" width={18} height={18} />
            <span>1250 руб.</span>
          </li>
          <li className="cu-p">
            <Link to="/favorites">
              <img src="/img/fav.svg" alt="" />
              <span>Закладки</span>
            </Link>
          </li>
          <li className="cu-p">
            <img src={user} width={18} height={18} />
            <span>Профиль</span>
          </li>
        </ul>
      </div>
    </header>
  );
}
