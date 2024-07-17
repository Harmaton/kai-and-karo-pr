import { XCircleIcon } from "@heroicons/react/24/outline";
import { ChatbotCharacteristic } from "@prisma/client";
import React from "react";

export default function Characteristic({
  characteritic,
}: {
  characteritic: ChatbotCharacteristic;
}) {
  const handleremoveXtic = async (id: string) => { 

    

  };
  return (
    <li className="relative bg-white rounded-md border p-5 ">
      {characteritic.content}
      <XCircleIcon
        className="w-4 h-4 text-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-45"
        onClick={()=>handleremoveXtic(characteritic.id)}
      />
    </li>
  );
}
