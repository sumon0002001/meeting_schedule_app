import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <div
        className="flex items-center justify-between
        p-5 shadow-sm"
      >
        <Image src="./logo.svg" width={50} height={50} alt="logo" />
        <ul>
          <li>Product</li>
          <li>Pricing</li>
          <li>Contact us</li>
          <li>About Us</li>
        </ul>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Login
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Getting Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
