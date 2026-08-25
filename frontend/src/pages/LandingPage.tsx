import React from 'react';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  TrendingUp,
  Award,
  BrainCircuit,
  GitCompare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  GraduationCap,
  Briefcase,
  User
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { setRole } = useRole();
  const { login } = useAuth();

  const handleLaunchRole = (role: UserRole) => {
    setRole(role);
    login(role);
    if (role === 'government') onNavigate('government-dashboard');
    else if (role === 'provider') onNavigate('provider-dashboard');
    else if (role === 'employer') onNavigate('employer-dashboard');
    else if (role === 'trainee') onNavigate('trainee-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle ambient lighting */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-400/20 text-brand-300 text-xs font-extrabold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart India Hackathon 2026 — Problem Statement 26135</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            From Training Completion to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-300 to-indigo-200">
              Sustainable Employment
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            SkillAI360 tracks, verifies and improves post-training outcomes across employment, retention, wage progression, and skill relevance.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleLaunchRole('government')}
              className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-base shadow-xl shadow-brand-600/30 transition-all flex items-center space-x-2"
            >
              <span>Explore Platform Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleLaunchRole('trainee')}
              className="px-8 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 transition-all flex items-center space-x-2"
            >
              <User className="w-5 h-5 text-amber-400" />
              <span>View Trainee Journey (Rishi)</span>
            </button>
          </div>
        </div>

        {/* HERO VISUAL: 5-ACTION OUTCOME FLOW */}
        <div className="max-w-6xl mx-auto mt-16 relative z-10 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <p className="text-center text-xs font-extrabold uppercase tracking-widest text-indigo-300 mb-8">
            The KaushalPulse Outcome Intelligence Flow
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-2 font-black text-sm">
                1
              </div>
              <p className="text-xs font-black text-white">TRACK</p>
              <p className="text-[11px] text-slate-400 mt-1">Longitudinal post-cert follow-up</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 font-black text-sm">
                2
              </div>
              <p className="text-xs font-black text-white">VERIFY</p>
              <p className="text-[11px] text-slate-400 mt-1">Employer & HR outcome signals</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2 font-black text-sm">
                3
              </div>
              <p className="text-xs font-black text-white">MEASURE</p>
              <p className="text-[11px] text-slate-400 mt-1">Career Pulse, Wage & Retention</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-2 font-black text-sm">
                4
              </div>
              <p className="text-xs font-black text-white">UNDERSTAND</p>
              <p className="text-[11px] text-slate-400 mt-1">AI Root Cause & Skill Gaps</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 col-span-2 md:col-span-1">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2 font-black text-sm">
                5
              </div>
              <p className="text-xs font-black text-white">IMPROVE</p>
              <p className="text-[11px] text-slate-400 mt-1">Cohort intervention measurement</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHY KAUSHALPULSE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
            The Strategic Solution
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">Why SkillAI360?</h2>
          <p className="text-slate-600 text-sm mt-2">
            Existing LMS & job portals capture enrollment and certification. SkillAI360 delivers outcome intelligence past certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Longitudinal Outcome Tracking</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Tracks trainees at 30, 90, 180, and 365 days post-certification to evaluate long-term livelihood stability.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Verified Employment Signals</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Replaces self-reported noise with direct HR employer verification & transparent confidence scoring (0-100 pts).
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 font-bold">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">AI Skill Gap Intelligence</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Compares course curriculum against real regional labor market demand to spotlight missing competencies.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 font-bold">
              <GitCompare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Closed-Loop Impact Measurement</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Proves policy & curriculum intervention impact with side-by-side Before vs. After cohort outcome comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: BUILT FOR ALL STAKEHOLDERS */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Built For The Entire Skilling Ecosystem</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Empowering trainees, providers, government nodal officers, and employers with actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleLaunchRole('trainee')}
              className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-amber-400 text-left transition-all group"
            >
              <User className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="text-base font-extrabold text-white group-hover:text-amber-300">For Trainees</h4>
              <p className="text-xs text-slate-400 mt-1">Track career pulse score, record outcomes, receive targeted skill recommendations.</p>
            </button>

            <button
              onClick={() => handleLaunchRole('provider')}
              className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-violet-400 text-left transition-all group"
            >
              <GraduationCap className="w-8 h-8 text-violet-400 mb-3" />
              <h4 className="text-base font-extrabold text-white group-hover:text-violet-300">For Training Providers</h4>
              <p className="text-xs text-slate-400 mt-1">Analyze course funnel retention, identify skill gaps, improve curriculum outcomes.</p>
            </button>

            <button
              onClick={() => handleLaunchRole('government')}
              className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-brand-400 text-left transition-all group"
            >
              <Building2 className="w-8 h-8 text-brand-400 mb-3" />
              <h4 className="text-base font-extrabold text-white group-hover:text-brand-300">For Government Admin</h4>
              <p className="text-xs text-slate-400 mt-1">Benchmark providers by 6M/12M retention, allocate funding based on verified impact.</p>
            </button>

            <button
              onClick={() => handleLaunchRole('employer')}
              className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-emerald-400 text-left transition-all group"
            >
              <Briefcase className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="text-base font-extrabold text-white group-hover:text-emerald-300">For Employers</h4>
              <p className="text-xs text-slate-400 mt-1">Verify employee candidate credentials with 1-click HR workflow.</p>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 border-t border-slate-900 py-8 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <span className="font-bold text-white">KaushalPulse Outcome Platform</span>
          </div>
          <p>© 2026 Smart India Hackathon — Problem Statement 26135 Solution</p>
          <p className="text-slate-500">Built for SIH 2026 Grand Finale Presentation</p>
        </div>
      </footer>
    </div>
  );
};
