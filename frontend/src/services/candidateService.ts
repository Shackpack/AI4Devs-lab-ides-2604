import { apiClient } from './api';

export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  education?: Education[];
  experience?: Experience[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface CreateCandidateResponse {
  message: string;
  candidate: Candidate;
}

export const candidateService = {
  async createCandidate(data: Candidate): Promise<CreateCandidateResponse> {
    return apiClient.post<CreateCandidateResponse>('/candidates', data);
  },

  async getCandidate(id: number): Promise<{ candidate: Candidate }> {
    return apiClient.get<{ candidate: Candidate }>(`/candidates/${id}`);
  },

  async updateCandidate(id: number, data: Partial<Candidate>): Promise<{ message: string; candidate: Candidate }> {
    return apiClient.put<{ message: string; candidate: Candidate }>(`/candidates/${id}`, data);
  },

  async deleteCandidate(id: number): Promise<{ message: string; candidate: Candidate }> {
    return apiClient.delete<{ message: string; candidate: Candidate }>(`/candidates/${id}`);
  },
};
