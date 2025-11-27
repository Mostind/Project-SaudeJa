export interface Vaccine {
  id: number;
  name: string;
  description: string;
  ageRange: string;
  targetAudience: string;
  preventedDiseases: string;
  details: string;
}

export interface HealthPost {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  availableVaccines?: number[];
}

export interface User {
  id: string;
  cpf: string;
}

export type RootStackParamList = {
  Login: undefined;
  MapScreen: undefined;
  VaccinesScreen: undefined;
  VaccineDetail: { vaccine: Vaccine };
};
