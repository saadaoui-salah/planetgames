import Link from "next/link";
import {
  CloseMenuIcon,
  HeartIcon,
  LeftArrow,
  NotificationIcon,
  OpenMenuIcon,
  RightArrow,
  ShoppingCartIcon,
} from "./Icons";
import { useStateContext } from "@/context/contextProvider";
import Image from "next/image";
import AvatarImage from '@/avatar.png'

export const Button = ({ children, onClick, px }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-${px} rounded focus:outline-none focus:shadow-outline`}
      type="button"
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
};

export const ToggleSideBarButton = ({ open, setOpen }) => {
  return (
    <div
      onClick={() => setOpen(!open)}
      className="absolute cursor-pointer hover:animate-none animate-bounce bg-gradient-to-r from-[#ff80b5] to-[#9089fc] top-16 border border-gray-300 hover:border-gray-500 border-l-0 rounded-md rounded-l-none bg-gray-50 -right-8 px-1 py-3"
    >
      <button
        id="toggleSidebar"
        onClick={() => setOpen(!open)}
        className="flex items-center  justify-center"
      >
        {open ? <LeftArrow /> : <RightArrow />}
      </button>
    </div>
  );
};

export const CartButton = () => {
  return (
    <Link
      href="/cart"
      className="h-8 rounded-full hover:bg-gray-200 relative p-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute top-0 -left-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      <ShoppingCartIcon />
    </Link>
  );
};

export const ProfileButoon = ({ action }) => {
  const { profile } = useStateContext();
  return (
    <button
      onClick={() => action()}
      type="button"
      className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <Image
        width={30}
        height={30}
        className="h-8 w-8 rounded-full"
        src={profile.image ? profile.image : AvatarImage}
        alt=""
      />
    </button>
  );
};

export const NotificationButton = ({ action }) => {
  return (
    <button
      onClick={() => action()}
      type="button"
      className="rounded-full relative hover:bg-gray-200 p-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute top-0 -left-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      <NotificationIcon />
    </button>
  );
};

export const SaveButton = ({ saved, onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      type="submit"
      className="rounded-full hover:bg-red-100 p-1 text-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
    >
      <HeartIcon saved={saved} />
    </button>
  );
};

export const MobileMenuButtons = ({ onclick, open }) => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        onClick={() => onclick()}
        type="button"
        id="dropdownBtn"
        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        {open ? <OpenMenuIcon /> : <CloseMenuIcon />}
      </button>
    </div>
  );
};

export const AuthButtons = () => {
  return (
    <>
      <Link
        href="/login"
        className="hover:bg-gradient-to-r from-[#ff80b5] to-[#9089fc]  hover:text-white text-indigo-400 border border-indigo-400 mr-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="bg-gradient-to-r from-[#ff80b5] to-[#9089fc]  text-white font-bold py-2 px-4 rounded focus:outline-none border border-indigo-400 focus:shadow-outline"
      >
        Sign Up
      </Link>
    </>
  );
};
