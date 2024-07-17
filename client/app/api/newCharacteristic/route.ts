import { prismadb } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { chatbotId, content } = await req.json();

    const chatbot = await prismadb.chatbot.findUnique({
      where: {
        id: chatbotId,

      },
    });

    if (!chatbot) {
      throw new Error("No chatbot found");
    }

    const result = await prismadb.chatbotCharacteristic.create({
      data: {
        chatbotId: chatbotId,
        content: content,
      },
    });

    return new NextResponse(JSON.stringify({ result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in AddCharacteristics:", error);
    return new NextResponse(JSON.stringify({ message: "Error in Action" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
