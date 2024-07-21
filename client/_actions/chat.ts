"use server";
import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function startNewChat(
  guestname: string,
  chatbotid: string,
  email: string
) {
  try {
    // 1. Create a New Guest Entry if not exist or update name if exists
    const user = await prismadb.guest.upsert({
      where: { email: email },
      update: { name: guestname, email },
      create: {
        name: guestname,
        email: email,
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
      const msg = await prismadb.message.create({
        data: {
          chatSessionId: chatSession.id,
          content: `Welcome aboard ${user.name}!\nWhat do you want to know about ${chatbot.name}?`,
          sender: "ai",
        },
      });

      console.log(msg);

      revalidatePath(`/agent/${chatbot.id}`);
    }

    // return chat session id in the end
    console.log("new chat session created");
    return chatSession.id;
  } catch (error) {
    console.log("Error Creating New Chat", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}
