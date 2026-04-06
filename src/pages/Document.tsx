import { Lightbulb } from "lucide-react"
import { my_document } from "../data/DocumentVerification"
import StatusCard from "../components/agent/StatusCard"

export default function Document() {
  return (
    <div className=" bg-white drop-shadow-md px-8 py-6">
       <div className="w-full max-w-[1200px] space-y-2 pb-3">
        <h1 className="text-green-700 text-xl font-medium ">My Documents</h1>
        <p className="text-xs text-gray-400">View and manage your verification documents</p>
        </div> 
      <div className="grid grid-cols-1 gap-5 mt-5">
{my_document.map((document) => (
<div className="border border-gray-300 p-3 rounded-lg flex items-center gap-5" key={document.id}>
    <div className="bg-green-50 p-3 rounded-lg">{document.icon}</div>
<div className="flex flex-col w-full ">
    <div className="flex justify-between items-center">
      <h1 className="font-medium text-md">{document.title}</h1>
      <p className="text-xs bg-green-700 text-white py-0.5 rounded-full px-3">{document.verified}</p>
    </div>
    <p className="text-xs text-gray-400">{document.subtitle}</p>
    <span className="text-xs text-gray-400">{document.updatedat}</span>
</div>
</div>
))}
<StatusCard
icon={<Lightbulb />}
title="Keep your documents up to ate to maintain your verified status"/>
<button type="button" className="bg-green-700 text-xs font-medium text-white p-3 rounded-lg hover:bg-green-800 cursor-pointer transition-all duration-100">Save Changes</button>
      </div>
    </div>
  )
}
