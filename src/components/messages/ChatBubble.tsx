

interface Props {
  message: string;
  sender: "user" | "reply";
  time: string;
}

export default function ChatBubble({ message, sender, time }: Props) {
  const isUser = sender === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-start" : "justify-end"}`}
    >
      <div className="flex flex-col max-w-xs overflow-hidden">
        <div className="flex gap-2">
          {/* user image */}
          <div className="w-10 h-10 min-w-[40px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={isUser ? "https://i.pravatar.cc/40" : "https://i.pravatar.cc/40"}
              alt="avatar"
              className=" object-cover w-full h-full"
            />
          </div>
          <div
            className={`px-4 py-2 rounded-lg text-sm break-words max-w-[70%]
            ${
              isUser
                ? "bg-white border border-gray-300 text-wrap"
                : "bg-green-700 text-white text-wrap"
            }`}
          >
            {message}
          </div>
        </div>

        <span className="text-[10px] text-gray-400 mt-1 px-1">{time}</span>
      </div>
    </div>
  );
}
