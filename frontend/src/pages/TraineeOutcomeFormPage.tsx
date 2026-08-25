import React, { useState } from 'react';
import { apiService } from '../services/api';
import { EmploymentStatus, SalaryBand, NonPlacementReason } from '../types';
import { CheckCircle2, ClipboardList, Briefcase, AlertCircle, ArrowRight } from 'lucide-react';

interface TraineeOutcomeFormPageProps {
  onNavigate: (page: string) => void;
}

export const TraineeOutcomeFormPage: React.FC<TraineeOutcomeFormPageProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<EmploymentStatus>('Employed');
  const [companyName, setCompanyName] = useState('TechSolutions India');
  const [roleTitle, setRoleTitle] = useState('Associate Data Analyst');
  const [joiningDate, setJoiningDate] = useState('2026-07-01');
  const [employmentType, setEmploymentType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Gig/Freelance' | 'N/A'>('Full-time');
  const [salaryBand, setSalaryBand] = useState<SalaryBand>('20K-30K');
  const [isRelevant, setIsRelevant] = useState<boolean>(true);
  const [nonPlacementReason, setNonPlacementReason] = useState<NonPlacementReason>('Skill gap');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.updateTraineeOutcome({
        status,
        companyName: status === 'Employed' ? companyName : undefined,
        roleTitle: status === 'Employed' ? roleTitle : undefined,
        joiningDate: status === 'Employed' ? joiningDate : undefined,
        employmentType: status === 'Employed' ? employmentType : 'N/A',
        salaryBand: status === 'Employed' ? salaryBand : undefined,
        isRelevant: status === 'Employed' ? isRelevant : false,
        nonPlacementReason: status === 'Unemployed' ? nonPlacementReason : undefined,
      });

      setLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center animate-slide-up">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Outcome Updated Successfully</h2>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Your longitudinal status has been recorded on KaushalPulse. Employer verification and Career Pulse score updated.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('trainee-dashboard')}
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            Return to Career Pulse
          </button>
          <button
            onClick={() => onNavigate('employer-dashboard')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            Switch to Employer HR Verification
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Form Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase tracking-wider">
            LOW-FRICTION OUTCOME CHECK
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
            Rishi Sharma (KP-10492)
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
          Post-Training Employment Update
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Please update your current employment status to keep your outcome metrics verified and active.
        </p>

        {/* Status Option Selectors */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              What is your current status?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['Employed', 'Self-employed', 'Apprenticeship', 'Unemployed', 'Further education'] as EmploymentStatus[]).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setStatus(st)}
                  className={`p-3 rounded-2xl text-xs font-bold border text-left transition-all ${
                    status === st
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* IF EMPLOYED DETAILS */}
          {(status === 'Employed' || status === 'Self-employed' || status === 'Apprenticeship') && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 animate-fade-in">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                Employment Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company / Organization Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Job Designation / Role Title</label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Joining Date</label>
                  <input
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Monthly Salary Band</label>
                  <select
                    value={salaryBand}
                    onChange={(e) => setSalaryBand(e.target.value as SalaryBand)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-500"
                  >
                    <option value="<10K">&lt; ₹10,000 / month</option>
                    <option value="10K-20K">₹10,000 – ₹20,000 / month</option>
                    <option value="20K-30K">₹20,000 – ₹30,000 / month</option>
                    <option value="30K+">₹30,000+ / month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contractual</option>
                    <option value="Gig/Freelance">Gig / Freelance</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRelevant}
                    onChange={(e) => setIsRelevant(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Is this job directly related to your Data Analytics training?
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* IF UNEMPLOYED DETAILS */}
          {status === 'Unemployed' && (
            <div className="space-y-4 bg-rose-50/50 p-5 rounded-2xl border border-rose-200/80 animate-fade-in">
              <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider border-b border-rose-200 pb-2">
                Root Cause Feedback
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Why are you currently not employed?
                </label>
                <select
                  value={nonPlacementReason}
                  onChange={(e) => setNonPlacementReason(e.target.value as NonPlacementReason)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                >
                  <option value="Skill gap">Skill gap / Missing technical tools</option>
                  <option value="No suitable jobs">No suitable jobs available locally</option>
                  <option value="Location">Location / Relocation constraints</option>
                  <option value="Salary mismatch">Salary offered was below expectation</option>
                  <option value="Interview difficulty">Difficulty clearing interview rounds</option>
                  <option value="Personal reasons">Personal / Family reasons</option>
                  <option value="Further education">Pursuing higher studies</option>
                  <option value="Other">Other reason</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Submitting Signal...' : 'Submit Outcome Signal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
