import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { KpiCard } from '../components/KpiCard';
import { OutcomeConfidenceBadge } from '../components/OutcomeConfidenceBadge';
import {
  Users,
  Award,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Filter,
  ArrowRight,
  BrainCircuit,
  GitCompare,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface GovernmentDashboardPageProps {
  onNavigate: (page: string) => void;
}

export const GovernmentDashboardPage: React.FC<GovernmentDashboardPageProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<any>(null);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('all');

  useEffect(() => {
    apiService.getGovernmentOverview().then((data) => setStats(data));
  }, []);

  if (!stats) return <div className="p-8 text-center text-slate-500">Loading Government Analytics...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header & Filter Bar */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase tracking-wider">
              Nodal Executive Dashboard
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Macro Trainee Cohort (5,000)
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1">
            Government Impact & Outcome Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Longitudinal measurement of skilling programs, employer verification signals, retention & wage progression.
          </p>
        </div>

        {/* Multi-Dimensional Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs">
          <Filter className="w-4 h-4 text-slate-400 ml-1" />
          <select
            value={selectedDistrictFilter}
            onChange={(e) => setSelectedDistrictFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Districts (20)</option>
            <option value="bhilai">Bhilai District</option>
            <option value="raipur">Raipur District</option>
            <option value="durg">Durg District</option>
          </select>

          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Courses (30)</option>
            <option value="da">Data Analytics & Visualization</option>
            <option value="ev">EV Technician</option>
            <option value="wd">Web Development</option>
          </select>
        </div>
      </div>

      {/* TOP KPI CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KpiCard
          title="Total Trainees Enrolled"
          value={stats.totalTrainees.toLocaleString()}
          subtext="Certified: 4,620 (92.4%)"
          icon={Users}
          iconBgColor="bg-slate-100"
          iconTextColor="text-slate-700"
        />
        <KpiCard
          title="Reported Employment"
          value={`${stats.reportedEmploymentRate}%`}
          subtext={`${stats.reportedEmployed} Trainees`}
          trend={{ value: '+4.2% YoY', isPositive: true }}
          icon={Briefcase}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />
        <KpiCard
          title="Verified Employment"
          value={`${stats.verifiedEmploymentRate}%`}
          subtext={`${stats.verifiedEmployed} Confirmed by HR`}
          trend={{ value: '82.7% Ver. Ratio', isPositive: true }}
          icon={ShieldCheck}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
        <KpiCard
          title="6-Month Retention Rate"
          value={`${stats.retention6MRate}%`}
          subtext="12M Retention: 51.9%"
          trend={{ value: 'Key Outcome', isPositive: true }}
          icon={TrendingUp}
          iconBgColor="bg-brand-50"
          iconTextColor="text-brand-600"
        />
      </div>

      {/* HERO SHORTCUT BANNER FOR JUDGES */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <GitCompare className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
              HERO HACKATHON FEATURE
            </span>
            <h3 className="text-lg font-extrabold text-white mt-1">
              Cohort Impact Comparison (Before vs After Intervention)
            </h3>
            <p className="text-xs text-indigo-200/80 mt-0.5">
              Observe how AI-detected Power BI skill gap interventions led to a +12% placement jump and +12% retention increase.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('cohort-impact')}
          className="px-5 py-3 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs hover:bg-amber-300 transition-all flex items-center space-x-2 shrink-0 shadow-lg"
        >
          <span>View Cohort Before/After</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. OUTCOME FUNNEL CHART */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Longitudinal Outcome Funnel
              </h3>
              <p className="text-xs text-slate-500">Enrolled → Certified → Reported → Verified → 6M Retained</p>
            </div>
            <button
              onClick={() => onNavigate('ai-root-cause')}
              className="text-xs text-brand-600 font-bold hover:underline flex items-center space-x-1"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Inspect Drop-off Causes</span>
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyFunnel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="certified" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Certified" />
                <Bar dataKey="employed" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Reported Employed" />
                <Bar dataKey="verified" fill="#10b981" radius={[4, 4, 0, 0]} name="Employer Verified" />
                <Bar dataKey="retained6M" fill="#0c7eff" radius={[4, 4, 0, 0]} name="6M Retained" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. NON-PLACEMENT BARRIERS PIE CHART */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Non-Placement Causes
              </h3>
              <p className="text-xs text-slate-500">Aggregated trainee barrier feedback</p>
            </div>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.barrierTotals}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {stats.barrierTotals.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
            {stats.barrierTotals.map((item: any) => (
              <div key={item.name} className="flex justify-between items-center text-slate-600">
                <span className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROVIDER BENCHMARK MATRIX TABLE */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md">
              Evidence-Based Governance
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Provider Quality Benchmarks
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Highlighting that initial placement rates do NOT equate to long-term outcome quality.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium max-w-sm">
            <strong>Key Insight:</strong> TechShiksha reported 69% placement, but 6M retention dropped to 42% due to TypeScript skill gaps.
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Training Provider</th>
                <th className="py-3 px-4">Placement %</th>
                <th className="py-3 px-4">Verified %</th>
                <th className="py-3 px-4">6M Retention</th>
                <th className="py-3 px-4">12M Retention</th>
                <th className="py-3 px-4">Avg Wage Growth</th>
                <th className="py-3 px-4">Outcome Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {stats.providerComparison.map((p: any) => (
                <tr key={p.provider} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{p.provider}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{p.placement}%</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">{p.verified}%</td>
                  <td className="py-3.5 px-4 font-bold text-brand-600">{p.retention6M}%</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.retention12M}%</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-600">{p.wageGrowth}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        p.confidence === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.confidence === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {p.confidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
