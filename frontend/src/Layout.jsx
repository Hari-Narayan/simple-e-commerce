import { Outlet } from "react-router";

import Navbar from "./components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
