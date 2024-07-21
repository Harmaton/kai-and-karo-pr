import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { prismadb } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

export async function POST(req: NextRequest) {
  const { chat_session_id, chatbot_id, content, name } = await req.json();

  try {
    //1.  FETCH CHATBOT CHARACTERISTICS (BY ID)
    const botcharacteristics = await prismadb.chatbotCharacteristic.findMany({
      where: {
        chatbotId: chatbot_id,
      },
      select: {
        content: true,
      },
    });

    //2. FETCH PREVIOUS MESSAGES BY (CHAT SESSION ID)
    const msgs = prismadb.message.findMany({
      where: {
        chatSessionId: chat_session_id,
      },
    });

    //3. Combine characteristics into a system prompt and format them
    const formatedPreviousMessages: ChatCompletionMessageParam[] = (
      await msgs
    ).map((msg) => ({
      role: msg.sender === "ai" ? "system" : "user",
      name: msg.sender === "ai" ? "system" : name,
      content: msg.content,
    }));

    //4. COMBINE CHARACTRISTICS INTO A SYSTE PROMPT
    const sysPrompt = botcharacteristics.map((c) => c.content).join("+");

    //5. CHATGPT FUNCTION HERE
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        name: "system",
        content: `you are Car Purchase Assistant Agent for Kai and Karo Car yard talking to ${name}. 
            If a question not related to the scope , inform the user they are only allowed to ask car relevant questions. Here are elemnts you should expect this potential buyer to ask about ${sysPrompt}
            `,
      },
      ...formatedPreviousMessages,

      {
        role: "user",
        name: name,
        content: content,
      },
    ];

    // 5. SEND THE MESSAGES TO CHAT GPT FOR COMPLETION
    const airesponse = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-4o",
    });
    const response = airesponse?.choices?.[0]?.message?.content?.trim();

    if (!response) {
      return NextResponse.json(
        { error: "Failed to Generate AI response" },
        { status: 500 }
      );
    }

    // 6. SAVE USERS MESSAGE IN THE DB
    await prismadb.message.create({
      data: {
        chatSessionId: chat_session_id,
        content: content,
        sender: "user",
      },
    });

    // 7. SAVE THE AI'S RESPONSE
    const aiMsgResponse = await prismadb.message.create({
      data: {
        chatSessionId: chat_session_id,
        content: response,
        sender: "ai",
      },
    });

    // 8. SEND AI'S RESPONSE BACK TO USER
    return NextResponse.json({
      id: aiMsgResponse.id,
      content: response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error Generating RESPONSE" },
      { status: 500 }
    );
  }
}
