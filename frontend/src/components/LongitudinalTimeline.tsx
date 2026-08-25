import React from 'react';
import { TimelineEvent } from '../types';
import { CheckCircle2, Clock, Calendar, Award, Briefcase, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

interface LongitudinalTimelineProps {
  events: TimelineEvent[];
}

export const LongitudinalTimeline: React.FC<LongitudinalTimelineProps> = ({ events }) => {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'training':
        return Calendar;
      case 'certification':
        return Award;
      case 'employment':
        return Briefcase;
      case 'verification':
        return ShieldCheck;
      case 'followup':
        return Clock;
      case 'wage':
        return TrendingUp;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md">
            Longitudinal Tracking Engine
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            Post-Training Outcome Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous outcome tracking across training completion, verification, job retention & wage progression.
          </p>
        </div>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-200 space-y-8 my-2">
        {events.map((event, index) => {
          const Icon = getEventIcon(event.type);
          const isCompleted = event.status === 'completed';
          const isCurrent = event.status === 'current';

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Dot Icon */}
              <div
                className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? 'bg-brand-600 border-white text-white shadow-md shadow-brand-500/30'
                    : isCurrent
                    ? 'bg-amber-400 border-white text-slate-900 shadow-md animate-pulse'
                    : 'bg-slate-100 border-white text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Event Content Box */}
              <div
                className={`rounded-2xl p-4 transition-all border ${
                  isCompleted
                    ? 'bg-slate-50/80 border-slate-200/80 group-hover:border-brand-300'
                    : isCurrent
                    ? 'bg-amber-50/60 border-amber-300'
                    : 'bg-slate-50/40 border-slate-200/40 opacity-70'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {event.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurrent
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider">
                    {event.type}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 mt-1">{event.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
