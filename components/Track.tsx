
import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Complaint } from '../types';
import Card from './Card';
import { SpinnerIcon } from './icons';

interface TrackProps {
    userId: string;
}

const statusStyles: { [key: string]: string } = {
    'Submitted': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Under Investigation': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
};

const priorityStyles: { [key: string]: string } = {
    'Low': 'text-gray-500',
    'Medium': 'text-yellow-500',
    'High': 'text-orange-500',
    'Critical': 'text-red-500',
}

const ComplaintItem: React.FC<{ complaint: Complaint }> = ({ complaint }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-gray-800">{complaint.type}</p>
                <p className="text-sm text-gray-500">{complaint.complaintID}</p>
            </div>
            <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${statusStyles[complaint.status] || ''}`}>
                {complaint.status}
            </span>
        </div>
        <p className="text-sm text-gray-600 my-2">{complaint.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Submitted: {new Date(complaint.submittedAt).toLocaleDateString()}</span>
            <span className={priorityStyles[complaint.priority]}>
                 <i className="fas fa-flag mr-1"></i> {complaint.priority}
            </span>
        </div>
    </div>
);

const Track: React.FC<TrackProps> = ({ userId }) => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComplaints = useCallback(async () => {
        try {
            setLoading(true);
            const userComplaints = await apiService.getUserComplaints(userId);
            setComplaints(userComplaints);
        } catch (err) {
            setError('Failed to fetch complaints.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);
    
    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Complaint Tracking</h2>
                    <p className="text-gray-500">Monitor the status of your reports.</p>
                </div>
                <button onClick={fetchComplaints} disabled={loading} className="text-blue-600 hover:text-blue-800 disabled:text-gray-400">
                    <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <SpinnerIcon />
                    <p className="ml-2 text-gray-500">Loading complaints...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : complaints.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <i className="fas fa-inbox fa-3x mb-3"></i>
                    <p>You haven't submitted any complaints yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {complaints.map(complaint => (
                        <ComplaintItem key={complaint.complaintID} complaint={complaint} />
                    ))}
                </div>
            )}
        </Card>
    );
};

export default Track;
