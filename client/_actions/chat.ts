'use server'
import { prismadb } from "@/lib/prisma";
import { GetChatSessionMessagesResponse } from "@/types/types";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function startNewChat(guestname: string, chatbotid: string, email: string) {
  try {
    // 1. Create a New Guest Entry if not exist or update name if exists
    const user = await prismadb.guest.upsert({
      where: { email: email },
      update: { name: guestname, email},
      create: { 
        name: guestname,
        email: email,
        clerkid: ''
         // or any logic to determine if the user should be admin
      },
    });

    // 2. Initialize a new Chat Session
    const chatSession = await prismadb.chatSession.create({
      data: {
        chatbotId: chatbotid,
        guestId: user.id,
      },
    });

    // 3. Insert Initial Message -> Welcome Aboard newguest.name /n What do you want to know about {chatbot.name}
    const chatbot = await prismadb.chatbot.findUnique({
      where: { id: chatbotid },
    });

    if (chatbot) {
      await prismadb.message.create({
        data: {
          chatSessionId: chatSession.id,
          content: `Welcome aboard ${user.name}!\nWhat do you want to know about ${chatbot.name}?`,
          sender: "ai",
        },
      });
    }

    // return chat session id in the end
    return chatSession.id;

  } catch (error) {
    console.log("Error Creating New Chat", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

export async function GetChatMessagesByChatSessionId(id: string) {
  try {
    const chatSession = await prismadb.chatSession.findUnique({
      where: { id },
      include: {
        messages: true,
        chatbot: true,
        guest: true,
      },
    });

    if (!chatSession) {
      throw new Error(`Chat session with id ${id} not found`);
    }

    const response: GetChatSessionMessagesResponse = {
      chat_sessions: {
        id: chatSession.id,
        created_at: chatSession.createdAt.toISOString(),
        messages: chatSession.messages.map((message) => ({
          id: message.id,
          created_at: message.createdAt.toISOString(),
          content: message.content,
          sender: message.sender,
          chat_session_id: message.chatSessionId, // Adding the missing field
        })),
        chatbots: {
          name: chatSession.chatbot.name,
        },
        guests: {
          name: chatSession.guest?.name || "",
          email: chatSession.guest?.email || "",
        },
      },
    };

    return response;

  } catch (error) {
    console.log("Error Getting Chat Messages By Chat Session Id", error);
  }
}
