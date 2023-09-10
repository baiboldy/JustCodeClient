// import React from "react";
import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../../redux/features/auth";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //получаем из reducer
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }

    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>Авторизация</div>

          <label
            className={`${styles.label} ${username ? styles.filed : ""}`}
            htmlFor="username"
          >
            {username ? (
              <input
                className={`${styles.input} ${styles.name} ${styles.filed}`}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                name="username"
              />
            ) : (
              <input
                className={`${styles.input} ${styles.name}`}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                name="username"
              />
            )}

            <span className={styles.span}>Login</span>
          </label>

          <label
            className={`${styles.label} ${password ? styles.filed : ""}`}
            htmlFor="password"
          >
            {password ? (
              <input
                className={`${styles.input} ${styles.password} ${styles.filed}`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
              />
            ) : (
              <input
                className={`${styles.input} ${styles.password}`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
              />
            )}
            <span className={styles.span}>Password</span>
          </label>

          <div
            onClick={handleSubmit}
            className={`${styles.button} ${
              username && password ? "" : `${styles.button} ${styles.disable}`
            }`}
          >
            Войти
          </div>

          <Link to={"/register"}>Нет аккаунта?</Link>
        </div>
      </div>
    </>
  );
};
