import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const DEMO_USERS: Record<UserRole, AuthUser> = {
  trainee: {
    id: 't-10492',
    name: 'Rishi Sharma',
    email: 'rishi.sharma@example.com',
    role: 'trainee',
  },
  provider: {
    id: 'p-sf-01',
    name: 'SkillForward Institute Admin',
    email: 'admin@skillforward.org',
    role: 'provider',
  },
  government: {
    id: 'gov-01',
    name: 'State Skilling Nodal Officer',
    email: 'nodal.officer@cg.gov.in',
    role: 'government',
  },
  employer: {
    id: 'emp-01',
    name: 'TechSolutions HR Manager',
    email: 'hr@techsolutions.in',
    role: 'employer',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(DEMO_USERS.government);

  const login = (role: UserRole) => {
    setUser(DEMO_USERS[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
