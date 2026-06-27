import { UploadCloud } from "lucide-react";

export default function UploadCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold">
        Resume Analyzer
      </h2>

      <p className="text-slate-400 mt-2">
        Upload your resume to receive ATS score,
        AI recommendations and skill-gap analysis.
      </p>

      <label className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-12 cursor-pointer hover:border-blue-500 transition">

        <UploadCloud
          size={60}
          className="text-blue-500"
        />

        <h3 className="mt-4 text-xl">
          Drag & Drop Resume
        </h3>

        <p className="text-slate-500 mt-2">
          PDF / DOCX
        </p>

        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
        />

        <span className="mt-6 rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700 transition">
          Browse File
        </span>

      </label>

    </div>
  );
}