import { GetAllChatbots } from "@/_actions/agent";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Agentcard from "./agent-card";
import SearchWithButton from "./search";

export default async function Page() {
  const agents = await GetAllChatbots();
  return (
    <div className="m-2 p-8">
      <div className="flex flex-row justify-between mb-8 mt-4">
        <Link href={"/"} className="flex items-start mr-2">
          <Image
            src={"/kaiandkaro.jpeg"}
            alt={"logo"}
            className="rounded-lg "
            width={80}
            height={80}
          />
        </Link>
        <SearchWithButton />
      </div>
      <hr />
      <p className="text-center text-sm mb-4 mt-4">Trending car agents</p>
      <div className="p-2 m-2 items-center justify-center">
        {agents && agents.length === 0 ? (
          <p className="text-center text-gray-500">No agents found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {agents?.map((agent) => (
              <Agentcard key={agent.id} bot={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
