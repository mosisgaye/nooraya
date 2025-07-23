import { Suspense } from 'react';
import FlightDetailsClient from './FlightDetailsClient';

export default function FlightDetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
    </div>}>
      <FlightDetailsClient flightId={params.id} />
    </Suspense>
  );
}