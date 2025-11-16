
import React from 'react';
import type { User } from '../types';
import Card from './Card';

interface ProfileProps {
    user: User;
    onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
    return (
        <Card>
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {user.fullName.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
                 <div className="space-y-4">
                    <div className="flex">
                        <span className="w-1/3 text-gray-500 font-medium">Username</span>
                        <span className="w-2/3 text-gray-800">{user.username}</span>
                    </div>
                     <div className="flex">
                        <span className="w-1/3 text-gray-500 font-medium">Mobile</span>
                        <span className="w-2/3 text-gray-800">{user.mobile}</span>
                    </div>
                     <div className="flex">
                        <span className="w-1/3 text-gray-500 font-medium">Location</span>
                        <span className="w-2/3 text-gray-800">{user.city}, {user.state}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                 <button onClick={onLogout} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Logout
                </button>
            </div>
        </Card>
    );
};

export default Profile;
