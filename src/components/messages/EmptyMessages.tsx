import { MessageSquare } from "lucide-react";

export default function EmptyMessages() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
      <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />

      <h2 className="text-lg font-semibold text-gray-700">
        No Messages Yet
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        When tenants contact you about a listing, their messages will appear here.
      </p>
    </div>
  );
}