const resumes = [
  {
    name: "Google_Resume.pdf",
    ats: 92,
    status: "Excellent",
    color: "text-green-400",
  },
  {
    name: "Amazon_Backend.pdf",
    ats: 87,
    status: "Good",
    color: "text-blue-400",
  },
  {
    name: "Microsoft_Resume.pdf",
    ats: 81,
    status: "Needs Improvement",
    color: "text-yellow-400",
  },
];

export default function RecentAnalysis() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold mb-6">
        Recent Resume Analysis
      </h2>

      <div className="space-y-4">

        {resumes.map((resume, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
          >

            <div>
              <h3 className="font-semibold text-white">
                {resume.name}
              </h3>

              <p className={`text-sm ${resume.color}`}>
                {resume.status}
              </p>
            </div>

            <div className="text-right">

              <h3 className="text-2xl font-bold text-blue-400">
                {resume.ats}
              </h3>

              <p className="text-slate-400 text-sm">
                ATS Score
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}