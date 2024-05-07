import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { CartContext } from "../../context/CartContext";
import { FavoritesContext } from "../../context/FavoritesContext";

export const Header: React.FC = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/logo.svg`;
  const [isActive, setIsActive] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { favoriteItems } = useContext(FavoritesContext);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  let cartItemsAmount = useMemo(
    () =>
      cartItems ? cartItems.reduce((acc, item) => acc + item.amount, 0) : 0,
    [cartItems]
  );

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={styles["header--mobile"]}>
        <div className={styles.top}>
          <Link className={styles.logoLink} to="/">
            <img src={logoUrl} alt="" />
          </Link>
          <button onClick={toggleMenu} className={styles.button}>
            <span className={`${styles.icon} ${styles["icon--menu"]}`}></span>
          </button>
        </div>
      </div>
      <aside className={`${styles.menu} ${isActive ? styles.active : ""}`}>
        <div className={styles.top}>
          <Link
            className={styles.logoLink}
            to="/"
            onClick={() => setIsActive(false)}
          >
            <img src={logoUrl} alt="" />
          </Link>
          <button onClick={toggleMenu} className={styles.button}>
            <span className={`${styles.icon} ${styles["icon--close"]}`}></span>
          </button>
        </div>
        <nav className={styles.nav}>
          <ul className={styles["nav__list"]}>
            <li
              className={styles["nav__item"]}
              onClick={() => setIsActive(false)}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li
              className={styles["nav__item"]}
              onClick={() => setIsActive(false)}
            >
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Phones
              </NavLink>
            </li>
            <li
              className={styles["nav__item"]}
              onClick={() => setIsActive(false)}
            >
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li
              className={styles["nav__item"]}
              onClick={() => setIsActive(false)}
            >
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles["menu__icons"]}>
          <NavLink
            to="/favorites"
            onClick={() => setIsActive(false)}
            className={({ isActive }) =>
              `${styles["nav__link"]} ${
                isActive ? styles["nav__link--active"] : ""
              }`
            }
          >
            <span className={`${styles.icon} ${styles["icon--heart"]}`}>
              {favoriteItems.length > 0 && (
                <span className={styles.cartItemsAmount}>
                  {favoriteItems.length}
                </span>
              )}
            </span>
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setIsActive(false)}
            className={({ isActive }) =>
              `${styles["nav__link"]} ${
                isActive ? styles["nav__link--active"] : ""
              }`
            }
          >
            <span className={`${styles.icon} ${styles["icon--cart"]}`}>
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
