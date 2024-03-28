"use client";
import React from "react";
import Image from "next/image";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
  return (
    <div>
      <div
        className="flex items-center justify-between
        p-5 shadow-sm"
      >
        <Image src="./logo.svg" width={50} height={50} alt="logo" />
        <ul className="hidden md:flex gap-14 font-medium text-lg ">
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Product
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Pricing
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Contact us
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            About Us
          </li>
        </ul>
        <div className="flex gap-5">
          <LoginLink>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Login
            </button>
          </LoginLink>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Getting Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
