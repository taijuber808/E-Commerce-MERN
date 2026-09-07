import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Product";
import Navbar from "./Component/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        <Route path="/search" element={<Search />} />
        <Route
          path="/wishlist"
          element={
            <>
              <Navbar />
              <Wishlist />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />

        <Route
          path="/allProducts"
          element={
            <>
              <Navbar />
              <Products />
            </>
          }
        />

        <Route
          path="/products/category/:id"
          element={
            <>
              <Navbar />
              <Products />
            </>
          }
        />

        <Route
          path="/Product-detail/:id"
          element={
            <>
              <Navbar />
              <ProductDetail />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <Orders />
            </>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
