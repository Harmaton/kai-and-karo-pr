"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Chatbot, ChatSession } from "@prisma/client";
import Avatar from "./avatar";
import Link from "next/link";
import ReactTimeago from 'react-timeago'

interface ChatbotWithSessions extends Chatbot {
  sessions: ChatSession[];
}

const ChatbotSessions = ({ chatbots }: { chatbots: ChatbotWithSessions[] }) => {
  const [sortedChatbots, setSortedChatbots] =
    useState<ChatbotWithSessions[]>(chatbots);

  useEffect(() => {
    const sortedArray = [...chatbots].sort(
      (a, b) => b.sessions.length - a.sessions.length
    );
    setSortedChatbots(sortedArray);
  }, [chatbots]);

  return (
    <div className="bg-white text-gray-800 rounded-md">
      <Accordion type="single" collapsible>
        {sortedChatbots.map((chatbot) => {
          const hasSessions = chatbot.sessions.length > 0;
          return (
            <AccordionItem
              key={chatbot.id}
              value={`item-${chatbot.id}`}
              className="px-10 py-5"
            >
              {hasSessions?( <>
              <AccordionTrigger>
                <div className="flex text-left items-center w-full">
                <Avatar seed={chatbot.name} className="w-10 h-10 mr-4" />
                <div className="flex flex-1 justify-between space-x-4">
                  <p>{chatbot.name}</p>
                  <p>{chatbot.sessions.length} Sessions</p>
                </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-5 p-5 bg-gray-100 rounded-md">
                {chatbot.sessions.map((session)=> (
                  <Link href={`/view/${session.id}`} key={session.id}>
                    <p>{session.guestId} Anonymous</p>
                    <p className="top-5 right-5 absolute text-sm ">
                    <ReactTimeago date={new Date(session.createdAt)} locale="en-US" timeStyle="twitter"/>
                    </p>
                  </Link>
                ))}
              </AccordionContent>
              </>) : (
                <p>
                 {chatbot.name} has (No sessions Yet)
                </p>
              )
                
              }
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ChatbotSessions;
