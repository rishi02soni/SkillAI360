import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, User, Building2, GraduationCap, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { setRole } = useRole();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('government');
  const [email, setEmail] = useState('nodal.officer@cg.gov.in');
  const [password, setPassword] = useState('demo1234');

  const handleDemoLogin = (role: UserRole) => {
    setRole(role);
    login(role);
    if (role === 'government') onNavigate('government-dashboard');
    else if (role === 'provider') onNavigate('provider-dashboard');
    else if (role === 'employer') onNavigate('employer-dashboard');
    else if (role === 'trainee') onNavigate('trainee-dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="SkillAI360 Logo"
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/40 shadow-xl shadow-cyan-500/30 mx-auto mb-3"
          />
          <h2 className="text-2xl font-black text-white">SkillAI360 Login</h2>
          <p className="text-xs text-slate-400 mt-1">
            Post-Training Outcome Tracking & Intelligence Platform
          </p>
        </div>

        {/* 1-CLICK DEMO PERSONA QUICK LOGIN BUTTONS */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 mb-6">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>1-Click Presentation Demo Login</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('government')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-600/30 border border-slate-700 hover:border-brand-400 text-left transition-all text-xs group"
            >
              <div className="flex items-center space-x-2 text-brand-400 font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Government</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">Nodal Officer</span>
            </button>

            <button
              onClick={() => handleDemoLogin('trainee')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-600/30 border border-slate-700 hover:border-amber-400 text-left transition-all text-xs group"
            >
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <User className="w-3.5 h-3.5" />
                <span>Trainee</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">Rishi Sharma</span>
            </button>

            <button
              onClick={() => handleDemoLogin('provider')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-violet-600/30 border border-slate-700 hover:border-violet-400 text-left transition-all text-xs group"
            >
              <div className="flex items-center space-x-2 text-violet-400 font-bold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Provider</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">SkillForward Admin</span>
            </button>

            <button
              onClick={() => handleDemoLogin('employer')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-400 text-left transition-all text-xs group"
            >
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Employer</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">TechSolutions HR</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="government">Government / Program Admin</option>
              <option value="trainee">Trainee (Rishi Sharma)</option>
              <option value="provider">Training Provider</option>
              <option value="employer">Employer HR Portal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>Sign In to Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
