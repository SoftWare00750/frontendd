import { useParams } from "react-router-dom";
import { reports } from "../../data/Report";
import { AlertTriangle, Lightbulb } from "lucide-react";

export default function ReportDetails() {
  const { id } = useParams();

  const report = reports.find((r) => r.id === Number(id));

  if (!report) {
    return <div className="p-10">Report not found</div>;
  }
  // status style
   const getStatusStyle = (status: any) => {
  const s = status.toLowerCase();

  if (s === "open") return "bg-red-600 text-white border border-red-200";
  if (s === "reviewed") return "bg-yellow-600 text-white border border-yellow-200";
  if (s === "resolved") return "bg-green-600 text-white border border-green-200";

  return "bg-gray-100 text-gray-700";
};
// status message

  const getStatusMessage = (message: any) => {
  const m = message.toLowerCase();

  if (m === "Open") return "This report has just been submitted.";
  if (m === "Reviewed") return "This report is being reviewed by our team.";
  if (m === "Resolved") return "This report has been resolved successfully.";

  return "";
};

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4">
          
          <AlertTriangle className="text-red-500 mt-1" size={18} />

          <div className="flex-1">
            <h2 className="font-semibold text-gray-800">
              {report.title}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              {report.date}
            </p>

           <button className={`mt-3 text-xs px-3 py-1 rounded-full ${getStatusStyle(report.status)}`}>
  {report.status}
</button>
          </div>
        </div>

        {/* Property */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-400 mb-1">
            Reported Property
          </p>

          <p className="font-medium text-gray-800">
            {report.property}
          </p>
        </div>

        {/* Complaint Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-2">
            Complaint Details
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* Status Notice */}
        <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm  flex items-center gap-3 ${getStatusMessage(report.message)}`}>
          <Lightbulb size={18}/>
          {report.message}
        </div>

      </div>
    </div>
  );
}
