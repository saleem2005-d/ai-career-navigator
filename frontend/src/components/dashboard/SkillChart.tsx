import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Java", value: 35 },
  { name: "Spring Boot", value: 25 },
  { name: "SQL", value: 15 },
  { name: "React", value: 15 },
  { name: "Docker", value: 10 },
];

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#ef4444",
];

export default function SkillChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[420px]">

      <h2 className="text-xl font-bold mb-6">
        Skill Distribution
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}