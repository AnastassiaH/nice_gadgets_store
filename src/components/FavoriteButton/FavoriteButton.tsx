import React, { useContext } from 'react';
import styles from './FavoriteButton.module.scss';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductsContext } from '../../context/ProductsContext';
import { Product, ProductDetailed } from '../../types';

type Props = {
  product: Product | ProductDetailed;
};

export const FavoriteButton: React.FC<Props> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { favoriteItems, updateFavoriteItems } = useContext(FavoritesContext);

  const newItem =
    'itemId' in product
      ? product
      : goods?.find(good => good.itemId === product.id);

  const addToFavorites = () => {
    if (newItem) {
      updateFavoriteItems(
        favoriteItems ? [...favoriteItems, newItem] : [newItem],
      );
    }
  };

  const removeFromFavorites = () => {
    if (favoriteItems && newItem) {
      updateFavoriteItems(
        favoriteItems.filter(item => item.itemId !== newItem.itemId),
      );
    }
  };

  return (
    <>
      {favoriteItems?.some(item => item.itemId === newItem?.itemId) ? (
        <button
          className={styles.favorited}
          onClick={removeFromFavorites}
        ></button>
      ) : (
        <button
          className={styles.favoriteButton}
          onClick={addToFavorites}
        ></button>
      )}
    </>
  );
};
