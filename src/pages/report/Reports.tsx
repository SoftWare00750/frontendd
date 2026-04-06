import { useState } from "react";
import FilterTabs from "../../components/reportscomponents/FilterTabs";
import ReportCard from "../../components/reportscomponents/ReportCard";
import { reports } from "../../data/Report";
import { Lightbulb } from "lucide-react";

export default function Reports() {
  const [filter, setFilter] = useState("All");

  const filteredReports =
    filter === "All" ? reports : reports.filter((r) => r.status === filter);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg ">
          <h1 className="text-xl font-semibold text-green-800 px-5 mt-3">
            Reports & Complaints
          </h1>

          <p className="text-sm text-gray-400 mt-1 px-5">
            {reports.length} total reports
          </p>

          <div className="mt-4 border-t border-gray-200 pt-4 p-4">
            <FilterTabs active={filter} setActive={setFilter} />
          </div>
        </div>

        {/* Reports */}
        <div className="space-y-4 ">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        {/* Warning */}
        <div className="border border-blue-200 bg-blue-50 text-blue-600 text-sm rounded-md px-4 py-3">
          <Lightbulb className="inline-block mr-2" size={16} />
          Please Note that negative ratings and review might impact your trust
          score negatively.
        </div>
      </div>
    </div>
  );
}
