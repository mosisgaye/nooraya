'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ChevronRight className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} size={20} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;