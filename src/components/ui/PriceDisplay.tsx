'use client';

import React from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { Currency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  amount: number;
  currency: Currency;
  showSecondary?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCommissionLabel?: boolean;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export function PriceDisplay({
  amount,
  currency,
  showSecondary = true,
  className,
  size = 'md',
  showCommissionLabel = false,
}: PriceDisplayProps) {
  const { currentCurrency, formatPrice } = useCurrency();

  const formattedPrice = formatPrice(amount, currency, showSecondary && currency !== currentCurrency);

  return (
    <div className={cn('price-display', className)}>
      <span className={cn(sizeClasses[size], 'font-semibold')}>
        {formattedPrice}
      </span>
      {showCommissionLabel && (
        <span className="text-xs text-green-600 block">
          Frais de service inclus
        </span>
      )}
    </div>
  );
}

export default PriceDisplay;