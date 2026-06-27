import {
  LayoutDashboard,
  FileText,
  SearchCheck,
  BrainCircuit,
  Briefcase,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FileText, label: "Resume AI" },
  { icon: SearchCheck, label: "ATS Scanner" },
  { icon: BrainCircuit, label: "Skill Gap" },
  { icon: Briefcase, label: "Job Match" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          AI Career
        </h1>
        <p className="text-sm text-slate-400">
          Navigator
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Card */}
      <div className="m-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <h3 className="font-semibold text-white">
          AI Premium
        </h3>
        <p className="text-xs text-blue-100 mt-2">
          Unlock advanced resume analysis, ATS optimization and interview coaching.
        </p>

        <button className="mt-4 w-full rounded-lg bg-white py-2 font-semibold text-blue-700 hover:bg-slate-100">
          Upgrade
        </button>
      </div>
    </aside>
  );
}