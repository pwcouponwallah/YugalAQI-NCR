
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md h-16 flex items-center justify-between px-4 z-10">
            <div className="flex items-center">
                <i className="fas fa-wind text-blue-600 text-2xl"></i>
                <h1 className="text-xl font-bold text-gray-800 ml-2">AQI Monitor</h1>
            </div>
            <div className="flex items-center">
                <span className="text-gray-600 hidden sm:block">Welcome, {user.fullName}</span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold ml-3">
                    {user.fullName.charAt(0)}
                </div>
            </div>
        </header>
    );
}

export default Header;
