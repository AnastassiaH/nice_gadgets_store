import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import { Breadcrumbs } from '../../components/BreadCrumbs';
import { ProductsContext } from '../../context/ProductsContext';
import { fetchProducts } from '../../services/products';
import { Loader } from '../../components/Loader';
import styles from './AccessoriesPage.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isPerPageActive, setIsPerPageActive] = useState(false);
  const { goods, updateGoods } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage');

  useEffect(() => {
    if (!goods?.length) {
      setIsLoading(true);
      fetchProducts()
        .then(data => updateGoods(data as Product[]))
        .catch(e => {
          throw new Error(e);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (goods?.length) {
      setAccessories(goods.filter(good => good.category === 'accessories'));
    }
  }, [goods]);

  const accessoriesAmount = useMemo(
    () => (accessories ? accessories.length : 0),
    [accessories],
  );
  const sortByOptions = useMemo(
    () => [
      { name: 'Newest', value: 'age' },
      { name: 'Alphabetically', value: 'title' },
      { name: 'Cheapest', value: 'price' },
    ],
    [],
  );
  const itemsPerPageOptions = useMemo(() => ['4', '8', '16', 'All'], []);

  const onSortBySelected = (value: string) => {
    setIsSortActive(false);
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const onPerPageSelected = (value: string) => {
    setIsPerPageActive(false);
    const params = new URLSearchParams(searchParams);

    if (value === 'All') {
      params.delete('perPage');
      params.delete('page');
      setSearchParams(params);

      return;
    }

    params.set('perPage', `${value}`);
    setSearchParams(params);
  };

  const sortedAccessories = useMemo(() => {
    switch (sortBy) {
      case 'age':
        return [...accessories.sort((a, b) => b.year - a.year)];
      case 'title':
        return [...accessories].sort((a, b) => b.name.localeCompare(a.name));
      case 'price':
        return [...accessories].sort((a, b) => a.price - b.price);
      default:
        return [...accessories];
    }
  }, [sortBy, accessories]);

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.pageHeading}>Accessories</h1>
      <p className={styles.amount}>{accessoriesAmount} models</p>
      <div className={styles.dropdowns}>
        <div className={styles.sortByContainer}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => {
                setIsSortActive(!isSortActive);
              }}
              onBlur={() => setIsSortActive(false)}
            >
              {sortByOptions.filter(option => option.value === sortBy)[0].name}
              <span
                className={`${styles.icon} ${
                  isSortActive ? styles.arrowUp : styles.arrowDown
                }`}
              ></span>
            </button>
            <div
              className={`${styles.dropdownContent} ${
                isSortActive ? styles.active : ''
              }`}
            >
              <ul className={styles.content}>
                {sortByOptions.map(option => (
                  <li
                    className={styles.option}
                    key={option.name}
                    onClick={() => {
                      onSortBySelected(option.value);
                    }}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.itemsOnPageContainer}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => {
                setIsPerPageActive(!isPerPageActive);
              }}
              onBlur={() => setIsPerPageActive(false)}
            >
              {perPage ? perPage : 'All'}
              <span
                className={`${styles.icon} ${
                  isPerPageActive ? styles.arrowUp : styles.arrowDown
                }`}
              ></span>
            </button>

            <div
              className={`${styles.dropdownContent} ${
                isPerPageActive ? styles.active : ''
              }`}
            >
              <ul className={styles.content}>
                {itemsPerPageOptions.map(option => (
                  <li
                    className={styles.option}
                    key={option}
                    onClick={() => {
                      onPerPageSelected(option);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductList
          itemsPerPage={perPage ? +perPage : accessoriesAmount}
          items={sortedAccessories}
        />
      )}
    </div>
  );
};
