import { AlertTriangle, ChevronRight } from "lucide-react";
import type { Report } from "../../data/Report";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";

interface Props {
  report: Report;
}

export default function ReportCard({ report }: Props) {
  return (
    <Link to={`/agent/reports/details/${report.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-start justify-between hover:shadow-sm transition cursor-pointer mb-4">
        <div className="flex gap-4">
          <div className="mt-1">
            <AlertTriangle className="text-red-500" size={18} />
          </div>

          <div >
            <h3 className="font-semibold text-gray-800">{report.title}</h3>

            <p className="text-sm text-gray-500">{report.property}</p>

            <p className="text-sm text-gray-400 mt-1 max-w-lg line-clamp-1">
              {report.description}
            </p>

            <p className="text-xs text-gray-400 mt-2">{report.date }</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={report.status} />
          <ChevronRight className="text-gray-400" size={18} />
        </div>
      </div>
    </Link>
  );
}
