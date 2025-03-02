import { Link } from "react-router";

const EmptyCart = () => {
  return (
    <div className="flex justify-center items-center px-4 py-6">
      <div className="text-center p-8">
        {/* Empty Cart Icon & Message */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-24 h-24 mx-auto text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18M3 3l1 18h14l1-18M3 3l2-2h14l2 2"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mt-2">
          Looks like you haven't added anything to your cart yet.
        </p>
        <div className="mt-4 text-gray-500 text-sm">
          <p>
            Need Help?
            <Link to="/contact-us" className="text-blue-500 pl-2">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
