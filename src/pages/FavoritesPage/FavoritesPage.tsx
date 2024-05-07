import React, { useContext } from 'react';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/BreadCrumbs';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Product } from '../../types';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favoriteItems } = useContext(FavoritesContext);

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Favorites</h1>
      {favoriteItems.length > 0 ? (
        <>
          <p className={styles.amount}>{favoriteItems?.length} models</p>
          <div className={styles.productsList}>
            {favoriteItems.map((item: Product) => (
              <div className={styles.itemCard} key={item.id}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className={styles.emptyMessage}>
            You do not have favorite items yet
          </p>
        </>
      )}
    </div>
  );
};
