import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./BreadCrumbs.module.scss";

type Props = {
  details?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ details }) => {
  const { pathname } = useLocation();
  const category = pathname.split("/")[1];
  const categoryWord = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.homeIcon}></NavLink>
      <span className={styles.arrowIcon}></span>
      <NavLink
        aria-disabled={!details}
        to={`/${category}`}
        className={details ? styles.breadcrumbLink : styles.breadcrumb}
      >
        {categoryWord}
      </NavLink>
      {details && (
        <>
          <span className={styles.arrowIcon}></span>
          <span className={styles.breadcrumb}>{details}</span>
        </>
      )}
    </div>
  );
};
