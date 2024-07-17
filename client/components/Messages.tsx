"use client";
import { Message } from "@/types/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Avatar from "./avatar";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Messages({
  messages,
  chatbotname,
}: {
  messages: Message[];
  chatbotname: string;
}) {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=> {
    if(ref.current){
      ref.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])
  const isReviewpage = path.includes("/view");
  return (
    <div className="flex flex-1 flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg ">
      {messages.map((msg) => {
        const issender = msg.sender !== "user";

        return (
          <div
            key={msg.id}
            className={`chat ${issender ? "chat-start" : "chat-end"} relative`}
          >
            {isReviewpage && (
              <p className="absolute -bottom-5 text-xs text-gray-800">
                Sent: {new Date(msg.created_at).toLocaleString()}
              </p>
            )}

            <div className={`chat-image avatar w-10 ${!issender && "-mr-4"}`}>
              {issender ? (
                <Avatar
                  seed={chatbotname}
                  className="h-12 w-12 bg-white rounded-full border-2 border-[#2991EE]"
                />
              ) : (
                <UserIcon className="text-[#2991EE]" />
              )}
            </div>
            <p
              className={`chat-bubble text-white ${
                issender
                  ? "chat-bubble-primary bg-[#4D7DFB]"
                  : "chat-bubble-secondarybg-gray-200 text-gray-700"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="break-words"
                components={{
                  ul: ({ node, ...props }) => (
                    <ul
                      {...props}
                      className="list-disc list-inside ml-5 mb-5"
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside ml-5 mb-5"
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-2xl font-bold mb-5" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-xl font-bold mb-5" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-lg font-bold mb-5" />
                  ),
                  table: ({ node, ...props }) => (
                    <table
                      {...props}
                      className="table-auto w-full border-separate border-2 rounded-sm border-spacing-4 border-white mb-5"
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="text-left underline" />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      {...props}
                      className={`whitespace-break-spaces mb-5 ${
                        msg.content === "Thinking ..." && "animate-pulse"
                      } ${issender ? "text-white" : "text-orange-500"}`}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="blank"
                      className="font-bold underline hover:text-blue-400"
                      rel="noopener noreferer"
                    />
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </p>
          </div>
        );
      })}
      <div>

      </div>
    </div>
  );
}
