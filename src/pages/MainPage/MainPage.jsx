// import React from "react";
import styles from "./MainPage.module.css";
import { Footer } from "../../components/Footer/Footer";
export const MainPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.welcome}>
            <h2 className={styles.h1}>ДОБРО ПОЖАЛОВАТЬ</h2>
            <h1 className={styles.h2}>САЛОН КРАСОТЫ ANESTHETIC</h1>
          </div>

          <img className={styles.img} src="./info/1.png" alt="" />
          <img className={styles.decor} src="./info/Rectangle.png" alt="" />
          <img
            className={styles.decorflower}
            src="./info/flower1.png"
            alt="dec"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
