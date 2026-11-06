import React, { useState, useEffect } from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, ExternalLink, Award, BookOpen, Briefcase, Sparkles, CheckCircle2, FileText, Eye } from 'lucide-react';
import { personalInfo, skillCategories, experience, projects, education, certifications } from '../data/portfolioData';

const ResumeModal = ({ isOpen, onClose, onDownload }) => {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'structured'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const resumePdfUrl = `/${personalInfo.resumeFileName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/70 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Header */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-semibold text-slate-100">Official Resume • {personalInfo.name}</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'pdf'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Original PDF</span>
            </button>
            <button
              onClick={() => setViewMode('structured')}
              className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'structured'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Structured View</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700"
              title="Open Original PDF in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
              title="Download Resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Either PDF viewer or Structured View */}
        {viewMode === 'pdf' ? (
          <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
            <object
              data={resumePdfUrl}
              type="application/pdf"
              className="w-full h-[75vh] rounded-lg border border-slate-800 shadow-xl"
            >
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 text-slate-300">
                <FileText className="w-16 h-16 text-indigo-400" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Resume PDF Ready</h3>
                  <p className="text-sm text-slate-400 max-w-md">
                    Your browser does not support inline PDF viewing. You can view or download the PDF file directly below.
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open PDF in New Window</span>
                  </a>
                  <button
                    onClick={onDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </object>
          </div>
        ) : (
          <div className="overflow-y-auto p-6 sm:p-10 space-y-7 bg-white text-slate-900 font-sans print:p-0">
            {/* Header */}
            <div className="text-center border-b border-slate-300 pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {personalInfo.name}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm text-slate-700">
                <a href={`tel:${personalInfo.phone}`} className="hover:text-indigo-600 font-medium">
                  {personalInfo.formattedPhone}
                </a>
                <span>•</span>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600 font-medium">
                  {personalInfo.email}
                </a>
                <span>•</span>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 font-medium">
                  LinkedIn
                </a>
                <span>•</span>
                <a href="https://github.com/adityavzm0-eng" target="_blank" rel="noreferrer" className="hover:text-indigo-600 font-medium">
                  GitHub
                </a>
                <span>•</span>
                <a href="https://portfolio-me-two-inky.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 font-medium">
                  Portfolio
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                {personalInfo.about}
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="space-y-1 text-xs text-slate-800">
                {skillCategories.map((cat) => (
                  <div key={cat.category} className="flex flex-col sm:flex-row sm:items-baseline">
                    <span className="font-semibold text-slate-900 sm:w-48 shrink-0">• {cat.category}:</span>
                    <span className="text-slate-700">{cat.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-3.5">
                {projects.slice(0, 3).map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {proj.title}
                      </span>
                      <span className="text-[11px] font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {proj.technologies.join(', ')}
                      </span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 leading-relaxed">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1 mb-3">
                Professional Experience
              </h2>
              {experience.filter(e => e.company.includes('BDreamz')).map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-slate-900">{exp.company}</span>
                      <span className="text-slate-600 italic ml-2">— {exp.location}</span>
                    </div>
                    <span className="text-slate-600 font-medium text-xs">{exp.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-900 italic">
                    {exp.role}
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 leading-relaxed pt-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1 mb-2">
                Education
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-0.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{edu.college}</span>
                    <span className="text-slate-600 font-medium">{edu.graduationYear}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800">
                    <span>{edu.degree}</span>
                    <span className="font-semibold text-indigo-900">CGPA: {edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800">
                {certifications.filter(c => !c.hasImage).map((cert, idx) => (
                  <li key={idx}>
                    <strong className="text-slate-900">{cert.title}</strong> — {cert.issuer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal Bottom Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-900 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{personalInfo.name} • {personalInfo.formattedPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeModal;
