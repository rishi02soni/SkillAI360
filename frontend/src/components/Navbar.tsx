import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  User,
  ChevronDown,
  Settings,
  Sparkles,
  SlidersHorizontal,
  Check
} from 'lucide-react';

interface NavbarProps {
  onOpenPrivacyModal?: () => void;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPrivacyModal, onNavigate }) => {
  const { role, setRole, isGuidedMode, setIsGuidedMode } = useRole();
  const { user, login } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    login(newRole);
    setRoleDropdownOpen(false);
    setProfileDropdownOpen(false);
    if (onNavigate) {
      if (newRole === 'government') onNavigate('government-dashboard');
      else if (newRole === 'provider') onNavigate('provider-dashboard');
      else if (newRole === 'employer') onNavigate('employer-dashboard');
      else if (newRole === 'trainee') onNavigate('trainee-dashboard');
    }
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'government':
        return 'State Skilling Admin';
      case 'provider':
        return 'Training Provider';
      case 'employer':
        return 'Enterprise Employer';
      case 'trainee':
        return 'Trainee Profile';
    }
  };

  const getRoleIcon = (r: UserRole) => {
    switch (r) {
      case 'government':
        return Building2;
      case 'provider':
        return GraduationCap;
      case 'employer':
        return Briefcase;
      case 'trainee':
        return User;
    }
  };

  const ActiveIcon = getRoleIcon(role);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 lg:px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Platform Identity */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onNavigate && onNavigate('landing')}
        >
          <img
            src="/logo.png"
            alt="SkillAI360 Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400/40 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight text-white">
                SKILL<span className="text-cyan-400">AI360</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wider uppercase bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                SIH 2026 #26135
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Outcome Intelligence Platform — Post-Training Livelihood Analytics
            </p>
          </div>
        </div>

        {/* Executive Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Sleek Role Context Switcher Dropdown (Enterprise Style) */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition-all"
            >
              <ActiveIcon className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline text-slate-300">View as:</span>
              <span className="text-white font-bold">{getRoleLabel(role)}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-xs">
                <div className="px-3.5 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Portal View
                </div>
                <button
                  onClick={() => handleRoleChange('government')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 transition-colors ${
                    role === 'government' ? 'text-brand-400 font-bold bg-slate-800/50' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Building2 className="w-4 h-4 text-brand-400" />
                    <span>State Skilling Admin</span>
                  </div>
                  {role === 'government' && <Check className="w-3.5 h-3.5 text-brand-400" />}
                </button>

                <button
                  onClick={() => handleRoleChange('provider')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 transition-colors ${
                    role === 'provider' ? 'text-violet-400 font-bold bg-slate-800/50' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <GraduationCap className="w-4 h-4 text-violet-400" />
                    <span>Training Provider Portal</span>
                  </div>
                  {role === 'provider' && <Check className="w-3.5 h-3.5 text-violet-400" />}
                </button>

                <button
                  onClick={() => handleRoleChange('employer')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 transition-colors ${
                    role === 'employer' ? 'text-emerald-400 font-bold bg-slate-800/50' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <span>Enterprise Employer HR</span>
                  </div>
                  {role === 'employer' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => handleRoleChange('trainee')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 transition-colors ${
                    role === 'trainee' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Trainee Persona (Rishi)</span>
                  </div>
                  {role === 'trainee' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Sleek Presentation Tour Toggle */}
          <button
            onClick={() => setIsGuidedMode(!isGuidedMode)}
            className={`p-2 rounded-xl text-xs font-medium border transition-all ${
              isGuidedMode
                ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                : 'bg-slate-800 text-slate-400 border-slate-700/80 hover:text-slate-200'
            }`}
            title={isGuidedMode ? 'Guided Presentation Mode Active' : 'Enable Presentation Tour Guide'}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Privacy & Settings */}
          {onOpenPrivacyModal && (
            <button
              onClick={onOpenPrivacyModal}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors"
              title="Privacy & Data Governance Controls"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Profile Badge */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center shadow-inner">
              {user?.name.charAt(0)}
            </div>
            <div className="text-left hidden lg:block pr-1">
              <div className="text-xs font-bold text-slate-100 leading-tight">{user?.name}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
