// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserPage.module.css";
import { useEffect, useState } from "react";
import { updateUser, removeUser, logout } from "../../redux/features/auth";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export const UserPage = () => {
  const userFromRedux = useSelector((state) => state.auth.user);
  const [_id, setID] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // { …user, password: e.target.value }

  useEffect(() => {
    if (userFromRedux) {
      setUsername(userFromRedux.username);
      // setPassword(userFromRedux.password);
      setPhone(userFromRedux.phone);
      setEmail(userFromRedux.email);
      setID(userFromRedux._id);
    }
  }, [userFromRedux]);

  // const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhoneChange = (e) => {
    if (!phone.startsWith("+7")) {
      setPhone("+7" + e.target.value);
    } else if (e.target.value === "+7") {
      // Если строка начинается с "+7" и пользователь удаляет весь текст
      setPhone("");
    } else {
      setPhone(e.target.value);
    }
  };
  const handleEmailChange = (e) => setEmail(e.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    try {
      dispatch(updateUser({ _id, username, password, phone, email }));
      setPassword(""); //вынести в общий метод
      setUsername("");
      setPhone("");
      setEmail("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    try {
      dispatch(removeUser({ _id }));
      setPassword("");
      setUsername("");
      setPhone("");
      setEmail("");
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1 className={styles.h1}>Личный кабинет</h1>
          <div className={styles.field}>
            <label className={styles.label}>Логин:</label>
            <label className={styles.label}>{username}</label>
            {/* <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            /> */}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Новый пароль:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Телефон:</label>
            <input
              className={styles.input}
              type="text"
              value={phone}
              placeholder=""
              onChange={handlePhoneChange}
            />
          </div>
          <button
            className={`${styles.btn_update} ${styles.button}`}
            onClick={handleSubmit}
          >
            Изменить данные
          </button>
          <button
            className={`${styles.btn_delete} ${styles.button}`}
            onClick={handleDelete}
          >
            Удалить пользователя и выйти
          </button>
        </div>
      </div>
    </>
  );
};
