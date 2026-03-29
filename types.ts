
export enum CloudProvider {
  AWS = 'AWS',
  AZURE = 'Azure',
  GCP = 'Google Cloud',
  OVH = 'OVHcloud',
  SCALeway = 'Scaleway',
  LOCAL = 'Auto-hébergement'
}

export enum ServerRegion {
  US = 'États-Unis',
  EU = 'Union Européenne',
  ASIA = 'Asie',
  FRANCE = 'France'
}

export interface EcologicalScoring {
  carbonFootprint: number;
  pue: number;
  renewableEnergyRatio: number;
  ecoDesignScore: number;
}

export interface SovereigntyScoring {
  hostingLocation: ServerRegion;
  provider: CloudProvider;
  gdprCompliance: boolean;
  legalJurisdiction: string;
  sovereigntyScore: number;
}

export interface CourseLesson {
  title: string;
  content: string;
  duration?: string;
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  description: string;
  skills: string[];
  ecoScore: EcologicalScoring;
  sovereignty: SovereigntyScoring;
  rating: number;
  isValidated: boolean;
  authorId?: string;
  modules?: CourseModule[];
}

export type UserRole = 'user' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  full_name: string;
  persona: string;
  role: UserRole;
  updated_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
