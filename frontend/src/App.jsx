import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import RootLayout from "./Layout";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/auth/Login";
import MyOrders from "./pages/MyOrders";
import ThankYou from "./pages/ThankYou";
import ContactUs from "./pages/ContactUs";
import AuthLayout from "./pages/auth/AuthLayout";

// ProtectedRoute component
const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth/login" replace />;

  // Render the child routes if logged in
  return (
    <div className="container mx-auto p-8">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="auth" element={<AuthLayout />}>
            <Route index path="login" element={<Login />} />
          </Route>

          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="cart" element={<Cart />} />

          {/* Protected route start */}
          <Route element={<ProtectedRoute />}>
            <Route path="orders" element={<MyOrders />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Route>
          {/* Protected route end */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
