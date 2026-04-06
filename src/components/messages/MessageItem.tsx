import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  title: string;
  lastMessage: string;
  time: string;
  counter: number;
  image: string;
}

export default function MessageItem({
  id,
  name,
  title,
  lastMessage,
  time,
  counter,
  image
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/agent/chat/${id}`)}
      className="flex items-center p-3 gap-5 border-b border-gray-300 bg-white cursor-pointer "
    >
     <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
    <img
      src={image || "/default-avatar.png"}
      alt={name}
      className="w-full h-full object-cover"
    />
  </div>
      <div className="w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex justify-between">
          <p className="text-xs text-gray-400 truncate">{lastMessage}</p>
          <p className="text-xs text-white truncate bg-green-700  w-6 h-6 text-center pt-1 rounded-full items-center">{counter}</p>
        </div>
      </div>
    </div>
  );
}