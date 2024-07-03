import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Layoutheader() {
  return (
    <header className="shadow-lg flex justify-between p-6 m-4">
      <Link href={"/"} className="flex items-center text-4xl font-thin">
        <Avatar seed={"Kai and Karo AI"} className="mr-2" />
        <div className="space-y-1">
          <h1 className="font-serif">Kai and Karo AI Agents</h1>
          <h2 className="text-sm font-extralight">
            Customizable AI car agents
          </h2>
        </div>
      </Link>

      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="font-serig">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
