import { Link } from "react-router-dom";
import { Video, Phone, MoreHorizontal, Send } from "lucide-react";
import ChatBubble from "../components/messages/ChatBubble";
import { useRef, useEffect, useState } from "react";

interface Message {
  sender: "user" | "reply";
  message: string;
  time: string;
}

export default function ChatPage() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // const { id } = useParams();

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState<Message[]>([
    {
      sender: "user",
      message: "Hello, I’m interested in the property.",
      time: "10:20 AM",
    },
    {
      sender: "reply",
      message: "Great! When would you like to visit?",
      time: "10:21 AM",
    },
  ]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      sender: "reply",
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChat([...chat, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-xs text-gray-500">{message}</p>
        </div>

        <div className="flex gap-4">
          <Link to="">
            <Video className="w-5 h-5 cursor-pointer" />
          </Link>
          <Link to="">
            <Phone className="w-5 h-5 cursor-pointer" />
          </Link>
          <Link to="">
            <MoreHorizontal className="w-5 h-5 cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {chat.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
            time={msg.time}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-300 flex gap-2">
        <textarea
          rows={1}
          cols={1}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey ) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-green-700 text-white px-4 rounded-lg flex items-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
