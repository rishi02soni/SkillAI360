import React from 'react';
import { useRole } from '../context/RoleContext';
import {
  LayoutDashboard,
  UserCheck,
  ClipboardList,
  Clock,
  Briefcase,
  BrainCircuit,
  AlertTriangle,
  BarChart3,
  GitCompare,
  Settings,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { role } = useRole();

  const getMenuItems = (): MenuItem[] => {
    const common: MenuItem[] = [
      { id: 'landing', label: 'Public Platform', icon: BookOpen, roles: ['government', 'provider', 'employer', 'trainee'] },
    ];

    if (role === 'government') {
      return [
        ...common,
        { id: 'government-dashboard', label: 'Government Impact', icon: LayoutDashboard, roles: ['government'] },
        { id: 'ai-skill-gap', label: 'AI Skill Gap Engine', icon: BrainCircuit, roles: ['government'] },
        { id: 'ai-root-cause', label: 'AI Root Cause Analysis', icon: AlertTriangle, roles: ['government'] },
        { id: 'cohort-impact', label: 'Cohort Comparison (HERO)', icon: GitCompare, roles: ['government'], badge: 'HERO' },
        { id: 'provider-dashboard', label: 'Provider Benchmarks', icon: Award, roles: ['government'] },
        { id: 'employer-dashboard', label: 'Employer Verification', icon: Briefcase, roles: ['government'] },
        { id: 'privacy-settings', label: 'Consent & Privacy', icon: Settings, roles: ['government'] },
      ];
    }

    if (role === 'provider') {
      return [
        ...common,
        { id: 'provider-dashboard', label: 'Provider Dashboard', icon: LayoutDashboard, roles: ['provider'] },
        { id: 'course-insight', label: 'Course Insights', icon: BarChart3, roles: ['provider'] },
        { id: 'ai-skill-gap', label: 'Skill Gap Intelligence', icon: BrainCircuit, roles: ['provider'] },
        { id: 'ai-root-cause', label: 'Root Cause Engine', icon: AlertTriangle, roles: ['provider'] },
        { id: 'cohort-impact', label: 'Cohort Impact (Before/After)', icon: GitCompare, roles: ['provider'] },
        { id: 'privacy-settings', label: 'Consent & Audit', icon: Settings, roles: ['provider'] },
      ];
    }

    if (role === 'employer') {
      return [
        ...common,
        { id: 'employer-dashboard', label: 'Verification Portal', icon: Briefcase, roles: ['employer'], badge: 'Inbox' },
        { id: 'ai-skill-gap', label: 'Market Skill Demand', icon: BrainCircuit, roles: ['employer'] },
        { id: 'privacy-settings', label: 'Privacy Policy', icon: Settings, roles: ['employer'] },
      ];
    }

    // Trainee Role (Rishi Sharma)
    return [
      ...common,
      { id: 'trainee-dashboard', label: 'My Career Pulse', icon: Flame, roles: ['trainee'], badge: '84/100' },
      { id: 'trainee-outcome', label: 'Update Outcome', icon: ClipboardList, roles: ['trainee'] },
      { id: 'trainee-followups', label: 'Follow-up Schedule', icon: Clock, roles: ['trainee'] },
      { id: 'ai-skill-gap', label: 'My Recommended Skills', icon: BrainCircuit, roles: ['trainee'] },
      { id: 'privacy-settings', label: 'My Consent Panel', icon: Settings, roles: ['trainee'] },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between hidden md:flex border-r border-slate-800 shadow-inner">
      <div className="space-y-6">
        {/* Navigation Header */}
        <div>
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Navigation — {role.toUpperCase()}
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-semibold'
                      : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${
                        item.badge === 'HERO'
                          ? 'bg-amber-400 text-slate-900'
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 5-Action Core Philosophy Badge */}
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <p className="text-[11px] font-extrabold text-brand-400 uppercase tracking-wider mb-2">
            5-Action Outcome Cycle
          </p>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div className="flex items-center justify-between">
              <span>1. TRACK</span>
              <span className="text-slate-500 text-[10px]">Longitudinal</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2. VERIFY</span>
              <span className="text-slate-500 text-[10px]">Employer Signal</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3. MEASURE</span>
              <span className="text-slate-500 text-[10px]">Career Pulse</span>
            </div>
            <div className="flex items-center justify-between">
              <span>4. UNDERSTAND</span>
              <span className="text-slate-500 text-[10px]">AI Root Cause</span>
            </div>
            <div className="flex items-center justify-between">
              <span>5. IMPROVE</span>
              <span className="text-slate-500 text-[10px]">Cohort Impact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
        <p className="font-semibold text-slate-400">SkillAI360 Outcome Engine</p>
        <p className="mt-0.5">SIH 2026 Problem Statement 26135</p>
      </div>
    </aside>
  );
};
