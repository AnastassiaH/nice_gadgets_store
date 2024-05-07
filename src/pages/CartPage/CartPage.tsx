import React, { useContext, useState, useMemo } from 'react';
import styles from './CartPage.module.scss';
import { BackButton } from '../../components/BackButton';
import { CartContext } from '../../context/CartContext';
import { CartItemCard } from '../../components/CartItemCard';
import { CheckoutModal } from '../../components/CheckoutModal/CheckoutModal';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const totalSum = useMemo(() => {
    return cartItems?.reduce(
      (acc, item) => acc + item.amount * (item.product?.price || 0),
      0,
    );
  }, [cartItems]);

  const cartItemsAmount = useMemo(
    () =>
      cartItems ? cartItems.reduce((acc, item) => acc + item.amount, 0) : 0,
    [cartItems],
  );

  return (
    <>
      <div className={styles.container}>
        <BackButton />
        <h1 className={styles.title}>Cart</h1>
        {cartItems?.length ? (
          <div className={styles.cartContent}>
            <div className={styles.itemsContainer}>
              {cartItems &&
                cartItems.map(item => (
                  <CartItemCard key={item.product?.id} product={item} />
                ))}
            </div>
            <div className={styles.totalContainer}>
              <div className={styles.top}>
                <p className={styles.totalSum}>${totalSum}</p>
                <p className={styles.totalItems}>
                  Total for {cartItemsAmount}{' '}
                  {cartItemsAmount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
              <CheckoutModal
                open={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>Your cart is empty</p>
        )}
      </div>
    </>
  );
};
