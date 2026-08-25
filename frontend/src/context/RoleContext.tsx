import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  guidedStep: number;
  setGuidedStep: (step: number) => void;
  isGuidedMode: boolean;
  setIsGuidedMode: (active: boolean) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('government'); // Default to Government overview for high visual impact
  const [guidedStep, setGuidedStep] = useState<number>(0);
  const [isGuidedMode, setIsGuidedMode] = useState<boolean>(false);

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        guidedStep,
        setGuidedStep,
        isGuidedMode,
        setIsGuidedMode,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
