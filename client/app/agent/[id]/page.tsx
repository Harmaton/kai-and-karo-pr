"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {  Message } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GetChatMessagesByChatSessionId, startNewChat } from "@/_actions/chat";
import Avatar from "@/components/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Messages from "@/components/Messages";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GetChatbotById, GetChatbotItem } from "@/_actions/agent";
import { Chatbot } from "@prisma/client";

const formSchema = z.object({
  message: z.string().min(2).max(50),
});

export default function ChatPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('')
  const [isopen, setIsOpen] = useState(true);
  const [chatid, setChatId] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatbot, setChatBot] = useState<Chatbot>()

  useEffect(()=> {
    async function getChatbot(){
        const chatbot = await GetChatbotItem(id)
        if(chatbot){
            setChatBot(chatbot)
        }
    }
    getChatbot()
  }, [id])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { message: formMessage } = values;
    const message = formMessage;
    form.reset();

    if (!name) {
      setIsOpen(true);
      setLoading(true);
      return;
    }

    if (!message.trim()) {
      return;
    }

    // Optimistically update the UI with the user's message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      created_at: new Date().toISOString(),
      chat_session_id: chatid,
      sender: "user",
    };

    // ... And show loading state for AI response
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Thinking...",
      created_at: new Date().toISOString(),
      chat_session_id: chatid,
      sender: "ai",
    };

    setMessages((previousmessages) => [
      ...previousmessages,
      userMessage,
      loadingMessage,
    ]);

    const response = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        chat_session_id: chatid,
        chatbot_id: id,
        content: message,
      }),
    });

    try {
      // handle the response here
    } catch (error) {
      // handle errors here
      console.log(error);
    }
  };

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const chatId = await startNewChat(name, id, email);

    setChatId(chatId);
    setLoading(false);
    setIsOpen(false);
  };

  useEffect(() => {
    async function getMessages() {
      const msgs = await GetChatMessagesByChatSessionId(id);
      if (msgs) {
        setMessages(msgs.chat_sessions.messages);
      }
    }
    getMessages();
  }, [id]);
  return (
    <div className="w-full flex bg-gray-100">
      <Dialog open={isopen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425">
          <form className="flex-1 " onSubmit={handleSubmitInfo}>
            <DialogHeader>
              <DialogTitle>You are Engaging an AI Agent</DialogTitle>
              <DialogDescription>What can I call you ?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right"></Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="your name ..."
                  className="col-span-4 text-gray-800"
                />
                 <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email..."
                  className="col-span-4 text-gray-800"
                />
                <DialogFooter>
                  <Button type="submit" disabled={!name} className="">
                    {!loading ? "Continue" : "Loading ..."}{" "}
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
        <div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-4">
         { chatbot && <Avatar
            seed={chatbot.name!}
            className="h-12 w-12 bg-white rounded-full border-2 border-white"
          />}
          <div>
           { chatbot && <h1 className="truncate text-lg">{chatbot.name}</h1>}
            <p className="text-sm text-gray-300">Typically replies Instantly</p>
          </div>
        </div>

        { chatbot &&  <Messages messages={messages} chatbotname={chatbot?.name} /> }

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex items-start sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type a message..."
                      {...field}
                      className="p-8 text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-full">
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
