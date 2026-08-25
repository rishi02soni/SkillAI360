import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { VerificationStatus } from '../types';

interface OutcomeConfidenceBadgeProps {
  status: VerificationStatus;
  score?: number; // e.g. 90
  showBreakdown?: boolean;
}

export const OutcomeConfidenceBadge: React.FC<OutcomeConfidenceBadgeProps> = ({
  status,
  score = 90,
  showBreakdown = true,
}) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Employer Verified':
      case 'Repeatedly Confirmed':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: ShieldCheck,
          label: status,
          confidenceLevel: 'High Confidence',
        };
      case 'Self Reported':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: HelpCircle,
          label: 'Self Reported',
          confidenceLevel: 'Medium Confidence',
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: ShieldAlert,
          label: 'Verification Rejected',
          confidenceLevel: 'Low Confidence',
        };
    }
  };

  const style = getBadgeStyle();
  const Icon = style.icon;

  return (
    <div className="inline-flex flex-col">
      <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.bg}`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span>{style.label}</span>
        {score && <span className="opacity-80">({score}/100)</span>}
      </div>

      {showBreakdown && (
        <div className="mt-1.5 text-[11px] text-slate-500 flex items-center space-x-1">
          <span className="font-semibold text-slate-700">{style.confidenceLevel}:</span>
          <span>
            {status === 'Employer Verified'
              ? 'Self (40) + HR Verified (+30) + Pulse Check (+20) = 90 pts'
              : 'Self Reported Baseline (40 pts) — Employer verification pending'}
          </span>
        </div>
      )}
    </div>
  );
};
