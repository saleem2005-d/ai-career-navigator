import React, { useState } from 'react';

interface AnalysisResult {
  score: number;
  coreVectors: string[];
  remediationNodes: string[];
}

export const Dashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'analyzer' | 'skills' | 'interview'>('skills'); // Set to default view to inspect instantly
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Live AI States
  const [apiKey, setApiKey] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [userPrompt, setUserPrompt] = useState<string>('Generate 3 tough backend interview questions about Spring Boot performance tuning.');

  // Chart Interactive Hover State
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

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

  const handleAskGemini = async () => {
    if (!apiKey) {
      alert('Please enter your Gemini API key in the configuration field to stream data.');
      return;
    }
    setAiLoading(true);
    setAiResponse('');

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }]
        })
      });

      const data = await response.json();
      const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response structure returned. Verify API key privileges.';
      setAiResponse(textOutput);
    } catch (error) {
      setAiResponse('Connection failed. Verify API key accuracy or network connectivity status.');
    } finally {
      setAiLoading(false);
    }
  };

  // Mock Telemetry Data Array for Analytics Charts
  const skillsData = [
    { label: 'Spring Boot', proficiency: 90, marketDemand: 95, color: '#6366f1' },
    { label: 'Python Core', proficiency: 85, marketDemand: 88, color: '#06b6d4' },
    { label: 'Databases (SQL)', proficiency: 75, marketDemand: 82, color: '#3b82f6' },
    { label: 'Docker/Infra', proficiency: 40, marketDemand: 78, color: '#f43f5e' },
    { label: 'Git/CI-CD', proficiency: 70, marketDemand: 80, color: '#10b981' }
  ];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {darkMode && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </>
      )}

      {/* Header Banner */}
      <header className={`border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md ${darkMode ? 'border-slate-800/80 bg-slate-950/70' : 'border-slate-200 bg-white/70'}`}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20 text-base">🧭</div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight">AI Career Navigator</h1>
            <p className="text-[10px] font-mono tracking-wider uppercase text-indigo-500 font-bold">Enterprise Suite v2.8</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl border text-sm transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-100'}`}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <div className={`text-xs font-semibold px-3 py-1.5 rounded-xl border shadow-inner flex items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Cloud Engine Online
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-3">
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-50 px-3">Navigation Matrix</p>
          <button onClick={() => setCurrentTab('analyzer')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${currentTab === 'analyzer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-200 text-slate-600')}`}>
            <span>📊</span> Profile & Resume Analyzer
          </button>
          <button onClick={() => setCurrentTab('skills')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${currentTab === 'skills' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-200 text-slate-600')}`}>
            <span>⚡</span> Skill Gap Tracker
          </button>
          <button onClick={() => setCurrentTab('interview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${currentTab === 'interview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-200 text-slate-600')}`}>
            <span>🧠</span> Interview Prep Arena
          </button>
        </aside>

        {/* Main Workspace */}
        <section className="lg:col-span-9">
          
          {/* TAB 1: ANALYZER */}
          {currentTab === 'analyzer' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 border rounded-2xl shadow-xl backdrop-blur-md ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h2 className="text-sm font-bold flex items-center gap-2 mb-2">📁 File Ingestion</h2>
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
                      <div className={`p-6 border rounded-2xl text-center ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">ATS Score</span>
                        <div className="text-4xl font-black text-emerald-400 mt-1">{result.score}%</div>
                      </div>
                      <div className={`p-6 border rounded-2xl sm:col-span-2 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Extracted Vectors</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {result.coreVectors.map((v, i) => (
                            <span key={i} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-[10px] rounded-lg">⚡ {v}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`h-48 border border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 opacity-60 ${darkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-300 bg-white'}`}>
                    <p className="text-xs">Awaiting profile stream data inside ingestion sub-portal.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SKILL GAP TRACKER (WITH LIVE INTERACTIVE TELEMETRY CHARTS) */}
          {currentTab === 'skills' && (
            <div className="space-y-6">
              
              {/* Dynamic Double-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual Chart Component Wrapper */}
                <div className={`md:col-span-7 p-6 border rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div>
                    <h2 className="text-sm font-bold flex items-center gap-2 mb-1">📊 Skill Metric Analytics Matrix</h2>
                    <p className="text-[11px] opacity-60 mb-6">Hover bars to compare profile capability vs macro industry standards.</p>
                  </div>

                  {/* Pure Styled Custom Scalable Data Chart Component */}
                  <div className="relative w-full h-48 flex items-end justify-between px-4 pt-4 border-b border-l border-slate-700/40">
                    
                    {/* Background Dotted Guideline Markers */}
                    <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-slate-800/60 pointer-events-none"></div>
                    <div className="absolute left-0 right-0 top-2/4 border-t border-dashed border-slate-800/60 pointer-events-none"></div>
                    <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-slate-800/60 pointer-events-none"></div>

                    {skillsData.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center w-12 group relative cursor-pointer"
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Market Demand Overlay Bar (Translucent Background Pillar) */}
                        <div 
                          className="w-8 rounded-t bg-slate-700/20 group-hover:bg-slate-700/40 transition-all duration-300 absolute bottom-0"
                          style={{ height: `${item.marketDemand}%` }}
                        ></div>

                        {/* Your Proficiency Fill Pillar (Foreground Core Color Gradient) */}
                        <div 
                          className="w-5 rounded-t transition-all duration-500 ease-out z-10 shadow-lg"
                          style={{ 
                            height: `${item.proficiency}%`, 
                            backgroundColor: item.color,
                            boxShadow: hoveredBar === index ? `0 0 15px ${item.color}80` : 'none'
                          }}
                        ></div>

                        {/* Interactive Float Tooltip Bubble */}
                        {hoveredBar === index && (
                          <div className={`absolute -top-14 z-50 p-2 rounded-lg text-[10px] font-mono shadow-xl border w-28 text-center animate-fadeIn ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
                            <p className="font-bold border-b border-slate-800 pb-0.5 mb-1">{item.label}</p>
                            <p className="text-indigo-400">Mine: {item.proficiency}%</p>
                            <p className="text-slate-400">Market: {item.marketDemand}%</p>
                          </div>
                        )}

                        <span className="text-[9px] font-bold tracking-tight opacity-60 mt-2 whitespace-nowrap absolute -bottom-5 rotate-12 sm:rotate-0">{item.label.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-2"></div>
                </div>

                {/* Analytical Breakdown Details Module */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className={`p-6 border rounded-2xl shadow-md ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Legend Reference</h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-indigo-500 block"></span>
                        <p className="opacity-80">Primary Core Vector Proficiency</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-slate-700/30 block border border-slate-700/40"></span>
                        <p className="opacity-80">Target Global Recruiter Demand Index</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 border rounded-2xl flex-1 flex flex-col justify-center ${darkMode ? 'bg-gradient-to-br from-indigo-950/20 to-slate-900/60 border-indigo-900/30' : 'bg-white border-slate-200'}`}>
                    <h4 className="text-xs font-bold text-indigo-400 mb-1">💡 Automated Actionable Insight</h4>
                    <p className="text-[11px] leading-relaxed opacity-70">Your **Docker/Infra** vector maps at **40%**, triggering a critical market variance gap of **-38%**. Focus on container network topology configurations next.</p>
                  </div>
                </div>

              </div>

              {/* Standard Linear Breakdown Grid */}
              <div className={`p-6 border rounded-2xl shadow-xl ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xs font-bold opacity-70 mb-4 uppercase tracking-widest">Granular Node Breakdowns</h3>
                <div className="space-y-4">
                  {skillsData.map((item, index) => (
                    <div key={index} className={`p-4 border rounded-xl ${darkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span>{item.label}</span>
                        <span className="font-bold" style={{ color: item.color }}>{item.proficiency}% Proficiency</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-1000 rounded-full" style={{ width: `${item.proficiency}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: INTERVIEW PREP */}
          {currentTab === 'interview' && (
            <div className={`p-6 border rounded-2xl shadow-xl backdrop-blur-md ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h2 className="text-sm font-bold flex items-center gap-2 mb-2">🧠 Live Gemini AI Assessment Arena</h2>
              <p className="text-xs opacity-60 mb-6">Stream dynamic, infinite mock question sets directly from Google's core models.</p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1 opacity-60">Enter Gemini API Key</label>
                    <input type="password" placeholder="AIzaSy..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} className={`w-full px-3 py-2 text-xs border rounded-xl font-mono focus:outline-none focus:border-indigo-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300'}`} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1 opacity-60">Prompt Customization Matrix</label>
                    <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:border-indigo-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300'}`} />
                  </div>
                </div>

                <button onClick={handleAskGemini} disabled={aiLoading} className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold uppercase py-2.5 px-6 rounded-xl shadow-md tracking-wider transition-opacity">
                  {aiLoading ? 'Streaming Live AI Response...' : 'Initialize Query Streams'}
                </button>

                <div className={`p-5 border rounded-xl min-h-[150px] transition-all whitespace-pre-wrap text-xs leading-relaxed font-sans ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-700'}`}>
                  {aiLoading && (
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-[11px] animate-pulse">
                      <span>🔄</span> Query intercepting active. Generating runtime assessment arrays...
                    </div>
                  )}
                  {!aiLoading && !aiResponse && <span className="opacity-40 italic">Provide an API key configuration and trigger execution to map context values here.</span>}
                  {!aiLoading && aiResponse && aiResponse}
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};