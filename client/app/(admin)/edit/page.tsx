import { GetChatBotSByUser } from "@/_actions/agent";
import Avatar from "@/components/avatar";
import Link from "next/link";
import React from "react";
import Characterisctic from "./[id]/_components/characterisctic";

export default async function Page() {
  const agents = await GetChatBotSByUser();

  return (
    <div className="flex-1 pb-20 p-10 mx-auto">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">Active Agents</h1>
      {agents ? (
        <ul>
          {agents.map((agent) => (
            <Link key={agent.id} href={`/edit/${agent.id}`}>
              <li className="bg-white relative p-4 border rounded-md mb-2">
                <div>
                  <div className="flex items-center space-x-4">
                    <Avatar seed={agent.name} />
                    <h2 className="text-black">{agent.name}</h2>
                    <p className="absolute top-5 right-5 text-xs text-gray-800">
                      Created: {new Date(agent.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <hr className="mt-2" />
                  <div className="grid grid-cols-2 gap-10 text-black md:gap-5 p-5">
                    <h3 className="font-serif">Latest Characteristics</h3>
                    {agent.characteristics.length === 0 ? <div> 
                      Not added Yet
                    </div> : (
                      <div>
                        {agent.characteristics
                          .slice(0, 2)
                          .map((characteristic) => (
                            <Characterisctic
                              key={characteristic.id}
                              characteristic={characteristic}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>You have no agent yet.</p>
      )}
    </div>
  );
}
