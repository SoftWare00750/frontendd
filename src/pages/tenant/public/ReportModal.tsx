import { useState } from "react";

const REPORT_REASONS = [
  "Misleading information",
  "Unprofessional behavior",
  "Suspected fraud",
  "Harassment or discrimination",
  "Other",
];

export default function ReportModal({
  agentName,
  onClose,
}: {
  agentName: string;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setSelected(null);
      setDetails("");
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl border border-gray-200 shadow-lg max-h-[90vh] overflow-y-auto p-5 mt-20">
        {/* Header */}
        <h2 className="text-lg font-bold text-green-900">Report {agentName}</h2>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Help us maintain a safe community by reporting any concerns about this
          agent.
        </p>

        {/* Reasons */}
        <p className="text-xs font-semibold text-gray-900 mb-3">
          Reasons for report
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {REPORT_REASONS.map((reason) => {
            const isChosen = selected === reason;

            return (
              <label
                key={reason}
                onClick={() => setSelected(reason)}
                className="flex items-center gap-3 cursor-pointer text-xs text-gray-700"
              >
                {/* Custom radio */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition
                  ${isChosen ? "border-green-800" : "border-gray-300"}`}
                >
                  {isChosen && (
                    <div className="w-2 h-2 rounded-full bg-green-800" />
                  )}
                </div>
                {reason}
              </label>
            );
          })}
        </div>

        {/* Details */}
        <p className="text-xs font-semibold text-gray-900 mb-2">
          Additional details (optional)
        </p>

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Please provide any additional context..."
          rows={5}
          className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-800 resize-y mb-6"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selected || submitted}
            className={`flex-1 py-3 text-sm font-bold rounded-lg text-white transition
              ${
                submitted
                  ? "bg-red-700"
                  : !selected
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {submitted ? "Report Submitted ✓" : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
