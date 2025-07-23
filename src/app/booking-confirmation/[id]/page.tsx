import { Suspense } from 'react';
import BookingConfirmationClient from './BookingConfirmationClient';

export default function BookingConfirmationPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <BookingConfirmationClient bookingId={params.id} />
    </Suspense>
  );
}