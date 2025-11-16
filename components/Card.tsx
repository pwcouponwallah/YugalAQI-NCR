
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, icon, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
            {title && (
                <div className="flex items-center mb-4">
                    {icon && <div className="mr-3">{icon}</div>}
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
