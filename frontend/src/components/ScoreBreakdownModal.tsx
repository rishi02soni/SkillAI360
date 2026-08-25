import React from 'react';
import { X, ShieldCheck, Flame, Info, CheckCircle2 } from 'lucide-react';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase tracking-wider">
                Transparent Metric Models
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              KaushalPulse Scoring Algorithms
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Prototype index models built for Smart India Hackathon outcome measurement.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-8">
          {/* 1. CAREER PULSE INDEX FORMULA */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h4 className="text-base font-extrabold text-slate-900">
                1. Career Pulse Index Formula (0 - 100)
              </h4>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Measures long-term livelihood health rather than one-time placement counts.
            </p>

            <div className="mt-4 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Employment Signal & Status</span>
                <span className="font-bold text-brand-600">30% Weight</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Longitudinal Job Retention (6M / 12M)</span>
                <span className="font-bold text-brand-600">25% Weight</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Job Relevance to Training Curriculum</span>
                <span className="font-bold text-brand-600">20% Weight</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Wage Progression Over Baseline</span>
                <span className="font-bold text-brand-600">15% Weight</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Post-Training Skill Gap Progress</span>
                <span className="font-bold text-brand-600">10% Weight</span>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 text-[11px] text-slate-500 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Score Bands:</strong> 80-100 = Healthy | 60-79 = Needs Attention | 0-59 = At Risk.
              </span>
            </div>
          </div>

          {/* 2. OUTCOME CONFIDENCE SCORE FORMULA */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="text-base font-extrabold text-slate-900">
                2. Outcome Verification Confidence Model
              </h4>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Verifies whether a reported employment outcome can be trusted.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <p className="font-bold text-slate-700">Self Reported</p>
                <p className="text-lg font-black text-amber-600 mt-1">40 pts</p>
                <p className="text-[10px] text-slate-400">Baseline trainee submission</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <p className="font-bold text-slate-700">Employer Verified</p>
                <p className="text-lg font-black text-emerald-600 mt-1">+30 pts</p>
                <p className="text-[10px] text-slate-400">Direct HR portal confirmation</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <p className="font-bold text-slate-700">Repeated Follow-up</p>
                <p className="text-lg font-black text-indigo-600 mt-1">+20 pts</p>
                <p className="text-[10px] text-slate-400">30D / 90D retention signal</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <p className="font-bold text-slate-700">Consistent History</p>
                <p className="text-lg font-black text-violet-600 mt-1">+10 pts</p>
                <p className="text-[10px] text-slate-400">Payroll / EPF simulated signal</p>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-500 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-900">
              <strong>Max Score: 100 pts</strong> (High Confidence = 80+, Medium = 50-79, Low = &lt;50).
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close Formula Explainer
          </button>
        </div>
      </div>
    </div>
  );
};
