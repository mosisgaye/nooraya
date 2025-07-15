'use client';

import { useState, useEffect, useCallback } from 'react';

interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  focusVisible: boolean;
}

const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    focusVisible: true
  });

  useEffect(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const largeTextQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreferences = () => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: reducedMotionQuery.matches,
        highContrast: highContrastQuery.matches,
        largeText: largeTextQuery.matches
      }));
    };

    // Initial check
    updatePreferences();

    // Listen for changes
    reducedMotionQuery.addEventListener('change', updatePreferences);
    highContrastQuery.addEventListener('change', updatePreferences);
    largeTextQuery.addEventListener('change', updatePreferences);

    // Check for stored preferences
    const storedPreferences = localStorage.getItem('accessibilityPreferences');
    if (storedPreferences) {
      try {
        const parsed = JSON.parse(storedPreferences);
        setPreferences(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse stored accessibility preferences:', error);
      }
    }

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences);
      highContrastQuery.removeEventListener('change', updatePreferences);
      largeTextQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  const updatePreference = (key: keyof AccessibilityPreferences, value: boolean) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: value };
      localStorage.setItem('accessibilityPreferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  };

  const applyPreferences = useCallback(() => {
    const root = document.documentElement;
    
    // Apply reduced motion
    if (preferences.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // Apply high contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply large text
    if (preferences.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Apply focus visible
    if (preferences.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
  }, [preferences]);

  useEffect(() => {
    applyPreferences();
  }, [applyPreferences]);

  return {
    preferences,
    updatePreference,
    applyPreferences
  };
};

export default useAccessibilityPreferences;