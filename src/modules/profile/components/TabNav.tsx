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
  return (
    <div className="flex gap-1 bg-muted/50 px-2 pt-2">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            disabled={t.disabled}
            onClick={() => onChange(t.key)}
            className={[
              "px-4 py-2 rounded-t-xl text-sm border-b-2",
              isActive
                ? "bg-card text-gray-900 border-primary"
                : "text-gray-600 border-transparent hover:bg-white",
              t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            <span>{t.label}</span>
            {typeof t.badgeCount === "number" && (
              <span className="ml-2 text-xs rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">
                {t.badgeCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
