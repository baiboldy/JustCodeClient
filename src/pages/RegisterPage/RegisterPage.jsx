import { useState, useEffect } from "react";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerUser } from "../../redux/features/auth";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  //на форме
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //получаем из reducer
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  // console.dir(useSelector((state) => state));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate("/");
    console.log("isAuth" + isAuth);
    console.log("status" + status);
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>Регистрация</div>

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
            Зарегистрироваться
          </div>
          <Link to={"/login"}>Войти</Link>
        </div>
      </div>
    </>
  );
};
