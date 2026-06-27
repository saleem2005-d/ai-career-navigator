import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

import UploadCard from "./dashboard/UploadCard";
import StatsCard from "./dashboard/StatsCard";
import SkillChart from "./dashboard/SkillChart";
import ResumeInsights from "./dashboard/ResumeInsights";
import RecentAnalysis from "./dashboard/RecentAnalysis";

import {
  Award,
  Briefcase,
  FileText,
  Target,
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        <div className="mt-10">

          <h1 className="text-5xl font-bold">
            Welcome Back, Saleem 👋
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Your AI Career Dashboard is ready.
          </p>

        </div>

        {/* First Row */}

        <div className="grid grid-cols-12 gap-6 mt-10">

          <div className="col-span-8">
            <UploadCard />
          </div>

          <div className="col-span-4">

            <div className="grid gap-6">

              <StatsCard
                title="ATS Score"
                value="92"
                color="#22c55e"
                icon={Award}
              />

              <StatsCard
                title="Resume Score"
                value="88"
                color="#3b82f6"
                icon={FileText}
              />

              <StatsCard
                title="Job Match"
                value="94%"
                color="#f59e0b"
                icon={Briefcase}
              />

              <StatsCard
                title="Interview Readiness"
                value="81%"
                color="#a855f7"
                icon={Target}
              />

            </div>

          </div>

        </div>

        {/* Second Row */}

        <div className="grid grid-cols-12 gap-6 mt-8">

          <div className="col-span-6">
            <SkillChart />
          </div>

          <div className="col-span-6">
            <ResumeInsights />
          </div>

        </div>

        {/* Third Row */}

        <div className="mt-8">

          <RecentAnalysis />

        </div>

      </main>

    </div>
  );
};