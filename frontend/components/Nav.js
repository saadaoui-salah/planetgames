"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  AuthButtons,
  MobileMenuButtons,
  ProfileButoon,
} from "./shared/Buttons";
import { useStateContext } from "@/context/contextProvider";
import LogoImage from "@/public/static/logo.png"
import AvatarImage from "@/avatar.png"
import Image from "next/image";
import { useSettings } from "@/roupi/auth";

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 items-center w-14 h-14">
      <Image src={LogoImage} width={60} height={60} />
    </div>
  );
};

const DropDownLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block hover:bg-gray-100  px-4 py-2 text-sm text-gray-700"
    >
      {title}
    </Link>
  );
};

const DropDownMenu = ({ Icon, children }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
        document.removeEventListener("click", () => "");
      }
    }

    document.addEventListener("click", (e) => handleClickOutside(e));
  }, []);
  return (
    <div ref={dropdownRef} className="relative ml-3">
      <Icon action={() => setDropdown(!dropdown)} />
      {dropdown && (
        <div
          onClick={() => setDropdown(!dropdown)}
          className="absolute  right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          id="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
};

const MenuLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="text-gray-800 font-bold hover:bg-gradient-to-r from-[#ff80b5] to-[#9089fc] hover:text-white rounded-md px-3 py-2 text-sm"
    >
      {title}
    </Link>
  );
};

const Navigation = () => {
  return (
    <>
      <MenuLink href="/" title="Home" />
      <MenuLink href="/products" title="Products" />
    </>
  );
};

export const Nav = () => {
  useSettings()
  const { profile } = useStateContext();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="bg-gray-50">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/*Mobile menu button */}
          <MobileMenuButtons
            onclick={() => setOpenMenu(!openMenu)}
            open={openMenu}
          />
          <div className="flex flex-1 justify-center sm:items-stretch sm:justify-start">
            <Logo />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex pt-2 space-x-4">
                <Navigation />
              </div>
            </div>
          </div>
          {!profile.email && (
            <div className="flex h-full items-center">
              <AuthButtons />
            </div>
          )}
          {profile.email && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <DropDownMenu Icon={ProfileButoon}>
                <DropDownLink href="/account/orders" title="Orders" />
                <DropDownLink href="/account/settings" title="Settings" />
              </DropDownMenu>
            </div>
          )}
        </div>
      </div>
      {openMenu && (
        <div className="space-y-1 px-2 pb-3 pt-2 min-[640px]:hidden">
          <Navigation />
        </div>
      )}
    </nav>
  );
};
