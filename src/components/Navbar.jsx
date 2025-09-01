import React, { useState, useEffect, useRef } from "react";
import ThemeSwitch from "../shared/ThemeSwitch";
import { Button } from "./ui";
import { NavLink, Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, userLogOut } = useAuth();

  const handleLogout = async () => {
    try {
      await userLogOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img src="/logo.svg" width={45} alt="" />
          <p className="font-extrabold">
            <span className="text-primary">C</span>OURSE
            <span className="text-primary">H</span>UB
          </p>
        </NavLink>

        <ul className="items-center space-x-8 hidden lg:flex">
          <li>
            <NavLink
              to="/"
              aria-label="Home"
              title="Home"
              className={({ isActive }) =>
                `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary" : "text-base-content/70"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              aria-label="Courses"
              title="Courses"
              className={({ isActive }) =>
                `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary" : "text-base-content/70"
                }`
              }
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              aria-label="About"
              title="About"
              className={({ isActive }) =>
                `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary" : "text-base-content/70"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              aria-label="Contact"
              title="Contact"
              className={({ isActive }) =>
                `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary" : "text-base-content/70"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <ul className="items-center space-x-4 hidden lg:flex">
          <li>
            <ThemeSwitch />
          </li>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User avatar"
                        className="rounded-full cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full flex items-center justify-center bg-base-200">
                        <FaUser className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-base-300">
                    <p className="font-semibold text-base-content truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-sm text-base-content/70 truncate">
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-base-content hover:bg-base-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-error hover:bg-base-200 cursor-pointer"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <li>
              <Link to="/login">
                <Button className="py-2.5">Sign In</Button>
              </Link>
            </li>
          )}
        </ul>

        <div className="lg:hidden flex items-center space-x-4">
          <ThemeSwitch />
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-base-200 focus:bg-base-200"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-base-content" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-base-100 border border-base-300 rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <NavLink
                      to="/"
                      aria-label="CourseHub"
                      title="CourseHub"
                      className="inline-flex items-center"
                    >
                      <div className="flex items-center">
                        <img src="/logo.svg" width={45} alt="" />
                        <p className="font-extrabold">
                          <span className="text-primary">C</span>OURSE
                          <span className="text-primary">H</span>UB
                        </p>
                      </div>
                    </NavLink>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-base-200 focus:bg-base-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="w-5 text-base-content"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <NavLink
                        to="/"
                        aria-label="Home"
                        title="Home"
                        className={({ isActive }) =>
                          `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                            isActive ? "text-primary" : "text-base-content/70"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/courses"
                        aria-label="Courses"
                        title="Courses"
                        className={({ isActive }) =>
                          `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                            isActive ? "text-primary" : "text-base-content/70"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Courses
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/about"
                        aria-label="About"
                        title="About"
                        className={({ isActive }) =>
                          `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                            isActive ? "text-primary" : "text-base-content/70"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        aria-label="Contact"
                        title="Contact"
                        className={({ isActive }) =>
                          `font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                            isActive ? "text-primary" : "text-base-content/70"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact
                      </NavLink>
                    </li>
                    {user ? (
                      <li className="border-t border-base-300 pt-4 mt-4">
                        <div className="flex items-center mb-4">
                          <div className="avatar mr-3">
                            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              {user.photoURL ? (
                                <img
                                  src={user.photoURL}
                                  alt="User avatar"
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full flex items-center justify-center bg-base-200">
                                  <FaUser className="w-5 h-5 text-primary" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-base-content truncate">
                              {user.displayName || "User"}
                            </p>
                            <p className="text-sm text-base-content/70 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to="/dashboard"
                              className="block w-full text-left px-4 py-3 rounded-md font-medium text-base-content bg-base-200 hover:bg-primary hover:text-primary-content"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 rounded-md font-medium text-base-content bg-base-200 hover:bg-error hover:text-error-content"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <li>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button
                            fullWidth
                            className="h-12"
                            aria-label="Sign In"
                            title="Sign In"
                          >
                            Sign In
                          </Button>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
