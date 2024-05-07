import React, { useContext } from 'react';
import styles from './CheckoutModal.module.scss';
import { CartContext } from '../../context/CartContext';

type Props = {
  open: boolean;
  setIsModalOpen: (v: boolean) => void;
};

export const CheckoutModal: React.FC<Props> = ({ open, setIsModalOpen }) => {
  const { updateCartItems } = useContext(CartContext);

  const confirm = () => {
    localStorage.removeItem('cartItem');
    updateCartItems([]);
  };

  if (!open) {
    return null;
  }

  return (
    <div className={styles.container} onClick={() => setIsModalOpen(false)}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h2>
        <div className={styles.actions}>
          <button className={styles.confirmButton} onClick={confirm}>
            Confirm
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
