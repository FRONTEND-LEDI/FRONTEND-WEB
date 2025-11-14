import type React from "react";

export default function SectionCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-0 shadow-lg border border-orange-100 overflow-hidden">
      {children}
    </div>
  );
}
