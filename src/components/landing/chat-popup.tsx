"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";

interface ChatPopupProps {
  onClose: () => void;
}

const ChatPopup = ({ onClose }: ChatPopupProps) => {
  return (
    <div className="absolute bottom-20 right-0 w-80 animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
      <Card className="flex flex-col h-[28rem] shadow-2xl">
        <CardHeader className="flex flex-row items-center gap-3 bg-primary text-primary-foreground p-4">
            <Bot className="w-6 h-6" />
            <CardTitle className="text-lg">Postflow AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4">
            <ScrollArea className="h-full">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="p-3 rounded-lg bg-secondary">
                            <p className="text-sm">Hello! How can I help you today?</p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex w-full gap-2">
            <Input placeholder="Type your message..." />
            <Button>Send</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPopup;
