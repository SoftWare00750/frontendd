import { useState } from "react";
import MessageItem from "../components/messages/MessageItem";
import { messages } from "../data/Messages";
import { Lightbulb, Search } from "lucide-react";
import StatusCard from "../components/agent/StatusCard";
import EmptyMessages from "../components/messages/EmptyMessages";

export default function MessagesPage() {
  const [search, setSearch] = useState("");

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" mx-auto min-h-screen">

      {/* Header */}
      <div className="  bg-white rounded-xl p-5">
        <div className="border-b border-gray-300 pb-5">
            <h2 className="text-lg font-medium text-green-700">Messages</h2>
            <p className="text-xs font-semibold "> 5 Conversations</p>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg mt-3 px-3 mb-5">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            placeholder="Search messages..."
            className="w-full p-2 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-5">
        <StatusCard
        icon={<Lightbulb />}
        className="text-blue-500 text-xs font-medium" 
        title="respond to clients enquiries between 24 hrs to maintain your trust score"
        />
      </div>

      {/* Messages */}
     <div className="bg-white mt-5">
  {filteredMessages.length === 0 ? (
    <EmptyMessages />
  ) : (
    filteredMessages.map((msg) => (
      <MessageItem key={msg.id} {...msg} />
    ))
  )}
</div>
    </div>
  );
}