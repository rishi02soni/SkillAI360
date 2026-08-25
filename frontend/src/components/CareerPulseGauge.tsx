import React from 'react';
import { Flame, Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface CareerPulseGaugeProps {
  score: number; // 0 - 100
  status: 'Healthy' | 'Needs Attention' | 'At Risk';
  onOpenBreakdown?: () => void;
}

export const CareerPulseGauge: React.FC<CareerPulseGaugeProps> = ({
  score,
  status,
  onOpenBreakdown,
}) => {
  const getStatusColor = () => {
    if (score >= 80) return { bg: 'bg-emerald-500', text: 'text-emerald-700', bgLight: 'bg-emerald-50', border: 'border-emerald-200' };
    if (score >= 60) return { bg: 'bg-amber-500', text: 'text-amber-700', bgLight: 'bg-amber-50', border: 'border-amber-200' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', bgLight: 'bg-rose-50', border: 'border-rose-200' };
  };

  const colors = getStatusColor();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/20 relative overflow-hidden">
      {/* Decorative ambient background glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Flame className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              CAREER PULSE INDEX
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-2">Sustainable Livelihood Health</h2>
        </div>

        {onOpenBreakdown && (
          <button
            onClick={onOpenBreakdown}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-indigo-100 transition-colors border border-white/10"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Formula Breakdown</span>
          </button>
        )}
      </div>

      {/* Main Score Display & Radial Visual */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Radial Arc */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-emerald-400 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white leading-none">{score}</span>
              <span className="text-[10px] font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div>
            <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${colors.bgLight} ${colors.text} ${colors.border}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{status} Status</span>
            </div>
            <p className="text-xs text-indigo-200/80 mt-2 max-w-xs leading-relaxed">
              Calculated across Verified Employment, 6M Retention, Job Relevance, Wage Growth (+18%), and Skill Progress.
            </p>
          </div>
        </div>

        {/* Breakdown Summary Mini Pills */}
        <div className="w-full sm:w-auto bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60 text-xs space-y-1.5 shrink-0">
          <div className="flex justify-between items-center space-x-4">
            <span className="text-slate-400">Verified Employment:</span>
            <span className="font-bold text-emerald-400">30 / 30</span>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-slate-400">6M Retention:</span>
            <span className="font-bold text-emerald-400">25 / 25</span>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-slate-400">Job Relevance:</span>
            <span className="font-bold text-amber-300">17 / 20</span>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-slate-400">Wage Growth:</span>
            <span className="font-bold text-emerald-400">12 / 15</span>
          </div>
        </div>
      </div>
    </div>
  );
};
