import React from 'react';
import { useRole } from '../context/RoleContext';
import { Sparkles, ChevronRight, ChevronLeft, CheckCircle2, Award } from 'lucide-react';
import { UserRole } from '../types';

interface JudgeTourBannerProps {
  onNavigate: (page: string) => void;
}

interface TourStep {
  step: number;
  title: string;
  targetPage: string;
  role: UserRole;
  description: string;
  actionText: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: '1. Government Impact Analytics',
    targetPage: 'government-dashboard',
    role: 'government',
    description: 'Inspect macro 5,000 trainee funnel. Filter by Data Analytics course to observe weak 6-month retention (61%) vs raw initial placement.',
    actionText: 'Open Government Dashboard',
  },
  {
    step: 2,
    title: '2. AI Root Cause Analysis',
    targetPage: 'ai-root-cause',
    role: 'government',
    description: 'Analyze why Data Analytics trainees faced retention barriers. Discover Skill Mismatch (38%) as the primary bottleneck.',
    actionText: 'Inspect Root Causes',
  },
  {
    step: 3,
    title: '3. AI Skill Gap Engine',
    targetPage: 'ai-skill-gap',
    role: 'government',
    description: 'Compare skills taught (Excel, SQL) vs real market demand. Spot missing HIGH priority gap: Power BI Practical Projects.',
    actionText: 'View AI Skill Matrix',
  },
  {
    step: 4,
    title: '4. Cohort Impact Comparison (HERO)',
    targetPage: 'cohort-impact',
    role: 'government',
    description: 'Compare Cohort 2025 (Before intervention: 52%) vs Cohort 2026 (After Power BI module intervention: 64% placement, 73% retention).',
    actionText: 'View Cohort Before/After',
  },
  {
    step: 5,
    title: '5. Trainee Longitudinal Timeline (Rishi)',
    targetPage: 'trainee-dashboard',
    role: 'trainee',
    description: 'Inspect demo trainee Rishi Sharma (KP-10492). View Career Pulse Index (84/100 Healthy) and longitudinal progression.',
    actionText: 'Open Rishi Persona',
  },
  {
    step: 6,
    title: '6. Employer Verification Portal',
    targetPage: 'employer-dashboard',
    role: 'employer',
    description: 'Switch to Employer HR role. Formally click "Verify Candidate" for Rishi to raise Outcome Confidence score to 90%.',
    actionText: 'Open Employer Portal',
  },
];

export const JudgeTourBanner: React.FC<JudgeTourBannerProps> = ({ onNavigate }) => {
  const { guidedStep, setGuidedStep, setRole, isGuidedMode, setIsGuidedMode } = useRole();

  if (!isGuidedMode) return null;

  const current = TOUR_STEPS[guidedStep] || TOUR_STEPS[0];

  const handleGoToStep = (index: number) => {
    setGuidedStep(index);
    const target = TOUR_STEPS[index];
    setRole(target.role);
    onNavigate(target.targetPage);
  };

  const handleNext = () => {
    if (guidedStep < TOUR_STEPS.length - 1) {
      handleGoToStep(guidedStep + 1);
    }
  };

  const handlePrev = () => {
    if (guidedStep > 0) {
      handleGoToStep(guidedStep - 1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-500/30 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Step Indicator & Info */}
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 mt-0.5 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-amber-400 text-slate-900 rounded-md">
                Hackathon Judge Guided Demo
              </span>
              <span className="text-xs text-indigo-200 font-semibold">
                Step {current.step} of {TOUR_STEPS.length}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">{current.title}</h4>
            <p className="text-xs text-indigo-100/80 max-w-2xl mt-0.5">{current.description}</p>
          </div>
        </div>

        {/* Action & Step Controls */}
        <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
          <button
            onClick={handlePrev}
            disabled={guidedStep === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors text-xs flex items-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Quick step jump pills */}
          <div className="hidden sm:flex items-center space-x-1">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => handleGoToStep(idx)}
                className={`w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center transition-all ${
                  guidedStep === idx
                    ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                    : 'bg-slate-800 text-indigo-200 hover:bg-slate-700'
                }`}
                title={s.title}
              >
                {s.step}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={guidedStep === TOUR_STEPS.length - 1}
            className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 hover:bg-amber-300 font-bold text-xs flex items-center space-x-1 transition-all shadow-md"
          >
            <span>Next Demo Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
