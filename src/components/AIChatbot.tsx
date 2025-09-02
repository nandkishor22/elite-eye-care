import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AIChatbot = ({ isOpen, onToggle }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI eye care assistant. I can help you with information about our services, symptoms, appointment booking, and general eye health questions. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Book Appointment",
    "Services Offered",
    "Emergency Care",
    "Insurance Coverage",
    "LASIK Information",
    "Eye Exam Details",
    "Cataract Surgery",
    "Glaucoma Treatment",
    "Pediatric Eye Care",
    "Contact Lens Fitting",
    "Diabetic Eye Screening",
    "Dry Eye Treatment",
    "Office Hours",
    "Location & Directions",
    "Pre-Surgery Instructions",
    "Vision Therapy",
    "Retinal Specialist",
    "Eye Safety Tips",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Gemini API integration
  const getAIResponse = async (userQuery: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: userQuery }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I apologize, but I'm having trouble responding right now. Please try again."
      );
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm sorry, I'm experiencing technical difficulties. Please contact our office.";
    }
  };

  const handleSendMessage = async (message: string) => {
    if (message.trim() === "" || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const botResponse = await getAIResponse(message);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-floating hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </Button>
    );
  }

  return (
    <div className="chatbot-container animate-slide-up flex flex-col h-[550px] w-96 max-w-full bg-background rounded-2xl shadow-xl fixed bottom-6 right-6 z-50">
      {/* Header */}
      <div className="chatbot-header flex items-center justify-between p-3 border-b bg-primary text-primary-foreground rounded-t-2xl">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <div>
            <h3 className="font-semibold">AI Eye Care Assistant</h3>
            <p className="text-xs opacity-90">Powered by Gemini AI</p>
          </div>
        </div>
        <Button
          onClick={onToggle}
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-white/20 rounded-full w-8 h-8 p-0"
          title="Close Chat"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages with scroll */}
      <div className="flex-1 p-4 space-y-4 bg-background/50 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            } animate-fade-left`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot
                  ? "bg-accent text-accent-foreground"
                  : "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.isBot ? (
                  <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fade-left">
            <div className="bg-accent text-accent-foreground p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="p-3 border-t bg-background/80">
          <p className="text-xs text-muted-foreground mb-2">Common questions:</p>
          <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2 justify-start text-left"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-background rounded-b-2xl">
        <div className="flex gap-2 mb-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about our services..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || inputValue.trim() === ""}
            size="sm"
            className="bg-primary hover:bg-primary-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={onToggle}
            variant="outline"
            size="sm"
            className="text-xs px-3 py-1 h-6 text-muted-foreground hover:text-foreground"
          >
            Close Chat
          </Button>
        </div>
      </div>
    </div>
  );
};
