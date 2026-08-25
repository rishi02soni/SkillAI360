import React, { useState } from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { JudgeTourBanner } from './components/JudgeTourBanner';
import { ScoreBreakdownModal } from './components/ScoreBreakdownModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { GovernmentDashboardPage } from './pages/GovernmentDashboardPage';
import { TraineeDashboardPage } from './pages/TraineeDashboardPage';
import { TraineeOutcomeFormPage } from './pages/TraineeOutcomeFormPage';
import { TraineeFollowupsPage } from './pages/TraineeFollowupsPage';
import { EmployerDashboardPage } from './pages/EmployerDashboardPage';
import { ProviderDashboardPage } from './pages/ProviderDashboardPage';
import { CourseInsightPage } from './pages/CourseInsightPage';
import { AISkillGapPage } from './pages/AISkillGapPage';
import { AIRootCausePage } from './pages/AIRootCausePage';
import { CohortImpactPage } from './pages/CohortImpactPage';
import { PrivacySettingsPage } from './pages/PrivacySettingsPage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('government-dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('c-da-01');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleNavigate = (page: string, extraId?: string) => {
    setCurrentPage(page);
    if (extraId) setSelectedCourseId(extraId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Full Screen Standalone Views
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Guided Judge Tour Banner */}
      <JudgeTourBanner onNavigate={handleNavigate} />

      {/* Main Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {currentPage === 'government-dashboard' && <GovernmentDashboardPage onNavigate={handleNavigate} />}
          {currentPage === 'trainee-dashboard' && <TraineeDashboardPage onNavigate={handleNavigate} />}
          {currentPage === 'trainee-outcome' && <TraineeOutcomeFormPage onNavigate={handleNavigate} />}
          {currentPage === 'trainee-followups' && <TraineeFollowupsPage />}
          {currentPage === 'employer-dashboard' && <EmployerDashboardPage />}
          {currentPage === 'provider-dashboard' && <ProviderDashboardPage onNavigate={handleNavigate} />}
          {currentPage === 'course-insight' && <CourseInsightPage courseId={selectedCourseId} onNavigate={handleNavigate} />}
          {currentPage === 'ai-skill-gap' && <AISkillGapPage />}
          {currentPage === 'ai-root-cause' && <AIRootCausePage />}
          {currentPage === 'cohort-impact' && <CohortImpactPage />}
          {currentPage === 'privacy-settings' && <PrivacySettingsPage />}
        </main>
      </div>

      {/* Shared Privacy Explainer Modal */}
      <ScoreBreakdownModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <AppContent />
      </RoleProvider>
    </AuthProvider>
  );
}
