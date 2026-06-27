import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:border-blue-500">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2
            className="text-4xl font-bold mt-4"
            style={{ color }}
          >
            {value}
          </h2>

        </div>

        <div
          className="p-4 rounded-xl"
          style={{ background: color + "20" }}
        >
          <Icon size={28} color={color} />
        </div>

      </div>

    </div>
  );
}