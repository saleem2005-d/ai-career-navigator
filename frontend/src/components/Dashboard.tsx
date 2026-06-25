import React, { useState } from 'react';

interface AnalysisResult {
  score: number;
  coreVectors: string[];
  remediationNodes: string[];
}

export const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>({
    score: 85,
    coreVectors: ['Java', 'Spring Boot', 'Python', 'SQL', 'REST APIs', 'Git'],
    remediationNodes: [
      'Quantify your project metrics using business results instead of task items.',
      'Add missing target keywords related to Cloud Engineering or microservices optimization systems.',
      'Expand on your internship achievements to highlight engineering problem-solving.'
    ]
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExecute = () => {
    if (!file) return;
    setLoading(true);
    // Simulating API loading state
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">AI</div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">AI Career Navigator</h1>
        </div>
        <div className="text-sm font-medium bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300">
          User Portal
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Upload */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-2 text-white">Ingest Profile Document</h2>
            <p className="text-xs text-slate-400 mb-4">Upload your profile artifact in PDF or DOCX format for parsing matrix execution.</p>
            
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-slate-800/30 transition-all duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <svg className="w-8 h-8 mb-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  <p className="text-xs text-slate-300 font-medium">{file ? file.name : "Select Resume File"}</p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
              </label>

              <button 
                onClick={handleExecute}
                disabled={!file || loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150"
              >
                {loading ? 'Executing Mapping...' : 'Execute Structural Mapping'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics Matrix */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Score & Core Vectors row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ATS Score</span>
                  <div className="text-5xl font-extrabold text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.15)]">{result.score}</div>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">Calibrated Profile</span>
                </div>

                <div className="sm:col-span-3 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Identified Core Vector Components</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.coreVectors.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold text-xs rounded-lg shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roadmap Nodes Card */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  Remediation Roadmap Nodes
                </h3>
                <ul className="space-y-3">
                  {result.remediationNodes.map((node, index) => (
                    <li key={index} className="flex gap-3 text-sm text-slate-300 border border-slate-700/40 bg-slate-900/30 rounded-xl p-3.5">
                      <span className="font-bold text-cyan-400 select-none">0{index + 1}.</span>
                      <span>{node}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};