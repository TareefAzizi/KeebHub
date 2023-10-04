import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (window.gapi && window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2) {
        setIsLoggedIn(auth2.isSignedIn.get());
        const listener = (isSignedIn) => {
          setIsLoggedIn(isSignedIn);
        };
        auth2.isSignedIn.listen(listener);
        return () => auth2.isSignedIn.removeListener(listener);
      }
    }
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          href="/"
          passHref
          className="font-semibold text-3xl tracking-tight hover:text-gray-300 no-underline"
        >
          <span className="text-gray-700 shadow-sm">Keeb</span>
          <span className="text-gray-700 shadow-sm">Hub</span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggle}
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow"></div>
        <div className="flex items-center">
          <Link
            href="/Blog"
            className="mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 no-underline"
          >
            Blog
          </Link>
          <Link
            href="/Photos"
            className="mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 no-underline"
          >
            Photos
          </Link>
          {!isLoggedIn && (
            <Link
              href="/Login"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
            >
              Login
            </Link>
          )}
          <Link
            href="/Profile"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-300 border-gray-300 hover:text-gray-500 hover:bg-gray-700 mt-4 lg:mt-0"
          >
            <FaUserCircle size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
