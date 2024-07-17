"use server";

import { prismadb } from "@/lib/prisma";

export async function GetSesionMessages(id: string) {
  try {
    const sessionMessages = await prismadb.chatSession.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: true,
        chatbot: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!sessionMessages) {
      return null;
    }

    // Map the messages to match the Message type
    const messages = sessionMessages.messages.map((message) => ({
      id: message.id,
      chat_session_id: message.chatSessionId,
      content: message.content,
      created_at: message.createdAt.toDateString(),
      sender: message.sender,
    }));

    return {
      chatbot: sessionMessages.chatbot,
      messages,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
