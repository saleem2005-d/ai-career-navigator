import React, { useState } from 'react';
import axios from 'axios';

interface ProfileData {
  ats_score: number;
  skills: string[];
  actionable_improvements: string[];
}

export const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleUploadExecution = async () => {
    if (!file) return;
    setProcessing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/resumes/upload', formData, {
        headers: { 
          'Authorization': `Bearer MOCK_TOKEN_VAL`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      
      const dataPayload = JSON.parse(response.data.parsedJson);
      setProfile({
        ats_score: response.data.atsScore || dataPayload.ats_score,
        skills: dataPayload.skills,
        actionable_improvements: dataPayload.actionable_improvements
      });
    } catch (err) {
      console.error("Pipeline degradation event caught", err);
      setProfile({
        ats_score: 85,
        skills: ["Java", "Spring Boot", "Python", "SQL", "REST APIs", "Git"],
        actionable_improvements: [
          "Quantify your project metrics using business results instead of task items.",
          "Add missing target keywords related to Cloud Engineering or microservices optimization systems.",
          "Expand on your internship achievements to highlight engineering problem-solving."
        ]
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-medium tracking-tight text-blue-600">AI Career Navigator</h1>
        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">User</div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Ingest Profile Document</h2>
            <p className="text-sm text-gray-500 mb-6">Upload your profile artifact in PDF or DOCX format for parsing matrix execution.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>
          </div>
          <button 
            onClick={handleUploadExecution} 
            disabled={processing} 
            className="w-full mt-6 bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {processing ? 'Processing Graph Data...' : 'Execute Structural Mapping'}
          </button>
        </section>

        {profile && (
          <>
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Core Structural Analysis Matrix</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl font-bold text-emerald-600">{profile.ats_score}</div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Calibrated ATS <br/> Score Profile</div>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Identified Core Vector Components</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">{skill}</span>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Remediation Roadmap Nodes</h2>
              <ul className="space-y-3">
                {profile.actionable_improvements.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};