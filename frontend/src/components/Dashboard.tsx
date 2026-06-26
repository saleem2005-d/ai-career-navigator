import React, { useState } from 'react';

interface AnalysisResult {
  score: number;
  coreVectors: string[];
  remediationNodes: string[];
}

export const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExecute = () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        score: 88,
        coreVectors: ['Java', 'Spring Boot', 'Python', 'REST APIs', 'PostgreSQL', 'Docker', 'Git'],
        remediationNodes: [
          'Quantify project achievements using structural metrics (e.g., "optimized query performance by 20%").',
          'Incorporate target domain keywords relating to cloud containerization and backend systems.',
          'Expand on architectural contributions within teamwork environments to highlight problem-solving metrics.'
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20 text-base">
            🧭
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AI Career Navigator
            </h1>
            <p className="text-[10px] text-indigo-400/80 font-mono tracking-wider uppercase">Optimization Core</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <div className="text-xs font-semibold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 shadow-inner">
            Local Engine Active
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Management & Ingestion Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📁</span>
              <h2 className="text-base font-bold text-white">Profile Analyzer</h2>
            </div>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Upload your technical profile or engineering resume artifact below to execute automated metric parsing.
            </p>
            
            <div className="space-y-4">
              {/* Drag & Drop File Zone */}
              <label className="group flex flex-col items-center justify-center w-full h-40 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl cursor-pointer bg-slate-950/40 hover:bg-indigo-950/10 transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  {/* Embedded Icon Graphic */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 group-hover:bg-indigo-950/50 border border-slate-800 group-hover:border-indigo-500/30 flex items-center justify-center mb-3 text-xl transition-all duration-300 shadow-md">
                    📥
                  </div>
                  <p className="text-xs text-slate-300 font-semibold group-hover:text-indigo-400 transition-colors">
                    {file ? file.name : "Choose profile document"}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">PDF or DOCX extensions accepted</p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
              </label>

              {/* Functional Execution Trigger */}
              <button 
                onClick={handleExecute}
                disabled={!file || loading}
                className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-600 text-white font-bold text-xs tracking-wide uppercase py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/10 active:scale-[0.99] transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Parsing Structure...
                    </>
                  ) : (
                    'Execute Analytics Mapping'
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Data Matrix Display */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Loading Animation Placeholder */}
          {loading && (
            <div className="h-72 bg-slate-900/30 border border-slate-900 rounded-2xl flex flex-col items-center justify-center text-indigo-400 gap-3 shadow-xl">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-mono tracking-widest uppercase opacity-70">Running matrix computations...</p>
            </div>
          )}

          {/* Rendered Analysis Dashboard Components */}
          {!loading && result && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Analytical Row Block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Score Dial Component */}
                <div className="md:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">ATS Compatibility</span>
                  <div className="text-6xl font-black text-emerald-400 tracking-tight select-none drop-shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                    {result.score}<span className="text-lg text-slate-500 font-light">/100</span>
                  </div>
                  <span className="text-[10px] text-emerald-500/80 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono mt-3 border border-emerald-500/20">
                    Optimized Profile
                  </span>
                </div>

                {/* Vectors & Tags Matrix */}
                <div className="md:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Extracted Core Vectors</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.coreVectors.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 font-medium text-xs rounded-xl shadow-sm transition-all cursor-default">
                        ⚡ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roadmap Remediation Framework */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  Remediation Development Nodes
                </h3>
                <div className="space-y-3">
                  {result.remediationNodes.map((node, index) => (
                    <div key={index} className="flex gap-4 items-start text-xs leading-relaxed text-slate-300 border border-slate-800/60 bg-slate-950/40 rounded-xl p-4 hover:bg-slate-950 transition-colors">
                      <span className="font-mono text-cyan-400 font-bold bg-slate-900 border border-slate-800 px-2 py-1 rounded-md shadow-inner">
                        NODE_0{index + 1}
                      </span>
                      <p className="pt-0.5">{node}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Empty Default Landing State */}
          {!loading && !result && (
            <div className="h-80 bg-slate-900/20 border border-slate-900 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
              <div className="text-4xl mb-3 opacity-40">📊</div>
              <h3 className="text-sm font-semibold text-slate-400">System Dashboard Awaiting Stream</h3>
              <p className="text-xs text-slate-600 max-w-xs mt-1 leading-relaxed">
                Provide a candidate document inside the profile ingestion portal to load the analytics evaluation matrix view.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};