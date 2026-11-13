// Components.jsx
import { ShieldCheck, Home, ShieldAlert, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      className="w-full bg-emerald-950
      shadow-2xl  border-b border-emerald-800"
    >
      <div
        className="flex items-center justify-between min-w-0
        h-16 px-3 sm:px-8"
      >
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-6 w-6 sm:w-8 sm:h-8" />
          <h1 className="text-base min-[431px]:text-xl sm:text-3xl font-bold text-white">
            Fraud Detection
          </h1>
        </div>

        <div>
          <div className="flex gap-2 sm:gap-4">
            <Link
              to="/dashboard"
              title="Home"
              className="flex items-center gap-1 sm:gap-2  text-sm sm:text-lg text-emerald-100 hover:text-emerald-300 transition cursor-pointer"
            >
              <Home className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="max-[430px]:hidden">Home</span>
            </Link>

            <Link
              to="/detect"
              title="Detect"
              className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg text-emerald-100 hover:text-emerald-300 transition cursor-pointer"
            >
              <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="max-[430px]:hidden">Detect</span>{" "}
            </Link>

            <Link
              to="/"
              title="Logout"
              className="flex items-center gap-1 sm:gap-2  text-sm sm:text-lg text-emerald-100 hover:text-emerald-300 transition cursor-pointer"
            >
              <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="max-[430px]:hidden">Logout</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="mt-auto sm:mt-9 w-full border-t border-emerald-900/60 bg-transparent">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-5 text-center">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-emerald-400">
            Fraud Detection
          </span>
          <span className="mx-2 text-emerald-700">|</span>
          Credit Card Fraud Detection System
        </p>

        <p className="text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} Fraud Detection. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

