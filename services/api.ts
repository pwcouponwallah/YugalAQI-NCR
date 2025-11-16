
import type { User, AQIData, WeatherData, SourceData, ForecastData, Complaint } from '../types';

// Mock API Service
class ApiService {
  private simulateDelay = (delay: number) => new Promise(res => setTimeout(res, delay));

  async login(username: string, password?: string): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.simulateDelay(500);
    if (username === 'demo' && password === 'demo123') {
      return {
        success: true,
        user: {
          userID: 'USR1001',
          username: 'demo',
          fullName: 'Demo User',
          email: 'demo@example.com',
          mobile: '9876543210',
          city: 'Delhi',
          state: 'Delhi',
        },
      };
    }
    return { success: false, error: 'Invalid username or password' };
  }
  
  async register(fullName: string, username: string, email:string): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.simulateDelay(1000);
     return {
        success: true,
        user: {
          userID: `USR${Math.floor(Math.random() * 1000)}`,
          username: username,
          fullName: fullName,
          email: email,
          mobile: '9999999999',
          city: 'Delhi',
          state: 'Delhi',
        },
      };
  }

  async getAQIData(): Promise<{ aqiData: AQIData; weatherData: WeatherData; sourceData: SourceData; forecastData: ForecastData[] }> {
    await this.simulateDelay(800);
    return {
      aqiData: {
        aqi: 388,
        pm25: 210,
        pm10: 390,
        o3: 50,
        no2: 75,
        so2: 9,
        co: 1.8,
        dominantPollutant: 'PM2.5',
      },
      weatherData: {
        temperature: 28,
        humidity: 45,
        windSpeed: 2.1,
        visibility: 1.5,
      },
      sourceData: {
        stubble: 40,
        traffic: 40,
        industry: 20,
      },
      forecastData: [
        { hour: 'Now', aqi: 388 },
        { hour: '+12h', aqi: 370 },
        { hour: '+24h', aqi: 410 },
        { hour: '+36h', aqi: 395 },
        { hour: '+48h', aqi: 380 },
        { hour: '+60h', aqi: 360 },
        { hour: '+72h', aqi: 350 },
      ],
    };
  }
  
  async submitComplaint(complaint: Omit<Complaint, 'complaintID' | 'submittedAt' | 'officerAssigned'| 'status'>): Promise<{ success: boolean, complaintID: string, assignedOfficer: string }> {
    await this.simulateDelay(1200);
    return {
        success: true,
        complaintID: `CMP${Math.floor(1000 + Math.random() * 9000)}`,
        assignedOfficer: 'Officer Priya Singh'
    }
  }

  async getUserComplaints(userId: string): Promise<Complaint[]> {
    await this.simulateDelay(700);
    return [
       {
        complaintID: 'CMP2001',
        type: 'Waste Burning',
        description: 'Large pile of garbage being burned at night in Chandni Chowk.',
        status: 'In Progress',
        priority: 'High',
        submittedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        officerAssigned: 'Officer Sharma',
      },
      {
        complaintID: 'CMP2002',
        type: 'Construction Dust',
        description: 'Construction site in Cyber City not using water sprinklers, causing massive dust clouds.',
        status: 'Submitted',
        priority: 'Medium',
        submittedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        officerAssigned: 'Unassigned',
      },
       {
        complaintID: 'CMP2003',
        type: 'Stubble Burning',
        description: 'Visible smoke from stubble burning near GT Karnal Road.',
        status: 'Resolved',
        priority: 'Critical',
        submittedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        officerAssigned: 'Officer Singh',
      },
    ];
  }
}

export const apiService = new ApiService();
