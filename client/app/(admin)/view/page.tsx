import { GetUserChatbotSessions } from "@/_actions/agent";
import ChatbotSessions from "@/components/chatbotsessions";
import React from "react";

export default async function Page() {
  // GET USER CHATBOTS sessions (SORT IN ASC)
  const sessions = await GetUserChatbotSessions();
  return (
    <div className="flex-1 px-10">
      <h1 className="text-xl lg:text-3xl">Session reviews</h1>
      <p className="mb-5">
        Sessions from agents you created.
      </p>
      {sessions ? <ChatbotSessions chatbots={sessions} /> : <p>Loading...</p>}
    </div>
  );
}
