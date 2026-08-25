import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { CohortImpact } from '../types';
import { InterventionDeltaCard } from '../components/InterventionDeltaCard';
import { GitCompare, Sparkles, TrendingUp, Info } from 'lucide-react';

export const CohortImpactPage: React.FC = () => {
  const [impacts, setImpacts] = useState<CohortImpact[]>([]);

  useEffect(() => {
    apiService.getCohortImpacts().then((data) => setImpacts(data));
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
              HERO HACKATHON FEATURE
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Closed-Loop Impact Measurement
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1">
            Cohort Impact Comparison (Before vs After)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Proves curriculum and policy intervention success by measuring the exact delta in placement & 6M retention.
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs max-w-xs">
          <strong>Note:</strong> Labeled as <em>Synthetic prototype data</em> to prevent causal claims without randomized control.
        </div>
      </div>

      {/* COHORT CARDS LIST */}
      <div className="space-y-8">
        {impacts.map((impact) => (
          <InterventionDeltaCard key={impact.id} impact={impact} />
        ))}
      </div>
    </div>
  );
};
