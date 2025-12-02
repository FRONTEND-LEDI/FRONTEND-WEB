import type { MetricPeriod } from "../../../../types/metrics";

const PeriodSelector = ({
  period,
  setPeriod,
}: {
  period: MetricPeriod;
  setPeriod: (p: MetricPeriod) => void;
}) => {
  const periods: { value: MetricPeriod; label: string }[] = [
    { value: "day", label: "Día" },
    { value: "month", label: "Mes" },
    { value: "year", label: "Año" },
  ];

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => setPeriod(p.value)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
            period === p.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
