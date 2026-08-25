import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Trainee } from '../types';
import { CareerPulseGauge } from '../components/CareerPulseGauge';
import { LongitudinalTimeline } from '../components/LongitudinalTimeline';
import { ScoreBreakdownModal } from '../components/ScoreBreakdownModal';
import { OutcomeConfidenceBadge } from '../components/OutcomeConfidenceBadge';
import { KpiCard } from '../components/KpiCard';
import {
  Briefcase,
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  ClipboardList,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface TraineeDashboardPageProps {
  onNavigate: (page: string) => void;
}

export const TraineeDashboardPage: React.FC<TraineeDashboardPageProps> = ({ onNavigate }) => {
  const [trainee, setTrainee] = useState<Trainee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    apiService.getTraineeProfile().then((data) => setTrainee(data));
  }, []);

  if (!trainee) return <div className="p-8 text-center text-slate-500">Loading Trainee Dashboard...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* HEADER & HERO WELCOME */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
              Trainee Outcome Profile
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-bold">
              Outcome ID: {trainee.outcomeId}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1">
            Welcome back, {trainee.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Course: <strong className="text-slate-800">{trainee.courseName}</strong> | Provider: {trainee.providerName} ({trainee.district})
          </p>
        </div>

        {/* Update Outcome CTA */}
        <button
          onClick={() => onNavigate('trainee-outcome')}
          className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-brand-600/30 transition-all flex items-center space-x-2 shrink-0"
        >
          <ClipboardList className="w-4 h-4" />
          <span>Update Employment Status</span>
        </button>
      </div>

      {/* CAREER PULSE GAUGE CARD */}
      <CareerPulseGauge
        score={trainee.careerPulseScore}
        status={trainee.pulseStatus}
        onOpenBreakdown={() => setIsModalOpen(true)}
      />

      {/* TRAINEE KPI METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Employment Status"
          value={trainee.currentOutcome.status}
          subtext={trainee.currentOutcome.companyName || 'N/A'}
          icon={Briefcase}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
        <KpiCard
          title="Job Relevance"
          value="87%"
          subtext="Directly Matched"
          icon={Award}
          iconBgColor="bg-brand-50"
          iconTextColor="text-brand-600"
        />
        <KpiCard
          title="6M Job Retention"
          value="Active"
          subtext="Confirmed 60D Check"
          icon={ShieldCheck}
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-600"
        />
        <KpiCard
          title="Wage Growth"
          value="+18%"
          subtext="Band: 20K-30K"
          trend={{ value: 'Above Baseline', isPositive: true }}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
        <KpiCard
          title="Skill Progress"
          value="76%"
          subtext="2 Modules Recommended"
          icon={BookOpen}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />
      </div>

      {/* VERIFICATION & NEXT FOLLOW-UP REMINDER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Status Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Outcome Verification Status</h3>
            <div className="mt-2">
              <OutcomeConfidenceBadge
                status={trainee.verificationStatus}
                score={trainee.verificationConfidenceScore}
              />
            </div>
          </div>
        </div>

        {/* Next Followup Reminder Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Next Longitudinal Follow-up</h3>
            <p className="text-xs text-slate-500 mt-1">90-Day Retention Check due in 12 days ({trainee.nextFollowupDue}).</p>
            <button
              onClick={() => onNavigate('trainee-followups')}
              className="mt-3 text-xs text-brand-600 font-bold hover:underline flex items-center space-x-1"
            >
              <span>View Follow-up Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* RECOMMENDED SKILL MODULES */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md">
              AI SKILL GAP RECOMMENDATION
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Recommended Learning Modules
            </h3>
            <p className="text-xs text-slate-500">Based on real regional employer demand for Data Analytics roles.</p>
          </div>
          <button
            onClick={() => onNavigate('ai-skill-gap')}
            className="text-xs text-brand-600 font-bold hover:underline flex items-center space-x-1"
          >
            <span>Inspect Skill Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainee.recommendedLearning.map((item) => (
            <div key={item.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1.5">{item.title}</h4>
                <p className="text-xs text-slate-500">Est Duration: {item.estHours} hours</p>
              </div>
              <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors">
                Start Module
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LONGITUDINAL TIMELINE */}
      <LongitudinalTimeline events={trainee.timelineEvents} />

      {/* SCORE BREAKDOWN MODAL */}
      <ScoreBreakdownModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
