import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { VerificationRequest } from '../types';
import { OutcomeConfidenceBadge } from '../components/OutcomeConfidenceBadge';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Clock,
  Sparkles
} from 'lucide-react';

export const EmployerDashboardPage: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiService.getVerificationRequests().then((data) => setRequests(data));
  }, []);

  const handleVerifyAction = async (status: 'Verified' | 'Rejected' | 'Correction Requested') => {
    if (!selectedRequest) return;
    setLoading(true);

    try {
      const updatedList = await apiService.updateVerificationStatus(
        selectedRequest.id,
        status,
        remarks || 'Verified via HR Portal records.'
      );
      setRequests(updatedList);

      if (status === 'Verified') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      setLoading(false);
      setSelectedRequest(null);
      setRemarks('');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
              EMPLOYER HR PORTAL
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
              TechSolutions HR Department
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Employment Verification Requests
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Formally verify candidate skilling outcomes to establish high-confidence employment signals.
          </p>
        </div>
      </div>

      {/* VERIFICATION CONFIDENCE EXPLAINER CARD */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">How Verification Confidence Works</h3>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Self Reported = 40 pts | Employer Verified = +30 pts | 60D Followup = +20 pts.
            </p>
          </div>
        </div>
      </div>

      {/* REQUESTS TABLE / CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className={`bg-white rounded-3xl p-6 border transition-all ${
              req.status === 'Verified'
                ? 'border-emerald-200 shadow-sm'
                : 'border-amber-200 shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                {req.candidateOutcomeId}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  req.status === 'Verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {req.status}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 mt-3">{req.candidateName}</h3>
            <p className="text-xs font-semibold text-brand-600">{req.role}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Company:</span>
                <span className="font-bold text-slate-800">{req.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span>Joining Date:</span>
                <span className="font-bold text-slate-800">{req.joiningDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Salary Band:</span>
                <span className="font-bold text-slate-800">{req.salaryBand}</span>
              </div>
            </div>

            <div className="mt-4">
              <OutcomeConfidenceBadge status={req.status === 'Verified' ? 'Employer Verified' : 'Self Reported'} score={req.confidenceScore} />
            </div>

            {req.status === 'Pending' && (
              <button
                onClick={() => setSelectedRequest(req)}
                className="w-full mt-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center justify-center space-x-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Review & Verify Candidate</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* VERIFICATION MODAL FLOW */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                  HR VERIFICATION ACTION
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Verify Employment: {selectedRequest.candidateName}
                </h3>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="mt-4 text-xs space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p><strong>Candidate ID:</strong> {selectedRequest.candidateOutcomeId}</p>
              <p><strong>Claimed Role:</strong> {selectedRequest.role}</p>
              <p><strong>Joining Date:</strong> {selectedRequest.joiningDate}</p>
              <p><strong>Salary Band:</strong> {selectedRequest.salaryBand}</p>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">HR Remarks / Notes (Optional)</label>
              <input
                type="text"
                placeholder="Confirmed active employment via HR records."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => handleVerifyAction('Rejected')}
                className="px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors"
              >
                Reject Claim
              </button>
              <button
                onClick={() => handleVerifyAction('Verified')}
                disabled={loading}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Employment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
