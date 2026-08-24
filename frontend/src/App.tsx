import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/page";
import Product from "./pages/Product/page";
import Shop from "./pages/Shop/page";
import Cart from "./pages/Cart/page";
import Login from "./pages/login/page";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./Layout/Layout";
import Register from "./pages/register/page";
import Checkout from "./pages/Checkout/page";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:category?" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
