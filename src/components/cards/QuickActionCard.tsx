'use client';

import React from 'react';

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  variant: 'primary' | 'secondary' | 'tertiary';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, title, description, action, variant }) => {
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-green-600 text-white hover:bg-green-700',
    tertiary: 'bg-purple-600 text-white hover:bg-purple-700'
  };

  return (
    <article className={`rounded-2xl p-6 text-center shadow-lg transition-all hover:scale-105 ${variants[variant]}`} role="article">
      <div className="flex justify-center mb-4" aria-hidden="true">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4 opacity-90">{description}</p>
      <button 
        className="bg-white/20 backdrop-blur px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label={`${action} - ${title}`}
      >
        {action}
      </button>
    </article>
  );
};

export default QuickActionCard;