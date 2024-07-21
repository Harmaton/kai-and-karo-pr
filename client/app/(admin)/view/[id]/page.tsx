import { GetSesionMessages } from "@/_actions/session";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Messages from "./messages";

async function SessionIdPage({ params: { id } }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const sessionData = await GetSesionMessages(id);
  if (!sessionData) {
    return <div>Session not found or an error occurred</div>;
  }

  const { messages, chatbot } = sessionData;

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:test-3xl font-semibold mb-2">Session Review</h1>
      <p className="font-light text-xs"> Started on : {sessionData.messages[0].created_at} </p>

      <h2 className="font-light mt-2">
        Between : <span className="ml-2 italic mr-2"> {chatbot.name} </span>&{" "}
        <span className="font-bold ml-2 italicized"> Anonymous </span>
      </h2>
      <hr className="my-10" />
      <Messages messages={messages} chatbotname={chatbot.name} />
    </div>
  );
}

export default SessionIdPage;
