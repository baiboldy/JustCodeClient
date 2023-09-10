// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  checkIsAuth,
  logout,
  getName,
} from "../../redux/features/auth/authSlice";

import { toast } from "react-toastify";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const userNameAuth = useSelector(getName);
  console.log(userNameAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeStyle = {
    color: "gray",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли из системы!");
    navigate("/");
  };

  // const getUserHandler = () => {
  //   dispatch(logout());
  //   window.localStorage.removeItem("token");
  //   toast("Вы вышли из системы!");
  // };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <img className={styles.img} src="./info/Logo2.png" alt="LOGO" />
          <ul className={styles.ul}>
            <li>
              <NavLink
                className={styles.underline}
                to={"/"}
                href="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Главная
              </NavLink>
            </li>

            <li>
              <NavLink
                className={styles.underline}
                to={"/contact"}
                href="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Контакты
              </NavLink>
            </li>
          </ul>
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
                <img className={styles.icon} src="./info/facebook.png" alt="" />
              </Link>
            </div>
          </div>

          <div className={styles.auth}>
            {isAuth ? (
              <>
                <span>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    className={`${styles.name} ${styles.underline}`}
                    to={"/user"}
                  >
                    {userNameAuth}
                  </NavLink>
                </span>

                <img
                  onClick={logoutHandler}
                  className={styles.login}
                  src="./info/exit.png"
                  alt=""
                />
              </>
            ) : (
              <Link to="/login">
                <img className={styles.login} src="./info/person.png" alt="" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
