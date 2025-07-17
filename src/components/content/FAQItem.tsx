'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemId = `faq-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={`${itemId}-content`}
        id={`${itemId}-button`}
      >
        <span className="font-medium">{question}</span>
        <ChevronRight 
          className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} 
          size={20} 
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div 
          id={`${itemId}-content`}
          className="px-6 py-4 border-t border-gray-200 bg-gray-50"
          role="region"
          aria-labelledby={`${itemId}-button`}
        >
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;