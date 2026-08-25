import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Course, Provider } from '../types';
import { KpiCard } from '../components/KpiCard';
import { Users, Award, Briefcase, ShieldCheck, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ProviderDashboardPageProps {
  onNavigate: (page: string, courseId?: string) => void;
}

export const ProviderDashboardPage: React.FC<ProviderDashboardPageProps> = ({ onNavigate }) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    apiService.getProviders().then((list) => setProvider(list[0]));
    apiService.getCourses().then((list) => setCourses(list));
  }, []);

  if (!provider) return <div className="p-8 text-center text-slate-500">Loading Provider Portal...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-violet-100 text-violet-800 text-[10px] font-extrabold uppercase tracking-wider">
              TRAINING PROVIDER INTELLIGENCE
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
              {provider.name} ({provider.district})
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Provider Outcome Performance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Understand course outcome quality, 6M/12M job retention curves, and curriculum skill gaps.
          </p>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Trainees"
          value={provider.totalTrainees}
          subtext={`Certified: ${provider.certifiedCount}`}
          icon={Users}
          iconBgColor="bg-slate-100"
          iconTextColor="text-slate-700"
        />
        <KpiCard
          title="Reported Employed"
          value={provider.reportedEmployed}
          subtext="Initial placement count"
          icon={Briefcase}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />
        <KpiCard
          title="Verified Employed"
          value={provider.verifiedEmployed}
          subtext="Direct HR confirmed"
          icon={ShieldCheck}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
        <KpiCard
          title="6M Retention Rate"
          value={`${Math.round((provider.retained6M / provider.certifiedCount) * 100)}%`}
          subtext={`12M Retained: ${provider.retained12M}`}
          trend={{ value: `+${provider.avgWageGrowth}% Wage Growth`, isPositive: true }}
          icon={TrendingUp}
          iconBgColor="bg-brand-50"
          iconTextColor="text-brand-600"
        />
      </div>

      {/* COURSES LIST */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Active Skilling Courses</h3>
            <p className="text-xs text-slate-500">Select a course to inspect skill gap distribution & AI recommendations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-brand-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-brand-100 text-brand-800 px-2 py-0.5 rounded-md">
                  {course.category}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 mt-2">{course.title}</h4>
                <p className="text-xs text-slate-500 mt-1">Enrolled: {course.totalEnrolled} | Certified: {course.certifiedCount}</p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Placement</span>
                    <span className="font-extrabold text-slate-900">{Math.round((course.reportedEmployed / course.certifiedCount) * 100)}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">6M Retention</span>
                    <span className="font-extrabold text-brand-600">{Math.round((course.retained6M / course.certifiedCount) * 100)}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Wage Growth</span>
                    <span className="font-extrabold text-emerald-600">+{course.avgWageGrowth}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('course-insight', course.id)}
                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Inspect Deep Course Insights</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
