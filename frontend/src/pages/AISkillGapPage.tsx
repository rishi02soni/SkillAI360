import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { SkillGapMatrix } from '../types';
import { BrainCircuit, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Layers } from 'lucide-react';

export const AISkillGapPage: React.FC = () => {
  const [matrix, setMatrix] = useState<SkillGapMatrix | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('c-da-01');

  useEffect(() => {
    apiService.analyzeSkillGap(selectedCourse).then((data) => setMatrix(data));
  }, [selectedCourse]);

  if (!matrix) return <div className="p-8 text-center text-slate-500">Running AI Skill Gap Analysis...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
              PROTOTYPE AI INTELLIGENCE
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-bold">
              Semantic Skill Taxonomy
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            AI Skill Gap Matrix Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cross-analyzes curriculum skills taught against real-time regional labor market demand.
          </p>
        </div>

        {/* Course Selector */}
        <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
          >
            <option value="c-da-01">Data Analytics & Visualization</option>
            <option value="c-ev-02">EV Assembly Technician</option>
            <option value="c-wd-03">Full-Stack Web Development</option>
          </select>
        </div>
      </div>

      {/* TAUGHT VS DEMAND COMPARISON BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKILLS TAUGHT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <span>Skills Taught in Curriculum</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {matrix.taughtSkills.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* SKILLS DEMANDED */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Regional Job Market Demand</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {matrix.demandedSkills.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* VISUAL GAP MATRIX OUTPUT */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md">
            AI CLASSIFICATION OUTPUT
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            Skill Priority Matrix
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* HIGH PRIORITY */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
            <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold uppercase">
              HIGH PRIORITY GAP
            </span>
            <p className="text-xs text-rose-900 mt-2 font-medium">Critical missing competencies causing interview failures.</p>
            <div className="mt-4 space-y-2">
              {matrix.highPriorityGaps.map((g) => (
                <div key={g} className="p-2.5 rounded-xl bg-white text-rose-900 font-bold text-xs border border-rose-200 shadow-sm">
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* MEDIUM PRIORITY */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-900 text-[10px] font-extrabold uppercase">
              MEDIUM PRIORITY GAP
            </span>
            <p className="text-xs text-amber-900 mt-2 font-medium">Soft skills & workplace communication gaps.</p>
            <div className="mt-4 space-y-2">
              {matrix.mediumPriorityGaps.map((g) => (
                <div key={g} className="p-2.5 rounded-xl bg-white text-amber-900 font-bold text-xs border border-amber-200 shadow-sm">
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* EMERGING SKILLS */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-extrabold uppercase">
              EMERGING INDUSTRY DEMAND
            </span>
            <p className="text-xs text-indigo-900 mt-2 font-medium">Future-proof technologies gaining traction.</p>
            <div className="mt-4 space-y-2">
              {matrix.emergingSkills.map((g) => (
                <div key={g} className="p-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs border border-indigo-200 shadow-sm">
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* MATCHED SKILLS */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-extrabold uppercase">
              MATCHED COMPETENCIES
            </span>
            <p className="text-xs text-emerald-900 mt-2 font-medium">Skills taught that align directly with market demand.</p>
            <div className="mt-4 space-y-2">
              {matrix.matchedSkills.map((g) => (
                <div key={g} className="p-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs border border-emerald-200 shadow-sm flex items-center justify-between">
                  <span>{g}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
