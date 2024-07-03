"use client";

import { CreateChatbot } from "@/_actions/agent";
import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await CreateChatbot(name);
      setName("");
      console.log(data);
      if (data?.bot?.id) {
        router.push(`/edit/${data.bot.id}`);
      } else {
        console.error("Error creating bot:", data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
      <Avatar seed={"create-chatbot"} />

      <div className="">
        <h1 className="text-xl text-black lg:text-3xl font-semibold">
          {" "}
          Create Agent
        </h1>
        <h2 className="font-light text-black">
          Create a new agent to assist in a conversation about a certain car
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-2 mt-5"
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g new VW GTI agent..."
          required
          className="max-w-lg text-black"
        />
        <Button>Create AI Agent</Button>
      </form>
    </div>
  );
}
