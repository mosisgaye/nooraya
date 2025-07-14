export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
  }
  
  export function formatCurrency(amount: number, currency: string = 'EUR') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }
  
  export function formatDate(date: Date | string) {
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
  }