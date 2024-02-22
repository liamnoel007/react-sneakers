import React, { useState } from "react";
import add_to_cart from "/img/add.svg";
import btnChecked from "/img/btn-checked.svg";
import unlike from "/img/like-unlike.svg";
import like from "/img/like-like.svg";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

export default function Card({
  id,
  title,
  price,
  imageUrl,
  onClickPlus,
  onClickFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClick = () => {
    onClickPlus({ id, title, price, imageUrl });
  };

  const addToFavorite = () => {
    onClickFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={addToFavorite}>
            <img
              src={isFavorite ? like : unlike}
              alt="Unliked"
              className="cu-p"
            />
          </div>

          <img src={imageUrl} width="100%" height={135} />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              src={isItemAdded(id) ? btnChecked : add_to_cart}
              alt={btnChecked}
              onClick={onClick}
              className={styles.plus}
            />
          </div>
        </>
      )}
    </div>
  );
}
