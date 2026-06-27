import {
  Bell,
  Search,
  Moon,
  UserCircle2
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5">

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3 w-[420px]">

        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search jobs, resumes, skills..."
          className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
        />

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">

        <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">

          <Bell />

        </button>

        <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">

          <Moon />

        </button>

        <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-2">

          <UserCircle2 size={34} />

          <div>

            <h3 className="font-semibold">
              Saleem
            </h3>

            <p className="text-xs text-slate-400">
              Software Engineer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}