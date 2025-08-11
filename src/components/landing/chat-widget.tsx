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
            <Button 
                size="icon" 
                className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-110 active:scale-95" 
                onClick={toggleChat}
                style={{
                    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
                }}
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
                <span className="sr-only">{isOpen ? 'Close Chat' : 'Open Chat'}</span>
            </Button>
        </div>
    );
};

export default ChatWidget;
