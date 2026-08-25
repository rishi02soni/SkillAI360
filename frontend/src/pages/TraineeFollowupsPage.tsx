import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { mockFollowups } from '../data/mockData';
import { FollowupItem } from '../types';
import { Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

export const TraineeFollowupsPage: React.FC = () => {
  const [followups, setFollowups] = useState<FollowupItem[]>(mockFollowups);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase tracking-wider">
            LONGITUDINAL SCHEDULE
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
          Post-Training Follow-up Schedule
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          KaushalPulse reaches out at 30, 90, 180, and 365 days post-certification to verify long-term livelihood outcomes.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {followups.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl p-6 border transition-all ${
              item.status === 'Completed'
                ? 'bg-white border-emerald-200 shadow-sm'
                : 'bg-white border-amber-200 shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-slate-100 text-slate-800">
                {item.milestoneDays}-Day Check
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  item.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {item.status}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 mt-3">{item.title}</h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Target Date: {item.dueDate}</span>
            </p>

            {item.responseSummary && (
              <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <strong>Response Recorded:</strong> {item.responseSummary}
              </div>
            )}

            {item.status === 'Pending' && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Due in 12 days</span>
                </span>
                <button className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Complete Pulse Check
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
