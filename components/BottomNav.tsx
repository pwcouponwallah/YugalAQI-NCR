
import React from 'react';
import type { NavItem } from '../types';

interface BottomNavProps {
    activeNav: NavItem;
    setActiveNav: (nav: NavItem) => void;
}

const navItems: { id: NavItem, icon: string, label: string }[] = [
    { id: 'dashboard', icon: 'fa-home', label: 'Home' },
    { id: 'report', icon: 'fa-bullhorn', label: 'Report' },
    { id: 'map', icon: 'fa-map-marked-alt', label: 'Map' },
    { id: 'track', icon: 'fa-tasks', label: 'Track' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeNav, setActiveNav }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] h-16 flex justify-around items-center z-10">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${activeNav === item.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                >
                    <i className={`fas ${item.icon} text-xl`}></i>
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default BottomNav;
