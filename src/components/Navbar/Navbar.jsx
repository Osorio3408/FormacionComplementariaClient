import React from "react";

export const Navbar = ({ title }) => {
  return (
    <header className="w-full bg-blue-700 h-[129px]">
      <nav className="flex justify-center items-center w-full h-full">
        <ul className="text-5xl text-white font-sans">
          <li>{title}</li>
        </ul>
      </nav>
    </header>
  );
};
