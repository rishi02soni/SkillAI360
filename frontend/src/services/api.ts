import {
  Trainee,
  EmploymentOutcome,
  VerificationRequest,
  Course,
  Provider,
  SkillGapMatrix,
  RootCauseAnalysis,
  CohortImpact
} from '../types';

import {
  demoTrainee,
  mockCourses,
  mockProviders,
  mockVerificationRequests,
  mockSkillGapMatrix,
  mockRootCauseAnalysis,
  mockCohortImpacts,
  macroGovernmentStats
} from '../data/mockData';

const STORAGE_KEYS = {
  TRAINEE: 'kaushalpulse_trainee_v1',
  VERIFICATIONS: 'kaushalpulse_verifications_v1',
  COURSES: 'kaushalpulse_courses_v1',
};

// Initialize LocalStorage with mock defaults if empty
const getStoredTrainee = (): Trainee => {
  const data = localStorage.getItem(STORAGE_KEYS.TRAINEE);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse trainee storage', e);
    }
  }
  localStorage.setItem(STORAGE_KEYS.TRAINEE, JSON.stringify(demoTrainee));
  return demoTrainee;
};

const getStoredVerifications = (): VerificationRequest[] => {
  const data = localStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse verifications storage', e);
    }
  }
  localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(mockVerificationRequests));
  return mockVerificationRequests;
};

export const apiService = {
  // --- Trainee APIs ---
  async getTraineeProfile(id?: string): Promise<Trainee> {
    // Return stored Rishi Sharma persona
    return getStoredTrainee();
  },

  async updateTraineeOutcome(outcome: Partial<EmploymentOutcome>): Promise<Trainee> {
    const trainee = getStoredTrainee();
    const updatedOutcome: EmploymentOutcome = {
      ...trainee.currentOutcome,
      ...outcome,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    let newConfidence = 40; // Self reported default
    let newStatus = trainee.verificationStatus;

    if (updatedOutcome.status === 'Employed' || updatedOutcome.status === 'Self-employed') {
      if (trainee.verificationStatus === 'Employer Verified') {
        newConfidence = 90;
      } else {
        newConfidence = 40; // Self reported
        newStatus = 'Self Reported';
      }
    } else {
      newConfidence = 60; // Confirmed non-placement
    }

    // Add timeline event
    const newEvent = {
      id: `e-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: `Outcome Updated: ${updatedOutcome.status}`,
      description: updatedOutcome.status === 'Employed'
        ? `Reported employment at ${updatedOutcome.companyName || 'Company'} as ${updatedOutcome.roleTitle || 'Role'}.`
        : `Reported current status as ${updatedOutcome.status}. Reason: ${updatedOutcome.nonPlacementReason || 'Not specified'}.`,
      type: 'employment' as const,
      status: 'completed' as const,
    };

    const updatedTrainee: Trainee = {
      ...trainee,
      currentOutcome: updatedOutcome,
      verificationConfidenceScore: newConfidence,
      verificationStatus: newStatus,
      timelineEvents: [newEvent, ...trainee.timelineEvents],
    };

    localStorage.setItem(STORAGE_KEYS.TRAINEE, JSON.stringify(updatedTrainee));
    return updatedTrainee;
  },

  async updateTraineeConsent(consent: Trainee['consent']): Promise<Trainee> {
    const trainee = getStoredTrainee();
    const updated = { ...trainee, consent };
    localStorage.setItem(STORAGE_KEYS.TRAINEE, JSON.stringify(updated));
    return updated;
  },

  // --- Employer Verification APIs ---
  async getVerificationRequests(): Promise<VerificationRequest[]> {
    return getStoredVerifications();
  },

  async updateVerificationStatus(
    requestId: string,
    status: 'Verified' | 'Rejected' | 'Correction Requested',
    remarks?: string
  ): Promise<VerificationRequest[]> {
    const requests = getStoredVerifications();
    const target = requests.find((r) => r.id === requestId);
    if (!target) throw new Error('Request not found');

    const updatedRequests = requests.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status,
          verifiedAt: new Date().toISOString().split('T')[0],
          confidenceScore: status === 'Verified' ? 90 : 30,
          remarks: remarks || r.remarks,
        };
      }
      return r;
    });

    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(updatedRequests));

    // If verifying Rahul Sharma (KP-10492), update Rahul's profile as well!
    if (target.candidateOutcomeId === 'KP-10492') {
      const trainee = getStoredTrainee();
      const updatedTrainee: Trainee = {
        ...trainee,
        verificationStatus: status === 'Verified' ? 'Employer Verified' : 'Self Reported',
        verificationConfidenceScore: status === 'Verified' ? 90 : 40,
        timelineEvents: [
          {
            id: `v-event-${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            title: `Employer Verification ${status}`,
            description: `Employer ${target.companyName} formally mark request as ${status}.`,
            type: 'verification',
            status: 'completed',
          },
          ...trainee.timelineEvents,
        ],
      };
      localStorage.setItem(STORAGE_KEYS.TRAINEE, JSON.stringify(updatedTrainee));
    }

    return updatedRequests;
  },

  // --- Analytics & Provider APIs ---
  async getGovernmentOverview() {
    return macroGovernmentStats;
  },

  async getCourses(): Promise<Course[]> {
    return mockCourses;
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    return mockCourses.find((c) => c.id === id) || mockCourses[0];
  },

  async getProviders(): Promise<Provider[]> {
    return mockProviders;
  },

  // --- AI Engines ---
  async analyzeSkillGap(courseId: string): Promise<SkillGapMatrix> {
    const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];
    return {
      ...mockSkillGapMatrix,
      courseTitle: course.title,
      taughtSkills: course.skillsTaught,
    };
  },

  async getRootCauseAnalysis(courseId: string): Promise<RootCauseAnalysis> {
    const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];
    return {
      ...mockRootCauseAnalysis,
      courseName: course.title,
      district: course.district,
    };
  },

  async getCohortImpacts(): Promise<CohortImpact[]> {
    return mockCohortImpacts;
  },
};
