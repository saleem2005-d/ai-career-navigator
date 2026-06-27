import React, { useState } from 'react';

interface AnalysisResult {
  score: number;
  coreVectors: string[];
  remediationNodes: string[];
}

export const Dashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'analyzer' | 'skills' | 'interview'>('analyzer');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

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
    }, 1200);
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Dynamic Background Gradients */}
      {darkMode && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </>
      )}

      {/* Modern Top Header Banner */}
      <header className={`border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md ${darkMode ? 'border-slate-800/80 bg-slate-950/70' : 'border-slate-200 bg-white/70'}`}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20 text-base">
            🧭
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight">AI Career Navigator</h1>
            <p className="text-[10px] font-mono tracking-wider uppercase text-indigo-500 font-bold">Enterprise Suite v2.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border text-sm transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-100'}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <div className={`text-xs font-semibold px-3 py-1.5 rounded-xl border shadow-inner flex items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Cloud Engine Online
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* SIDEBAR NAVIGATION MODULE */}
        <aside className="lg:col-span-3 space-y-3">
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-50 px-3">Navigation Matrix</p>
          
          <button 
            onClick={() => setCurrentTab('analyzer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${currentTab === 'analyzer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-200 text-slate-600')}`}
          >
            <span>📊</span> Profile & Resume Analyzer
          </button>

          <button 
            onClick={() => setCurrentTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${currentTab === 'skills' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-200 text-slate-600')}`}
          >
            <span>⚡</span> Skill Gap Tracker
          </button>

          <button 
            onClick={() => setCurrentTab('interview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${currentTab === 'interview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-200 text-slate-600')}`}
          >
            <span>🧠</span> Interview Prep Arena
          </button>
        </aside>

        {/* MAIN WORKSPACE CONTENT CONTAINER */}
        <section className="lg:col-span-9">
          
          {/* TAB 1: CORE RESUME ANALYZER */}
          {currentTab === 'analyzer' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 border rounded-2xl shadow-xl backdrop-blur-md ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h2 className="text-sm font-bold flex items-center gap-2 mb-2">📁 File Ingestion</h2>
                <p className="text-[11px] opacity-60 mb-4">Provide a candidate profile for metric parsing execution.</p>
                <label className={`group flex flex-col items-center justify-center w-full h-36 border border-dashed rounded-xl cursor-pointer transition-all ${darkMode ? 'border-slate-800 bg-slate-950/40 hover:bg-indigo-950/10' : 'border-slate-300 bg-slate-100 hover:bg-indigo-50'}`}>
                  <div className="text-center p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-lg mx-auto bg-slate-500/10">📥</div>
                    <p className="text-xs font-semibold">{file ? file.name : "Select Document"}</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
                </label>
                <button onClick={handleExecute} disabled={!file || loading} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white text-xs font-bold uppercase py-2.5 rounded-xl shadow-md">
                  {loading ? 'Processing...' : 'Run Analysis Matrix'}
                </button>
              </div>

              <div className="md:col-span-2 space-y-6">
                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className={`p-6 border rounded-2xl text-center relative overflow-hidden ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">ATS Score</span>
                        <div className="text-4xl font-black text-emerald-400 mt-1">{result.score}%</div>
                      </div>
                      <div className={`p-6 border rounded-2xl sm:col-span-2 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Extracted Core Vectors</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {result.coreVectors.map((v, i) => (
                            <span key={i} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-[10px] rounded-lg">⚡ {v}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`p-6 border rounded-2xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <h3 className="text-xs font-bold opacity-70 mb-3 uppercase tracking-widest">Remediation Framework Roadmap</h3>
                      {result.remediationNodes.map((node, idx) => (
                        <div key={idx} className="text-xs p-3 border rounded-xl mb-2 bg-slate-500/5 border-slate-500/10">{node}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`h-64 border border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 opacity-60 ${darkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-300 bg-white'}`}>
                    <p className="text-xs">Awaiting profile stream data inside ingestion sub-portal.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SKILL GAP METRIC MATRIX */}
          {currentTab === 'skills' && (
            <div className={`p-6 border rounded-2xl shadow-xl backdrop-blur-md ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h2 className="text-sm font-bold flex items-center gap-2 mb-2">⚡ Software Engineering Skill Gap Matrix</h2>
              <p className="text-xs opacity-60 mb-6">Real-time gap evaluation comparing your uploaded profile against industry target profiles.</p>
              
              <div className="space-y-4">
                {[
                  { skill: 'Backend Architectures (Spring Boot, REST APIs)', current: 90, status: 'Optimal' },
                  { skill: 'Database Systems & Data Modeling (PostgreSQL, SQL)', current: 75, status: 'Stable' },
                  { skill: 'Cloud Systems & Virtualization (Docker, AWS Containers)', current: 40, status: 'Critical Gap' },
                  { skill: 'Asynchronous Programming & Automation (Python Scripting)', current: 85, status: 'Optimal' }
                ].map((item, index) => (
                  <div key={index} className={`p-4 border rounded-xl ${darkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span>{item.skill}</span>
                      <span className={item.current < 50 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{item.status} ({item.current}%)</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${item.current < 50 ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-400'}`}
                        style={{ width: `${item.current}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INTERVIEW PREP ARENA */}
          {currentTab === 'interview' && (
            <div className={`p-6 border rounded-2xl shadow-xl backdrop-blur-md ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h2 className="text-sm font-bold flex items-center gap-2 mb-2">🧠 AI Interview Simulation Engine</h2>
              <p className="text-xs opacity-60 mb-6">Targeted mock assessment prompts calibrated specifically around your system technical profile.</p>

              <div className="space-y-4">
                <div className={`p-4 border rounded-xl border-l-4 border-l-indigo-500 ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-mono tracking-wider bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded-md uppercase">Technical / Architecture</span>
                  <h3 className="text-xs font-bold text-white mt-1.5 mb-1">Explain the Lifecycle of a Spring Boot Request inside a REST Architecture.</h3>
                  <p className="text-[11px] opacity-60">How does the DispatcherServlet intercept incoming streams, map them to specific Controller packages, and safely isolate resource layers?</p>
                </div>

                <div className={`p-4 border rounded-xl border-l-4 border-l-cyan-400 ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-mono tracking-wider bg-cyan-500/10 text-cyan-400 font-bold px-2 py-0.5 rounded-md uppercase">Infrastructure / Operations</span>
                  <h3 className="text-xs font-bold text-white mt-1.5 mb-1">What are the advantages of containerizing your Java backend architecture inside Docker?</h3>
                  <p className="text-[11px] opacity-60">Describe how isolating dependencies prevents environment variables from clashing across isolated ports during multi-tenant deployments.</p>
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};