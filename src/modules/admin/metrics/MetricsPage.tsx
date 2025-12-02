import { BarChart3, BookOpen, Users, FileText, Bookmark } from "lucide-react";
import {
  getBookMetrics,
  getAuthorMetrics,
  getFormatMetrics,
  getSubgenreMetrics,
} from "../../../db/services/metrics";
import MetricCard from "./components/MetricCard";
import TopUsersList from "./components/TopUsersList";

// --- Main Page ---

export default function MetricsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Métricas</h1>
            <p className="text-gray-600">
              Análisis detallado del rendimiento de la biblioteca
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              title="Libros más leídos"
              icon={BookOpen}
              queryKeyBase="metrics-books"
              fetcher={getBookMetrics}
              colorClass="bg-blue-500"
              iconBgClass="bg-blue-100"
              iconColorClass="text-blue-600"
            />
            <MetricCard
              title="Autores populares"
              icon={Users}
              queryKeyBase="metrics-authors"
              fetcher={getAuthorMetrics}
              colorClass="bg-purple-500"
              iconBgClass="bg-purple-100"
              iconColorClass="text-purple-600"
            />
            <MetricCard
              title="Formatos preferidos"
              icon={FileText}
              queryKeyBase="metrics-formats"
              fetcher={getFormatMetrics}
              colorClass="bg-green-500"
              iconBgClass="bg-green-100"
              iconColorClass="text-green-600"
            />
            <MetricCard
              title="Subgéneros tendencia"
              icon={Bookmark}
              queryKeyBase="metrics-subgenres"
              fetcher={getSubgenreMetrics}
              colorClass="bg-pink-500"
              iconBgClass="bg-pink-100"
              iconColorClass="text-pink-600"
            />
          </div>
        </div>

        {/* Right Column: Top Users */}
        <div className="lg:col-span-1">
          <TopUsersList />
        </div>
      </div>
    </div>
  );
}
