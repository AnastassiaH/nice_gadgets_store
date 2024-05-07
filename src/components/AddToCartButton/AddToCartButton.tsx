import React, { useContext } from "react";
import styles from "./AddToCartButton.module.scss";
import { ProductsContext } from "../../context/ProductsContext";
import { CartContext } from "../../context/CartContext";
import { Product, ProductDetailed } from "../../types";

type Props = {
  product: Product | ProductDetailed;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { cartItems, updateCartItems } = useContext(CartContext);

  const newItem =
    "itemId" in product
      ? product
      : goods?.filter((good) => good.itemId === product.id)[0];

  const addToCart = () => {
    updateCartItems(
      cartItems
        ? [...cartItems, { product: newItem, amount: 1 }]
        : [{ product: newItem, amount: 1 }]
    );
  };

  return (
    <>
      {cartItems?.some((item) => item.product?.itemId === newItem?.itemId) ? (
        <div className={styles.alreadyIn}>Added to cart</div>
      ) : (
        <button className={styles.cartButton} onClick={addToCart}>
          Add to cart
        </button>
      )}
    </>
  );
};
