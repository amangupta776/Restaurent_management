import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../Screens/Home";
import OrderTracking from "../Screens/Order_Tracking";
import Menu from "../Screens/Menu";
import ReservationForm from "../Screens/Resarvation";
import Login from "../Screens/Login";
import ContactUs from "../Screens/Contact";
const Routings = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" index element={<Home />} />
        <Route path="/order" element={<OrderTracking />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routings;
