import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PeriodSelector from "./PeriodSelector";
import CustomBarChart from "./CustomBarChart";
import { useAuth } from "../../../../context/AuthContext";
import type { MetricPeriod, MetricItem } from "../../../../types/metrics";

const MetricCard = ({
  title,
  icon: Icon,
  queryKeyBase,
  fetcher,
  colorClass,
  iconBgClass,
  iconColorClass,
}: {
  title: string;
  icon: React.ComponentType<any>;
  queryKeyBase: string;
  fetcher: (
    period: MetricPeriod,
    token: string | null
  ) => Promise<MetricItem[]>;
  colorClass: string;
  iconBgClass: string;
  iconColorClass: string;
}) => {
  const { token } = useAuth();
  const [period, setPeriod] = useState<MetricPeriod>("month");

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeyBase, period],
    queryFn: () => fetcher(period, token),
    staleTime: 10000,
    refetchInterval: 10000, // Actualizar cada 10 segundos
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${iconColorClass}`} />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <PeriodSelector period={period} setPeriod={setPeriod} />
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : isError ? (
          <div className="h-48 flex items-center justify-center text-red-500 text-sm">
            Error al cargar datos
          </div>
        ) : (
          <CustomBarChart data={data || []} colorClass={colorClass} />
        )}
      </div>
    </div>
  );
};

export default MetricCard;
