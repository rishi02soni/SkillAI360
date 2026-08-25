import React from 'react';
import { CohortImpact } from '../types';
import { TrendingUp, ArrowRight, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface InterventionDeltaCardProps {
  impact: CohortImpact;
}

export const InterventionDeltaCard: React.FC<InterventionDeltaCardProps> = ({ impact }) => {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-lg relative overflow-hidden">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
              CLOSED-LOOP IMPACT PROOF
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
              Synthetic Prototype Data
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1.5">
            {impact.courseName} — Cohort Intervention Impact
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Provider: <strong className="text-slate-800">{impact.providerName}</strong> ({impact.district} District)
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 text-emerald-900">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <div className="text-right">
            <div className="text-sm font-black text-emerald-700">+{impact.outcomeGain.placementDelta}% Placement Jump</div>
            <div className="text-[10px] font-semibold text-emerald-600">+{impact.outcomeGain.retentionDelta}% 6M Retention Jump</div>
          </div>
        </div>
      </div>

      {/* Applied Intervention Description */}
      <div className="bg-indigo-50/80 p-4 rounded-2xl border border-indigo-200/80 mb-6 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
            AI-Driven Curriculum Intervention Applied
          </p>
          <p className="text-xs text-indigo-950 font-medium mt-0.5">{impact.interventionDescription}</p>
        </div>
      </div>

      {/* Side-by-side Before vs After Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* BEFORE COHORT */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-extrabold uppercase">
              BEFORE INTERVENTION
            </span>
            <span className="text-xs font-bold text-slate-500">{impact.beforeCohort.name}</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>Placement Rate:</span>
                <span className="text-slate-900 font-extrabold">{impact.beforeCohort.placementRate}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-500 rounded-full"
                  style={{ width: `${impact.beforeCohort.placementRate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>6-Month Job Retention:</span>
                <span className="text-slate-900 font-extrabold">{impact.beforeCohort.retained6MRate}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-500 rounded-full"
                  style={{ width: `${impact.beforeCohort.retained6MRate}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-xs">
              <span className="text-slate-500">Avg Starting Salary:</span>
              <span className="font-bold text-slate-800">{impact.beforeCohort.avgSalary}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Detected Barrier:</strong> {impact.beforeCohort.detectedGap}
              </span>
            </div>
          </div>
        </div>

        {/* AFTER COHORT */}
        <div className="bg-emerald-50/50 rounded-2xl p-5 border-2 border-emerald-300 relative shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold uppercase shadow-sm">
              AFTER INTERVENTION
            </span>
            <span className="text-xs font-bold text-emerald-800">{impact.afterCohort.name}</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-emerald-900 mb-1">
                <span>Placement Rate:</span>
                <span className="text-emerald-700 font-black text-sm">{impact.afterCohort.placementRate}% (+{impact.outcomeGain.placementDelta}%)</span>
              </div>
              <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                  style={{ width: `${impact.afterCohort.placementRate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-emerald-900 mb-1">
                <span>6-Month Job Retention:</span>
                <span className="text-emerald-700 font-black text-sm">{impact.afterCohort.retained6MRate}% (+{impact.outcomeGain.retentionDelta}%)</span>
              </div>
              <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                  style={{ width: `${impact.afterCohort.retained6MRate}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/80 flex justify-between text-xs">
              <span className="text-emerald-900">Avg Starting Salary:</span>
              <span className="font-extrabold text-emerald-950">{impact.afterCohort.avgSalary}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Outcome Verified:</strong> Livelihood sustainability improved post-intervention!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
