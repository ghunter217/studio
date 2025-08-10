"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import ChatPopup from "./chat-popup";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isOpen && <ChatPopup onClose={toggleChat} />}
            <Button size="icon" className="w-14 h-14 rounded-full shadow-lg" onClick={toggleChat}>
                {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
                <span className="sr-only">{isOpen ? 'Close Chat' : 'Open Chat'}</span>
            </Button>
        </div>
    );
};

export default ChatWidget;
