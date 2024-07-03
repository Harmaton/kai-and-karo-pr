"use server";

import { prismadb } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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
