"use server";

import { prismadb } from "@/lib/prisma";
import { Chatbot } from "@/types/types";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function CreateChatbot(name: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const bot = await prismadb.chatbot.create({
      data: {
        name: name,
        clerkUserId: userId,
      },
    });
    return { bot };
  } catch (error) {
    console.error("Error in CreateChatbot:", error);
    return { message: "Error in Action" };
  }
}

export async function GetChatbotById(id: string) {
  try {
    const bot = await prismadb.chatbot.findUnique({
      where: {
        id: id,
      },
      include: { characteristics: true },
    });
    return bot;
  } catch (error) {
    console.log(error);
  }
}

export async function GetChatbotItem(id: string) {
  try {
    const bot = await prismadb.chatbot.findUnique({
      where: {
        id: id,
      },
    });
    return bot;
  } catch (error) {
    console.log(error);
  }
}

export async function GetChatBotSByUser() {
  try {
    const clerkuser = await currentUser();
    if (clerkuser) {
      const agents = await prismadb.chatbot.findMany({
        where: {
          clerkUserId: clerkuser.id,
        },
        include: {
          characteristics: true,
        },
      });
      return agents;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function GetUserChatbotSessions() {
  try {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const user = await prismadb.guest.findUnique({
        where: {
          email: clerkUser.emailAddresses[0].emailAddress,
        },
      });
      if (user) {
        const chatbots = await prismadb.chatbot.findMany({
          where: {
            clerkUserId: clerkUser.id
          }, include: {
            sessions: true
          }
        });
        return chatbots;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
