import React from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { updateUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartCount } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(updateUser(null));
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white py-6 px-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about-us" className="hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contact-us" className="hover:text-gray-300">
            Contact Us
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/cart" className="hover:text-gray-300">
            <FontAwesomeIcon icon={faCartShopping} className="fa-fw" />
            <span className="bg-red-800 rounded-full text-white px-2.5 py-1 ml-1">
              {cartCount}
            </span>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/orders" className="hover:text-gray-300">
                Orders
              </Link>
              <button className="cursor-pointer" onClick={handleLogOut}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
