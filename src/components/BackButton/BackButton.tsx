import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <button className={styles.backButton} onClick={goBack}>
      <span className={styles.arrowBack}></span>Back
    </button>
  );
};
