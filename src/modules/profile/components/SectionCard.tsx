import type React from "react";

export default function SectionCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-2xl p-0 shadow-sm border border-orange-100 overflow-hidden">
      {children}
    </div>
  );
}
