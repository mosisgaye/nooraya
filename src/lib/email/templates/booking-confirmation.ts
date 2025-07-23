export const bookingConfirmationTemplate = (data: {
  name: string;
  bookingRef: string;
  flight: {
    from: string;
    to: string;
    date: string;
    time: string;
    airline: string;
    flightNumber?: string;
  };
  amount: number;
  currency: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Confirmation de réservation - Nooraya Voyages</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
    .booking-ref { background: #dcfce7; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .flight-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .amount { font-size: 24px; color: #16a34a; font-weight: bold; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
    .button { background: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Confirmation de Réservation</h1>
      <p>Merci d'avoir choisi Nooraya Voyages</p>
    </div>
    
    <div class="content">
      <p>Bonjour ${data.name},</p>
      
      <p>Votre réservation de vol a été confirmée avec succès !</p>
      
      <div class="booking-ref">
        <strong>Référence de réservation :</strong><br>
        <span style="font-size: 20px; font-weight: bold;">${data.bookingRef}</span>
      </div>
      
      <div class="flight-details">
        <h3>Détails du vol</h3>
        <p><strong>Trajet :</strong> ${data.flight.from} → ${data.flight.to}</p>
        <p><strong>Date :</strong> ${data.flight.date}</p>
        <p><strong>Heure de départ :</strong> ${data.flight.time}</p>
        <p><strong>Compagnie :</strong> ${data.flight.airline}</p>
        ${data.flight.flightNumber ? `<p><strong>Numéro de vol :</strong> ${data.flight.flightNumber}</p>` : ''}
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p>Montant total payé :</p>
        <p class="amount">${data.amount.toLocaleString('fr-FR')} ${data.currency}</p>
      </div>
      
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/bookings" class="button">
          Voir ma réservation
        </a>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
        <h4 style="margin-top: 0;">Informations importantes</h4>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Présentez-vous à l'aéroport au moins 2 heures avant le départ</li>
          <li>Munissez-vous de votre passeport ou carte d'identité valide</li>
          <li>Conservez cette référence de réservation</li>
        </ul>
      </div>
    </div>
    
    <div class="footer">
      <p>Pour toute question, contactez-nous :</p>
      <p>📧 contact@noorayavoyages.com | 📞 +221 33 123 45 67</p>
      <p>© 2024 Nooraya Voyages - Tous droits réservés</p>
    </div>
  </div>
</body>
</html>
  `;
};