import {
  EyeIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="p-5 shadow-lg lg:pl-10 ">
      <ul className="gap-5 flex lg:flex-col">
        <li className="flex-1">
          <Link
            href={"/create"}
            className="hover:opacity-50 flex flex-col  text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-orange-500"
          >
            <PlusCircleIcon className="text-white h-6 w-6" />
            <div className="hidden md:inline">
              <p className="text-xl">Create</p>
              <p className="text-sm font-extralight">New Agent</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href={"/edit"}
            className="hover:opacity-50  flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-orange-500"
          >
            <PencilIcon className="text-white h-6 w-6" />
            <div className="hidden md:inline">
              <p className="text-xl">Edit</p>
              <p className="text-sm font-extralight">Agents</p>
            </div>
            
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href={"/view"}
            className="hover:opacity-50  flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-orange-500"
          >
            <EyeIcon className="text-white h-6 w-6" />
            <div className="hidden md:inline">
              <p className="text-xl">Review</p>
              <p className="text-sm font-extralight">Sessions</p>
            </div>
            
          </Link>
        </li>
      </ul>
    </div>
  );
}
