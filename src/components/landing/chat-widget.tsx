"use client"
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const ChatWidget = () => {
    return (
        <div className="fixed bottom-8 right-8 z-50">
            <Button size="icon" className="w-14 h-14 rounded-full shadow-lg">
                <MessageSquare className="w-7 h-7" />
                <span className="sr-only">Open Chat</span>
            </Button>
        </div>
    );
};

export default ChatWidget;