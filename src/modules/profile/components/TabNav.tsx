export type TabKey = "activity" | "progress" | "achievements" | "social";

type Tab = {
  key: TabKey;
  label: string;
  disabled?: boolean;
  badgeCount?: number;
};

export default function TabNav({
  active,
  onChange,
  tabs,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
  tabs: Tab[];
}) {
  // Reemplaza la función return con:
  return (
    <div className="flex gap-1 bg-gradient-to-r from-orange-50 to-amber-50 px-4 pt-3 border-b border-orange-100">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            disabled={t.disabled}
            onClick={() => onChange(t.key)}
            className={[
              "relative px-5 py-3 rounded-t-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-900",
              t.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            <span>{t.label}</span>
            {typeof t.badgeCount === "number" && (
              <span className="ml-2 text-xs rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 font-semibold">
                {t.badgeCount}
              </span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
