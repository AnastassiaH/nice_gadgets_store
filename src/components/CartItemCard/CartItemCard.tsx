import React, { useCallback, useContext } from "react";
import styles from "./CartItemCard.module.scss";
import { CartItem } from "../../types";
import { CartContext } from "../../context/CartContext";

type Props = {
  product: CartItem;
};

export const CartItemCard: React.FC<Props> = ({ product }) => {
  const { cartItems, updateCartItems } = useContext(CartContext);

  const deleteItem = useCallback((id: string | undefined) => {
    if (cartItems) {
      updateCartItems(cartItems.filter((item) => item.product?.itemId !== id));
    }
  }, []);

  const increaseAmount = useCallback(() => {
    if (cartItems) {
      const currentItem = cartItems.find(
        (item) => item.product?.itemId === product.product?.itemId
      );

      const currentIndex = cartItems.findIndex(
        (item) => item.product?.itemId === product.product?.itemId
      );

      if (currentItem) {
        cartItems[currentIndex].amount = cartItems[currentIndex].amount + 1;
        updateCartItems([...cartItems]);
      }
    }
  }, []);

  const decreaseAmount = useCallback(() => {
    if (cartItems) {
      const currentItem = cartItems.find(
        (item) => item.product?.itemId === product.product?.itemId
      );

      const currentIndex = cartItems.findIndex(
        (item) => item.product?.itemId === product.product?.itemId
      );

      if (currentItem) {
        cartItems[currentIndex].amount = cartItems[currentIndex].amount - 1;
        updateCartItems([...cartItems]);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button
          className={styles.delete}
          onClick={() => deleteItem(product.product?.itemId)}
        ></button>
        <img
          className={styles.cartItemImage}
          src={product.product?.image}
          alt="cartItemImage"
        />
        <p className={styles.title}>{product.product?.name}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.actions}>
          <button
            disabled={product.amount === 1}
            className={styles.decrease}
            onClick={decreaseAmount}
          ></button>
          <p className={styles.amount}>{product.amount}</p>
          <button className={styles.increase} onClick={increaseAmount}></button>
        </div>
        <p className={styles.price}>
          ${(product.product?.price || 0) * product.amount}
        </p>
      </div>
    </div>
  );
};
