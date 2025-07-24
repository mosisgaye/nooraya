'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { Currency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CurrencyOption {
  code: Currency;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: CurrencyOption[] = [
  { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', flag: '🇸🇳' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', name: 'Dollar US', symbol: '$', flag: '🇺🇸' },
];

export function CurrencySelector() {
  const { currentCurrency, switchCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrencyData = currencies.find(c => c.code === currentCurrency) || currencies[0];

  const handleCurrencyChange = (currency: Currency) => {
    switchCurrency(currency);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 hover:bg-gray-100"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentCurrencyData.flag}</span>
          <span className="font-medium">{currentCurrencyData.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => handleCurrencyChange(currency.code)}
            className={`flex items-center justify-between cursor-pointer ${
              currentCurrency === currency.code ? 'bg-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{currency.flag}</span>
              <span>{currency.name}</span>
            </div>
            <span className="text-gray-500">{currency.symbol}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CurrencySelector;