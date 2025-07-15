'use client';

import { useEffect, useRef } from 'react';

interface UseAnnouncementOptions {
  priority?: 'polite' | 'assertive';
  delay?: number;
}

const useAnnouncement = () => {
  const announcementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the announcement container if it doesn't exist
    if (!announcementRef.current) {
      const container = document.createElement('div');
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      container.setAttribute('aria-relevant', 'additions text');
      container.style.position = 'absolute';
      container.style.left = '-10000px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
      announcementRef.current = container;
    }

    return () => {
      if (announcementRef.current) {
        document.body.removeChild(announcementRef.current);
        announcementRef.current = null;
      }
    };
  }, []);

  const announce = (message: string, options: UseAnnouncementOptions = {}) => {
    const { priority = 'polite', delay = 100 } = options;
    
    if (!announcementRef.current) return;

    // Set the priority
    announcementRef.current.setAttribute('aria-live', priority);
    
    // Clear previous content
    announcementRef.current.textContent = '';
    
    // Add the new message with a slight delay to ensure it's announced
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = message;
      }
    }, delay);
  };

  return { announce };
};

export default useAnnouncement;