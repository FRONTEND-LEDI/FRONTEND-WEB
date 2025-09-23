type Props = {
  progress: number;
};

export default function ProgressBadge({ progress }: Props) {
  const p = Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <div className="absolute top-3 left-3 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 shadow-lg">
      {p}%
    </div>
  );
}
