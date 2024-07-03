import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { FetchAdminStatus } from "@/_actions/admin";
import { CheckUser } from "@/_actions/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Navbar() {
  const user = await currentUser();
  if (user) {
    await CheckUser(user.emailAddresses[0].emailAddress);
  }

  const isadmin = await FetchAdminStatus();

  return (
    <header className="flex  justify-between p-5 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Link href={"/"} className="flex items-center">
        <Image
          src={"/kaiandkaro.jpeg"}
          alt={"logo"}
          className="rounded-lg"
          width={80}
          height={80}
        />
      </Link>
      <div className="flex justify-end text-white p-2 space-x-2 items-center">
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="font-serif mr-2">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {isadmin && (
          <div>
            {" "}
            <Link href={"/create"}>
              <Button className="bg-orange-500">Admin Panel</Button>
            </Link>
          </div>
        )}
        {}
      </div>
    </header>
  );
}
