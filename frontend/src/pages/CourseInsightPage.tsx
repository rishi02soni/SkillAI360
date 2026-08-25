import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Course } from '../types';
import { Sparkles, BrainCircuit, TrendingUp, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface CourseInsightPageProps {
  courseId?: string;
  onNavigate: (page: string) => void;
}

export const CourseInsightPage: React.FC<CourseInsightPageProps> = ({ courseId = 'c-da-01', onNavigate }) => {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    apiService.getCourseById(courseId).then((data) => setCourse(data || null));
  }, [courseId]);

  if (!course) return <div className="p-8 text-center text-slate-500">Loading Course Insights...</div>;

  const funnelData = [
    { stage: 'Enrolled', count: course.totalEnrolled },
    { stage: 'Certified', count: course.certifiedCount },
    { stage: 'Reported Employed', count: course.reportedEmployed },
    { stage: 'Verified Employed', count: course.verifiedEmployed },
    { stage: '6M Retained', count: course.retained6M },
    { stage: '12M Retained', count: course.retained12M },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('provider-dashboard')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Provider Dashboard</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase tracking-wider">
            DEEP COURSE INSIGHT
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
            {course.district} District
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{course.title}</h1>
        <p className="text-xs text-slate-500 mt-1">
          Provider: <strong className="text-slate-800">{course.providerName}</strong> | Category: {course.category}
        </p>
      </div>

      {/* AI RECOMMENDATION HERO CARD */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/30 flex items-start space-x-4">
        <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
            AI ACTIONABLE RECOMMENDATION
          </span>
          <h3 className="text-base font-extrabold text-white mt-1">Curriculum Enhancement Directive</h3>
          <p className="text-xs text-indigo-100/90 mt-1 leading-relaxed">{course.aiRecommendation}</p>
        </div>
      </div>

      {/* SECTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. OUTCOME FUNNEL */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-2">1. Outcome Retention Funnel</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0c7eff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. TOP SKILL GAPS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-2">2. Top Missing Skill Gaps</h3>
          <div className="space-y-4 mt-4">
            {course.topSkillGaps.map((sg) => (
              <div key={sg.skill}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{sg.skill}</span>
                  <span className="font-extrabold text-rose-600">{sg.percentage}% Trainees Missing</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${sg.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. NON-PLACEMENT REASONS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-2">3. Non-Placement Causes Breakdown</h3>
          <div className="space-y-3 mt-4">
            {course.topReasons.map((r) => (
              <div key={r.reason} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 text-xs">
                <span className="font-semibold text-slate-800">{r.reason}</span>
                <span className="font-extrabold text-slate-900">{r.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. WAGE PROGRESSION */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">4. Average Wage Progression</h3>
            <p className="text-xs text-slate-500">Post-training wage growth over pre-training baseline income.</p>

            <div className="mt-6 text-center">
              <div className="text-4xl font-black text-emerald-600">+{course.avgWageGrowth}%</div>
              <p className="text-xs font-bold text-slate-700 mt-1">Average Income Growth</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Salary Band shift from &lt;10K to 20K-30K</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ai-skill-gap')}
            className="mt-6 w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Open AI Skill Gap Engine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
