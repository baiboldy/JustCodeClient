import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { AddProductPage } from "./pages/AddProductPage/AddProductPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { EditProductPage } from "./pages/EditProductPage/EditProductPage";
import { getMe } from "./redux/features/auth";
import { UserPage } from "./pages/UserPage/UserPage";
import { ContactPage } from "./components/ContactPage/ContactPage";
function App() {
  const dispatch = useDispatch();
  //при обновлении будем проверять авторизацию
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path=":id" element={<ProductPage />} />
          <Route path=":id/edit" element={<EditProductPage />} />
          <Route path="new" element={<AddProductPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
        <ToastContainer theme="dark" position="bottom-left" />
      </Layout>
    </>
  );
}

export default App;
