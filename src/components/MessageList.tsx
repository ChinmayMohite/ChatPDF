import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import remarkGfm from "remark-gfm"; // Import remark-gfm for GitHub Flavored Markdown
import { useEffect, useRef } from 'react';

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!messages) return <></>;

  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 py-2 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-400 text-slate-50": message.role === "user",
                  "bg-white text-gray-900": message.role === "assistant",
                }
              )}
            >
              {/* Render the message using ReactMarkdown with styling */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]} 
                className="prose prose-blue max-w-full" 
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
