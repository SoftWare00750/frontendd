import type { ReportStatus } from "../../data/Report";

interface Props {
  status: ReportStatus;
}

export default function StatusBadge({ status }: Props) {
  const styles = {
    Open: "bg-red-100 text-red-600",
    Reviewed: "bg-amber-100 text-amber-600",
    Resolved: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}
