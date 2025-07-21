import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, pack } = body;

    // Validation des données
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email
    // Pour Gmail, vous devez :
    // 1. Activer l'authentification à 2 facteurs
    // 2. Générer un mot de passe d'application : https://myaccount.google.com/apppasswords
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'contact@noorayagroup.com',
        pass: process.env.GMAIL_APP_PASSWORD || '', // Mot de passe d'application Gmail
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: `"Site Nooraya Voyages" <${process.env.GMAIL_USER || 'contact@noorayagroup.com'}>`,
      to: 'contact@noorayagroup.com',
      subject: `Nouvelle demande Umra - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            Nouvelle demande de réservation Umra
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informations du client:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Nom:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}" style="color: #16a34a;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Téléphone:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${phone}" style="color: #16a34a;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Pack souhaité:</td>
                <td style="padding: 8px 0;">${pack || 'Non spécifié'}</td>
              </tr>
            </table>
          </div>
          
          ${message ? `
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; line-height: 1.6;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
            <p>Email envoyé depuis le formulaire de contact du site Nooraya Voyages</p>
            <p>${new Date().toLocaleString('fr-FR')}</p>
          </div>
        </div>
      `,
      text: `
Nouvelle demande de réservation Umra

Informations du client:
- Nom: ${name}
- Email: ${email}
- Téléphone: ${phone}
- Pack souhaité: ${pack || 'Non spécifié'}

Message:
${message || 'Aucun message supplémentaire'}

---
Email envoyé depuis le formulaire de contact du site Nooraya Voyages
${new Date().toLocaleString('fr-FR')}
      `.trim(),
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Optionnel : Envoyer un email de confirmation au client
    const confirmationMail = {
      from: `"Nooraya Voyages" <${process.env.GMAIL_USER || 'contact@noorayagroup.com'}>`,
      to: email,
      subject: 'Confirmation de votre demande - Nooraya Voyages',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Assalamu alaikum ${name},</h2>
          <p>Nous avons bien reçu votre demande concernant nos offres Umra.</p>
          <p>Un de nos conseillers vous contactera dans les plus brefs délais pour discuter de votre projet de voyage.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Récapitulatif de votre demande:</h4>
            <p><strong>Pack souhaité:</strong> ${pack || 'À définir'}</p>
            ${message ? `<p><strong>Votre message:</strong> ${message}</p>` : ''}
          </div>
          
          <p>En attendant, n'hésitez pas à nous contacter directement:</p>
          <ul>
            <li>📞 +221 77 986 70 37</li>
            <li>📞 +221 76 614 43 37</li>
            <li>📧 contact@noorayagroup.com</li>
          </ul>
          
          <p>Qu'Allah facilite votre voyage.</p>
          <p><strong>L'équipe Nooraya Voyages</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMail);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre demande a été envoyée avec succès. Vous recevrez un email de confirmation.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer ou nous contacter directement.' 
      },
      { status: 500 }
    );
  }
}