import { NextRequest } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { prismadb } from "@/lib/prisma";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI,
});

export async function POST(req: NextRequest) {
    const {chat_session, chatbot_id, content, name} = await req.json() 
    
  try {
    //1.  FETCH CHATBOT CHARACTERISTICS (BY ID)
    const characteristics = await prismadb.chatbotCharacteristic.findMany({
      where: {
        chatbotId: chatbot_id
      }
    })

    //2. FETCH PREVIOUS MESSAGES BY (CHAT SESSION ID)


    //3. Combine characteristics into a system prompt and format them
    
    //4. CHATGPT FUNCTION HERE 

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            name: "system",
            content: `you are Car Purchase Assistant Agent for Kai and Karo Car yard talking to ${name}. 
            If a question not related to the scope , inform the user they are only allowed to ask car relevant questions. Here are elemnts you should expect this potential buyer to ask about [system prompt from above]
            `
        },
        // ...formatedmessages,

        {
            role: "user",
            name: name,
            content: content
        }
    ]

    // 5. SEND THE MESSAGES TO CHAT GPT FOR COMPLETION
    const airesponse = await openai.chat.completions.create({messages: messages, model: "gpt-4"})
    const response = airesponse?.choices?.[0]?.message?.content?.trim()

    // 6. SAVE USERS MESSAGE IN THE DB

    // 7. SAVE THE AI'S RESPONSE

    // 8. SEND AI'S RESPONSE BACK TO USER

  } catch (error) {
    console.log(error);
  }
}
