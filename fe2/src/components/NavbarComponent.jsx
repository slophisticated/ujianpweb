import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const NavbarComponent = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="font-montserrat">
      <nav className="relative flex flex-wrap items-center justify-between py-4 bg-slate-900 z-10 shadow-lg">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block">
            <a
              className="text-2xl md:text-3xl font-bold tracking-wide text-purple-400"
              href="/"
            >
              ilo
            </a>

            <button
              className="text-purple-400 text-xl px-3 py-2 lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center transition-all duration-200" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row lg:ml-auto items-center gap-2">
              <li>
                <a
                  className="px-4 py-2 rounded-md text-slate-200 hover:bg-slate-800 transition"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="px-4 py-2 rounded-md text-slate-200 hover:bg-slate-800 transition"
                  href="/data_mhs"
                >
                  Data Mahasiswa
                </a>
              </li>
            </ul>

            <ul className="ml-auto mt-3 lg:mt-0">
              <li>
                <button
                  type="button"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                >
                  XGEN
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
