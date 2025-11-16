
export interface User {
  userID: string;
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
}

export interface AQIData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  dominantPollutant: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

export interface SourceData {
  stubble: number;
  traffic: number;
  industry: number;
}

export interface ForecastData {
  hour: string;
  aqi: number;
}

export interface Complaint {
  complaintID: string;
  type: string;
  description: string;
  status: 'Submitted' | 'In Progress' | 'Under Investigation' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  submittedAt: string;
  officerAssigned: string;
}

export type NavItem = 'dashboard' | 'report' | 'map' | 'track' | 'profile';
