import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="flex  justify-between p-5 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Link href={"/"} className="flex items-center">
        <Image src={"/kaiandkaro.jpeg"} alt={"logo"} width={80} height={80} />
      </Link>

      <div className="flex justify-end text-white p-2 items-center">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
