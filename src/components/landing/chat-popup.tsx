"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Loader2 } from "lucide-react";
import { handleChat } from "@/app/chat-actions";
import type { ChatInput } from "@/ai/schemas/chat";

interface ChatPopupProps {
  onClose: () => void;
}

type Message = ChatInput['history'][0];

const ChatPopup = ({ onClose }: ChatPopupProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput("");

    startTransition(async () => {
      const result = await handleChat(newMessages);
      if (result.success) {
        setMessages((prev) => [...prev, { role: 'model', content: result.message }]);
      } else {
        setMessages((prev) => [...prev, { role: 'model', content: result.message }]);
      }
    });
  };

  return (
    <div className="absolute bottom-20 right-0 w-80 animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
      <Card className="flex flex-col h-[28rem] shadow-2xl">
        <CardHeader className="flex flex-row items-center gap-3 bg-primary text-primary-foreground p-4">
            <Bot className="w-6 h-6" />
            <CardTitle className="text-lg">Postflow AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                            {message.role === 'model' && <Bot className="w-6 h-6 shrink-0" />}
                            <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                <p className="text-sm">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isPending && (
                        <div className="flex items-start gap-3">
                            <Bot className="w-6 h-6 shrink-0" />
                            <div className="p-3 rounded-lg bg-secondary">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..." 
                disabled={isPending}
            />
            <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPopup;
