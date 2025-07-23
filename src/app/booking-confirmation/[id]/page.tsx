import { Suspense } from 'react';
import BookingConfirmationClient from './BookingConfirmationClient';

export default async function BookingConfirmationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <BookingConfirmationClient bookingId={id} />
    </Suspense>
  );
}