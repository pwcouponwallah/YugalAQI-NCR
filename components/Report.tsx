import React, { useState, useRef } from 'react';
import Card from './Card';
import { SpinnerIcon } from './icons';
import { apiService } from '../services/api';

const Report: React.FC = () => {
    const [complaintType, setComplaintType] = useState('');
    const [severity, setSeverity] = useState('Medium');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (photos.length + e.target.files.length > 5) {
                alert('You can upload a maximum of 5 photos.');
                return;
            }
            const newPhotos: string[] = [];
            Array.from(e.target.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if(event.target?.result) {
                        newPhotos.push(event.target.result as string);
                        if(newPhotos.length === e.target.files!.length) {
                             setPhotos(prev => [...prev, ...newPhotos]);
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    }

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`);
                },
                () => {
                    alert('Unable to retrieve your location. Please enter it manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!complaintType || !description || !location) {
            setMessage({ type: 'error', text: 'Please fill all required fields.'});
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            // Fix: Removed 'severity' property as it does not exist on the Complaint type. The `priority` property is correctly used instead.
            const result = await apiService.submitComplaint({
                type: complaintType,
                description,
                priority: severity as 'Low' | 'Medium' | 'High' | 'Critical' // assuming priority matches severity for simplicity
            });
            setMessage({ type: 'success', text: `Complaint submitted! ID: ${result.complaintID}` });
            // Reset form
            setComplaintType('');
            setSeverity('Medium');
            setDescription('');
            setLocation('');
            setPhotos([]);

        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to submit complaint. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Submit a Complaint</h2>
            <p className="text-gray-500 mb-6">Report environmental violations with evidence.</p>
            
            {message && (
                <div className={`p-4 mb-4 text-sm rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700">Complaint Type</label>
                    <select id="complaintType" value={complaintType} onChange={e => setComplaintType(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option value="">Select type</option>
                        <option value="Illegal Construction">Illegal Construction</option>
                        <option value="Stubble Burning">Stubble Burning</option>
                        <option value="Industrial Pollution">Industrial Pollution</option>
                        <option value="Vehicle Emission">Vehicle Emission</option>
                        <option value="Waste Burning">Waste Burning</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity Level</label>
                    <select id="severity" value={severity} onChange={e => setSeverity(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required placeholder="e.g., Near Anand Vihar" className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                        <button type="button" onClick={handleGetLocation} className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            <i className="fas fa-location-arrow"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Describe the issue in detail..."></textarea>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Evidence Photos (Max 5)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <i className="fas fa-camera mx-auto h-12 w-12 text-gray-400"></i>
                            <div className="flex text-sm text-gray-600">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                    <span>Upload photos</span>
                                </button>
                                <input ref={fileInputRef} id="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handlePhotoUpload}/>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                     <div className="mt-2 grid grid-cols-3 gap-2">
                        {photos.map((photo, index) => (
                            <div key={index} className="relative">
                                <img src={photo} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-md"/>
                                <button onClick={() => removePhoto(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">&times;</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                    {loading && <SpinnerIcon />}
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                </button>
            </form>
        </Card>
    );
};

export default Report;