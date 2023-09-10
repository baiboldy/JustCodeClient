// import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
export const Footer = () => {
  return (
    <>
      <>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.logo}>ANESTHETIC</div>
            <div>тел. +7(771)259-22-00</div>
            <div className={styles.social}>
              <div>
                <Link to="https://www.instagram.com/tv/CIKOSX_CF_O/">
                  <img
                    className={styles.icon}
                    src="./info/instagram.png"
                    alt=""
                  />
                </Link>
              </div>
              <div>
                <Link to="https://m.facebook.com/anesthesia.krg">
                  <img
                    className={styles.icon}
                    src="./info/facebook.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
