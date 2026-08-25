export type UserRole = 'trainee' | 'provider' | 'government' | 'employer';

export type EmploymentStatus = 'Employed' | 'Self-employed' | 'Apprenticeship' | 'Unemployed' | 'Further education';

export type SalaryBand = '<10K' | '10K-20K' | '20K-30K' | '30K+';

export type NonPlacementReason =
  | 'Skill gap'
  | 'No suitable jobs'
  | 'Location'
  | 'Salary mismatch'
  | 'Interview difficulty'
  | 'Personal reasons'
  | 'Further education'
  | 'Other';

export type VerificationConfidenceLevel = 'Low' | 'Medium' | 'High';

export type VerificationStatus = 'Self Reported' | 'Employer Verified' | 'Repeatedly Confirmed' | 'Rejected';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'training' | 'certification' | 'employment' | 'verification' | 'followup' | 'wage' | 'skill';
  status: 'completed' | 'current' | 'upcoming';
  metadata?: Record<string, any>;
}

export interface EmploymentOutcome {
  id: string;
  traineeId: string;
  status: EmploymentStatus;
  companyName?: string;
  roleTitle?: string;
  joiningDate?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Gig/Freelance' | 'N/A';
  salaryBand?: SalaryBand;
  location?: string;
  isRelevant?: boolean;
  nonPlacementReason?: NonPlacementReason;
  notes?: string;
  updatedAt: string;
}

export interface Trainee {
  id: string;
  outcomeId: string; // e.g. KP-10492
  name: string;
  email: string;
  district: string;
  state: string;
  courseId: string;
  courseName: string;
  providerId: string;
  providerName: string;
  enrollmentDate: string;
  certificationDate: string;
  careerPulseScore: number; // 0-100
  pulseStatus: 'Healthy' | 'Needs Attention' | 'At Risk';
  currentOutcome: EmploymentOutcome;
  verificationStatus: VerificationStatus;
  verificationConfidenceScore: number; // 0-100
  timelineEvents: TimelineEvent[];
  skillGaps: string[];
  recommendedLearning: Array<{ title: string; category: string; estHours: number }>;
  nextFollowupDue: string;
  consent: {
    employmentTracking: boolean;
    employerVerification: boolean;
    wageAnalytics: boolean;
    policyAnalytics: boolean;
  };
}

export interface Provider {
  id: string;
  name: string;
  district: string;
  state: string;
  totalTrainees: number;
  certifiedCount: number;
  reportedEmployed: number;
  verifiedEmployed: number;
  retained6M: number;
  retained12M: number;
  avgWageGrowth: number; // e.g. 18 for +18%
  outcomeConfidence: VerificationConfidenceLevel;
}

export interface Course {
  id: string;
  title: string;
  providerId: string;
  providerName: string;
  category: string;
  district: string;
  state: string;
  totalEnrolled: number;
  certifiedCount: number;
  reportedEmployed: number;
  verifiedEmployed: number;
  retained6M: number;
  retained12M: number;
  avgWageGrowth: number;
  skillsTaught: string[];
  topSkillGaps: Array<{ skill: string; percentage: number }>;
  topReasons: Array<{ reason: NonPlacementReason; percentage: number }>;
  aiRecommendation: string;
}

export interface VerificationRequest {
  id: string;
  candidateOutcomeId: string;
  candidateName: string;
  candidateEmail: string;
  courseName: string;
  role: string;
  companyName: string;
  joiningDate: string;
  employmentType: string;
  salaryBand: SalaryBand;
  status: 'Pending' | 'Verified' | 'Rejected' | 'Correction Requested';
  confidenceScore: number;
  verifiedAt?: string;
  remarks?: string;
}

export interface FollowupItem {
  id: string;
  milestoneDays: number;
  title: string;
  dueDate: string;
  status: 'Completed' | 'Pending' | 'Overdue';
  responseSummary?: string;
  completedAt?: string;
}

export interface SkillGapMatrix {
  courseTitle: string;
  taughtSkills: string[];
  demandedSkills: string[];
  highPriorityGaps: string[];
  mediumPriorityGaps: string[];
  emergingSkills: string[];
  matchedSkills: string[];
}

export interface RootCauseAnalysis {
  cohortId: string;
  courseName: string;
  district: string;
  totalUnemployed: number;
  barrierBreakdown: Array<{ barrier: NonPlacementReason; percentage: number; count: number }>;
  dominantBarrier: string;
  keySkillMissing: string;
  aiNarrativeExplanation: string;
  actionableRecommendation: string;
}

export interface CohortImpact {
  id: string;
  courseName: string;
  providerName: string;
  district: string;
  interventionDescription: string;
  beforeCohort: {
    name: string;
    size: number;
    placementRate: number;
    retained6MRate: number;
    avgSalary: string;
    detectedGap: string;
  };
  afterCohort: {
    name: string;
    size: number;
    placementRate: number;
    retained6MRate: number;
    avgSalary: string;
  };
  outcomeGain: {
    placementDelta: number; // e.g. +12%
    retentionDelta: number; // e.g. +12%
  };
}
