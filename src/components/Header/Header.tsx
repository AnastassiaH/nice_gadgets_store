import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/logo.svg`;
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { favoriteItems } = useContext(FavoritesContext);

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuActive]);

  const cartItemsAmount = useMemo(
    () =>
      cartItems ? cartItems.reduce((acc, item) => acc + item.amount, 0) : 0,
    [cartItems],
  );

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      <div className={styles.headerMobile}>
        <div className={styles.top}>
          <Link className={styles.logoLink} to="/">
            <img src={logoUrl} alt="" />
          </Link>
          <button onClick={toggleMenu} className={styles.button}>
            <span className={`${styles.icon} ${styles.iconMenu}`}></span>
          </button>
        </div>
      </div>
      <aside className={`${styles.menu} ${isMenuActive ? styles.active : ''}`}>
        <div className={styles.top}>
          <Link
            className={styles.logoLink}
            to="/"
            onClick={() => setIsMenuActive(false)}
          >
            <img src={logoUrl} alt="" />
          </Link>
          <button onClick={toggleMenu} className={styles.button}>
            <span className={`${styles.icon} ${styles.iconClose}`}></span>
          </button>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li
              className={styles.navItem}
              onClick={() => setIsMenuActive(false)}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li
              className={styles.navItem}
              onClick={() => setIsMenuActive(false)}
            >
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Phones
              </NavLink>
            </li>
            <li
              className={styles.navItem}
              onClick={() => setIsMenuActive(false)}
            >
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li
              className={styles.navItem}
              onClick={() => setIsMenuActive(false)}
            >
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.menuIcons}>
          <NavLink
            to="/favorites"
            onClick={() => setIsMenuActive(false)}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            <span className={`${styles.icon} ${styles.iconHeart}`}>
              {favoriteItems.length > 0 && (
                <span className={styles.cartItemsAmount}>
                  {favoriteItems.length}
                </span>
              )}
            </span>
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setIsMenuActive(false)}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            <span className={`${styles.icon} ${styles.iconCart}`}>
              {cartItemsAmount > 0 && (
                <span className={styles.cartItemsAmount}>
                  {cartItemsAmount}
                </span>
              )}
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
