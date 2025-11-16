
import React from 'react';
import Card from './Card';

const MapView: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">AQI Map</h2>
                <p className="text-gray-500 mb-4">Real-time air quality across Delhi-NCR.</p>
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map Placeholder</p>
                </div>
            </Card>
            
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Safe Route Suggestion</h3>
                <p className="text-gray-500 mb-4">Find the least polluted route for your commute.</p>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="routeStart" className="block text-sm font-medium text-gray-700">Start Point</label>
                        <input type="text" id="routeStart" placeholder="e.g., Connaught Place" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"/>
                    </div>
                     <div>
                        <label htmlFor="routeEnd" className="block text-sm font-medium text-gray-700">End Point</label>
                        <input type="text" id="routeEnd" placeholder="e.g., India Gate" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"/>
                    </div>
                     <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Find Safe Route
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default MapView;
