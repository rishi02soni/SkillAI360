import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { RootCauseAnalysis } from '../types';
import { AlertTriangle, Sparkles, BrainCircuit, CheckCircle2, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AIRootCausePage: React.FC = () => {
  const [data, setData] = useState<RootCauseAnalysis | null>(null);

  useEffect(() => {
    apiService.getRootCauseAnalysis('c-da-01').then((res) => setData(res));
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-500">Analyzing Cohort Root Causes...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase tracking-wider">
            ROOT CAUSE DIAGNOSTICS
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
            {data.courseName} ({data.district})
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
          AI Root Cause Analysis Engine
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Aggregates trainee non-placement feedback to pinpoint structural outcome barriers.
        </p>
      </div>

      {/* AI NARRATIVE EXPLANATION HERO CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-indigo-500/30">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BrainCircuit className="w-4 h-4 animate-pulse" />
          <span>AI Cohort Narrative Synthesis</span>
        </div>

        <h3 className="text-xl font-extrabold text-white">Dominant Barrier: {data.dominantBarrier}</h3>
        <p className="text-xs text-indigo-100/90 mt-2 leading-relaxed max-w-4xl">{data.aiNarrativeExplanation}</p>

        <div className="mt-6 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-start space-x-3 text-xs text-amber-200">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-bold">AI Recommended Course Mod:</strong>
            <span>{data.actionableRecommendation}</span>
          </div>
        </div>
      </div>

      {/* BARRIER BREAKDOWN CHART */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 mb-4">
          Non-Placement Barrier Distribution ({data.totalUnemployed} Trainees Analyzed)
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.barrierBreakdown} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="barrier" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Barrier %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
