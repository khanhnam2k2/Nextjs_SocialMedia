import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[30%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          Social Network
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600 items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/home.png"
              className="h-4 w-4"
              alt="homepage"
              width={16}
              height={16}
            />
            <span>Home</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/friends.png"
              className="h-4 w-4"
              alt="homepage"
              width={16}
              height={16}
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/stories.png"
              className="h-4 w-4"
              alt="homepage"
              width={16}
              height={16}
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Search size={14} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <Loader />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" width={20} height={20} alt="user" />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" width={20} height={20} alt="user" />
            </div>
            <div className="cursor-pointer">
              <Image
                src="/notifications.png"
                width={20}
                height={20}
                alt="user"
              />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <User />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
