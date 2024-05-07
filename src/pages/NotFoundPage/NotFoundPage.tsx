import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

export const NotFoundPage:React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Page not found</p>
      <Link to="/" className={styles.homeLink}>Home Page</Link>
    </div>
  );
};
