import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderDetails from "./components/OrderDetails";
import Cart from "./components/Cart";
import GuestCart from "./components/GuestCart";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<AllProducts></AllProducts>}></Route>
        <Route
          path="/products/all"
          element={<AllProducts></AllProducts>}
        ></Route>
        <Route
          path="/products/single/:id"
          element={<SingleProduct></SingleProduct>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route
          path="/order/:id/orderdetails"
          element={<OrderDetails></OrderDetails>}
        ></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/gcart" element={<GuestCart></GuestCart>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
