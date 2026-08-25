import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Trainee } from '../types';
import { ShieldCheck, Lock, CheckCircle2, EyeOff, FileText } from 'lucide-react';

export const PrivacySettingsPage: React.FC = () => {
  const [consent, setConsent] = useState({
    employmentTracking: true,
    employerVerification: true,
    wageAnalytics: true,
    policyAnalytics: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiService.getTraineeProfile().then((t) => {
      if (t.consent) setConsent(t.consent);
    });
  }, []);

  const handleToggle = async (key: keyof typeof consent) => {
    const updated = { ...consent, [key]: !consent[key] };
    setConsent(updated);
    await apiService.updateTraineeConsent(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase tracking-wider">
            PRIVACY & DATA GOVERNANCE
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
          Consent & Privacy Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Control how your outcome data, employer verification signals, and wage analytics are processed.
        </p>
      </div>

      {/* CONSENT TOGGLES */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-extrabold text-slate-900">Data Permission Controls</h3>
          {saved && (
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved</span>
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Employment Outcome Tracking</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Allows longitudinal pulse checks at 30, 90, 180, and 365 days.</p>
            </div>
            <button
              onClick={() => handleToggle('employmentTracking')}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                consent.employmentTracking ? 'bg-brand-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  consent.employmentTracking ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Employer HR Verification Signal</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Permits employer HR department to verify candidate joining date and role.</p>
            </div>
            <button
              onClick={() => handleToggle('employerVerification')}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                consent.employerVerification ? 'bg-brand-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  consent.employerVerification ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Aggregated Wage & Salary Analytics</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Includes salary band progression in anonymous macro policy statistics.</p>
            </div>
            <button
              onClick={() => handleToggle('wageAnalytics')}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                consent.wageAnalytics ? 'bg-brand-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  consent.wageAnalytics ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Safeguard summary */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Pseudonymous Outcome ID Guard:</strong> Personal identifiable information is masked in government macro views.
          </span>
        </div>
      </div>
    </div>
  );
};
