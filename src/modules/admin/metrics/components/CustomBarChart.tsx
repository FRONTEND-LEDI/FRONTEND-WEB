import { motion } from "motion/react";
import type { MetricItem } from "../../../../types/metrics";

const CustomBarChart = ({
  data,
  colorClass,
}: {
  data: MetricItem[];
  colorClass: string;
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
        No hay datos disponibles
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3 mt-4">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span className="font-medium truncate max-w-[70%]">
              {item.label}
            </span>
            <span className="font-bold">{item.value}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxVal) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-full rounded-full ${colorClass}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomBarChart;
