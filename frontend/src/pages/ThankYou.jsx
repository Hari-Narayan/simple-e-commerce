import { useLocation, useNavigate } from "react-router";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || "N/A"; // Get Order ID

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600">🎉 Thank You!</h2>
        <p className="text-gray-600 mt-2">
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-200 p-4 rounded-md mt-4">
          <p className="text-sm text-gray-500">Order ID:</p>
          <p className="font-semibold text-gray-800">{orderId}</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
