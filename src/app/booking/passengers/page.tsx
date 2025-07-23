import { Suspense } from 'react';
import PassengersPageClient from './PassengersPageClient';

export default function PassengersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
    </div>}>
      <PassengersPageClient />
    </Suspense>
  );
}