// import React from "react";
import styles from "./ContactPage.module.css";
export const ContactPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.info}>
            <img className={styles.img} src="./info/office1.png" alt="office" />
          </div>

          <div>
            <div className={styles.name}>Мы находимся по адресу</div>
            <p className={styles.p}>г.Караганда</p>
            <p className={styles.p}>
              Бизнес-центр <span className={styles.ofice}>Office 33</span>{" "}
            </p>
            <p className={styles.p}>пр. Строителей, 33</p>
            <p className={styles.p}>413 офис; 4 этаж</p>
            <div className={styles.name}>Косметолог</div>
            <p className={styles.p}>Анастасия Ахметова</p>
            <p className={styles.p}>тел.+7(771)259-22-00</p>
          </div>
        </div>
      </div>
    </>
  );
};
