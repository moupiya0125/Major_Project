import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

// Define the types for our messages and options
interface ChatOption {
  label: string;
  value: string;
  type: 'link' | 'message';
}

interface Message {
  role: 'user' | 'bot';
  text: string;
  options?: ChatOption[];
}

const Chatbox = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, 100);
  };
  
  // This function sends a prompt to the backend and gets a response
  const sendMessage = useCallback(async (prompt: string) => {
    setIsLoading(true);
    
    // Add the user's message to the chat
    if (prompt !== 'initial_message') {
      const userMessage: Message = { role: 'user', text: prompt };
      setMessages(prev => [...prev, userMessage]);
    }
    
    try {
      const { data } = await api.post('/api/chat', { prompt });
      const botMessage: Message = { role: 'bot', text: data.response.text, options: data.response.options };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'bot', text: t('chatbot.error') };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chatbot error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  // This function handles what happens when a menu button is clicked
  const handleOptionClick = (option: ChatOption) => {
    if (option.type === 'link') {
      navigate(option.value); // Navigate to a new page
      setIsOpen(false);
    } else if (option.type === 'message') {
      sendMessage(option.value); // Send the option's value as a new message
    }
  };

  const fetchHistory = useCallback(async () => {
    if (user) {
      setIsHistoryLoading(true);
      try {
        const { data } = await api.get('/api/chat/history');
        if (data.length > 0) {
          // Mongoose returns plain objects, so we need to map them to our Message type
          const historyMessages = data.map((msg: any) => ({ role: msg.role, text: msg.content }));
          setMessages(historyMessages);
        } else {
          // If no history, send an initial message to get the welcome menu
          sendMessage('initial_message');
        }
      } catch (error) {
        console.error("Failed to fetch chat history", error);
        setMessages([{ role: 'bot', text: 'Error loading history.' }]);
      } finally {
        setIsHistoryLoading(false);
      }
    } else {
      // For guest users, just send the initial message for the welcome menu
      sendMessage('initial_message');
    }
  }, [user, sendMessage]);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    } else {
      // Clear messages when chat is closed to start fresh next time
      setMessages([]);
    }
  }, [isOpen, fetchHistory]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isHistoryLoading]);

  // Find the last message from the bot to display its options
  const lastBotMessageWithOptions = [...messages].reverse().find(m => m.role === 'bot' && m.options);

  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50" size="icon"><MessageCircle className="h-6 w-6" /></Button>}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl flex flex-col z-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
            <CardTitle className="text-lg">{t('chatbot.title')}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8"><X className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {isHistoryLoading ? (
                  <div className="space-y-4"><Skeleton className="h-10 w-3/4 rounded-lg bg-muted" /><Skeleton className="h-10 w-3/4 rounded-lg bg-primary ml-auto" /><Skeleton className="h-10 w-2/4 rounded-lg bg-muted" /></div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 break-words ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{message.text}</div>
                    </div>
                  ))
                )}
                {isLoading && !isHistoryLoading && <div className="flex justify-start"><div className="max-w-[80%] rounded-lg p-3 bg-muted text-muted-foreground">...</div></div>}
              </div>
            </ScrollArea>
            {/* RENDER THE MENU BUTTONS HERE */}
            {lastBotMessageWithOptions && !isLoading && (
              <div className="p-4 border-t flex flex-wrap gap-2 justify-center">
                {lastBotMessageWithOptions.options?.map((option, index) => (
                  <Button key={index} variant="outline" size="sm" onClick={() => handleOptionClick(option)}>
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={t('chatbot.placeholder')} className="flex-1" disabled={isLoading || isHistoryLoading} />
                <Button onClick={handleSend} size="icon" disabled={isLoading || isHistoryLoading}><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbox;