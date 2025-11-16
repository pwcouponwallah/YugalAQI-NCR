
import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { apiService } from '../services/api';
import { getHealthRecommendations } from '../services/geminiService';
import type { AQIData, WeatherData, SourceData, ForecastData } from '../types';
import { SpinnerIcon, LeafIcon, PollutionIcon, TrafficIcon, IndustryIcon } from './icons';
import Card from './Card';

const getAQIColor = (aqi: number): string => {
    if (aqi <= 50) return '#4ade80'; // green-400
    if (aqi <= 100) return '#a3e635'; // lime-400
    if (aqi <= 200) return '#facc15'; // yellow-400
    if (aqi <= 300) return '#fb923c'; // orange-400
    if (aqi <= 400) return '#f87171'; // red-400
    return '#c084fc'; // purple-400
};

const getAQICategory = (aqi: number): string => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Satisfactory';
    if (aqi <= 200) return 'Moderate';
    if (aqi <= 300) return 'Poor';
    if (aqi <= 400) return 'Very Poor';
    return 'Severe';
};


const MainAQIDisplay: React.FC<{ aqi: number }> = ({ aqi }) => {
    const color = getAQIColor(aqi);
    const category = getAQICategory(aqi);
    return (
        <Card>
            <div className="text-center">
                <p className="text-gray-500">Current AQI - Delhi NCR</p>
                <p className="text-7xl font-bold my-2" style={{ color }}>{aqi}</p>
                <span className="px-4 py-1 text-white font-semibold rounded-full text-lg" style={{ backgroundColor: color }}>
                    {category}
                </span>
            </div>
        </Card>
    );
};

const PollutantLevels: React.FC<{ data: AQIData }> = ({ data }) => {
    const pollutants = [
        { name: 'PM2.5', value: data.pm25, unit: 'µg/m³' },
        { name: 'PM10', value: data.pm10, unit: 'µg/m³' },
        { name: 'O₃', value: data.o3, unit: 'ppb' },
        { name: 'NO₂', value: data.no2, unit: 'ppb' },
    ];

    return (
        <Card title="Pollutant Levels" icon={<PollutionIcon />}>
            <div className="grid grid-cols-2 gap-4">
                {pollutants.map(p => (
                    <div key={p.name} className="text-center bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold text-gray-700">{p.name}</p>
                        <p className="text-xl font-semibold text-blue-600">{p.value}</p>
                        <p className="text-xs text-gray-500">{p.unit}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const SourceContributionChart: React.FC<{ data: SourceData }> = ({ data }) => {
    const chartData = [
        { name: 'Stubble Burning', value: data.stubble, color: '#f59e0b' },
        { name: 'Traffic', value: data.traffic, color: '#ef4444' },
        { name: 'Industrial', value: data.industry, color: '#6b7280' },
    ];
    
    return (
        <Card title="Source Contribution" icon={<IndustryIcon />}>
            <div className="w-full h-56 flex items-center">
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5}>
                             {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                         <RechartsTooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="w-1/2 flex flex-col justify-center space-y-2 pl-4">
                    {chartData.map(item => (
                        <div key={item.name} className="flex items-center text-sm">
                            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                            <span className="text-gray-600">{item.name}:</span>
                            <span className="font-semibold ml-1">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

const ForecastChart: React.FC<{ data: ForecastData[] }> = ({ data }) => {
    return (
        <Card title="72-Hour AQI Forecast" icon={<i className="fa-solid fa-chart-line text-xl text-gray-500"></i>}>
             <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="aqi" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

const HealthRecommendations: React.FC<{ aqi: number }> = ({ aqi }) => {
    const [recommendations, setRecommendations] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            const result = await getHealthRecommendations(aqi);
            setRecommendations(result);
            setLoading(false);
        };
        fetchRecommendations();
    }, [aqi]);

    return (
        <Card title="AI Health Recommendations" icon={<LeafIcon />}>
             {loading ? (
                <div className="flex items-center justify-center h-32">
                    <SpinnerIcon /> <span className="ml-2 text-gray-500">Generating tips...</span>
                </div>
            ) : (
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: recommendations.replace(/\n/g, '<br />') }} />
            )}
        </Card>
    );
};


const Dashboard: React.FC = () => {
  const [data, setData] = useState<{ aqiData: AQIData; weatherData: WeatherData; sourceData: SourceData; forecastData: ForecastData[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiService.getAQIData();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const aqiData = useMemo(() => data?.aqiData, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerIcon />
        <p className="ml-3 text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  if (error || !data || !aqiData) {
    return <div className="text-center text-red-500">{error || "No data available."}</div>;
  }

  return (
    <div className="space-y-6">
        <MainAQIDisplay aqi={aqiData.aqi} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PollutantLevels data={aqiData} />
            <SourceContributionChart data={data.sourceData} />
        </div>
        <ForecastChart data={data.forecastData} />
        <HealthRecommendations aqi={aqiData.aqi} />
    </div>
  );
};

export default Dashboard;
