import { prismadb } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { id } = await req.json();

  try {
    const chatbot = await prismadb.chatbot.findUnique({
      where: { id: id as string },
    });
    if (chatbot) {
      return NextResponse.json(chatbot);
    } else {
      return NextResponse.json({ error: "Chatbot not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
