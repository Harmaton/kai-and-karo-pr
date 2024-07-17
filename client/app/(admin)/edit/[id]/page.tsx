"use client";

import { GetChatbotById } from "@/_actions/agent";
import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { prismadb } from "@/lib/prisma";
import { BASE_URL } from "@/lib/url";
import { GetChatbotByIdResponse } from "@/types/types";
import { Chatbot, ChatbotCharacteristic } from "@prisma/client";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function EditChatbotPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const [chatbotname, setChatbotname] = useState<string>("");
  const [characteristics, setCharacteristics] = useState<
    ChatbotCharacteristic[]
  >([]);
  const [newCharacteristic, setNewCharacteristic] = useState<string>("");

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const bot = await GetChatbotById(id);
        if (bot) {
          setChatbotname(bot.name);
          setCharacteristics(bot.characteristics);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatbot();
  }, [id]);

  useEffect(() => {
    const url = `${BASE_URL}/agent/${id}`;
    setUrl(url);
  }, [id]);

  const addCharacteristic = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newCharacteristic.trim()) return;

    try {
      const response = await fetch("/api/newCharacteristic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatbotId: id, content: newCharacteristic }),
      });

      if (response.ok) {
        const { characteristic } = await response.json();
        setCharacteristics([...characteristics, characteristic]);
        setNewCharacteristic("");
      } else {
        console.error("Failed to add characteristic");
      }
    } catch (error) {
      console.error("Error adding characteristic:", error);
    }
  };

  return (
    <div className="px-0 md:p-10 m-2 ">
      <div className="md:sticky md:top-0 z-50 mb-2 sm:max-w-sm ml-auto space-y-2 border-2 p-5 rounded-lg bg-white ">
        <h2 className="text-sm text-black font-bold">Link</h2>
        <p className="text-sm text-black italic ">
          Share the link below to access agent
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Link href={url} className="cursor-pointer hover:opacity-50">
          <Input
            value={url}
            readOnly
            className="cursor-pointer text-black bg-white"
          />
        </Link>
        <Button
          size={"sm"}
          className="px-3"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast({
              title: "Copied to Clipboard",
            });
          }}
        >
          <span className="sr-only">Copy</span>
          <ClipboardCopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <section className="relative mt-5 bg-white p-5 rounded-lg">
        <Button
          variant={"destructive"}
          className="absolute top-2 right-2 mb-2 h-8 w-2"
          // onClick={()=> handleDelete(id)}
        >
          x
        </Button>
        <div className="text-black flex space-x-4">
          <Avatar seed={chatbotname} />
          <form className="flex space-x-4">
            <Input
              value={chatbotname}
              onChange={(e) => setChatbotname(e.target.value)}
              className="w-full border text-xl font-bold"
            />
            <Button type="submit" disabled={!chatbotname}>
              Update
            </Button>
          </form>
        </div>
        <h1 className="text-xl font-bold mt-10">
          What your AI agent knows currently
        </h1>
        <p>
          This agent is equipped with the following information to assist you in
          your conversation about this car
        </p>
        <div className="bg-slate-400 space-y-4 space-x-4 p-4 rounded-md">
          <form className="flex space-x-4" onClick={addCharacteristic}>
            <Textarea
              placeholder="Example: If a customer asks the price of this unit, negotiate between 2.5 million to 2.4 million, try to settle in the middle"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
              className="text-black bg-white"
            />
            <Button disabled={!newCharacteristic} type="submit">
              Add Characteristic
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-5 text-black">
            <li>1 2 3</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
