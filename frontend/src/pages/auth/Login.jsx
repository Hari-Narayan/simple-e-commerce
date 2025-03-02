import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";

import { fetchUser } from "../../services/userService";
import { updateUser } from "../../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleSubmit = useCallback(async () => {
    setFormError("");

    if (!userData.email || !userData.password) {
      setFormError("Please enter Email & Password!");
      return;
    }

    const { status, data: user, token } = await fetchUser(userData);

    if (status === 401) {
      setFormError("Invalid email or password");
      return;
    } else if (status === 500) {
      setFormError("Server error");
      return;
    }

    localStorage.setItem("E_COM_TOKEN", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(updateUser(user));

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [userData]);

  return (
    <>
      <div className="bg-white rounded-lg p-8 shadow-md w-[35%] mx-auto">
        <div className="text-red-800">{formError}</div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            autoFocus
            name="email"
            type="email"
            value={userData.email}
            placeholder="Email Address"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-full focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full mt-6 uppercase bg-red-800 border-red-800 text-white rounded-full py-3 focus:outline-none cursor-pointer hover:bg-white hover:text-red-800 border hover:border-red-800 transition-all duration-300"
        >
          LogIn
        </button>
      </div>
    </>
  );
}
