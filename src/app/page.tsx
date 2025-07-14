import Hero from '@/components/Hero';
import SpecialOffers from '@/components/SpecialOffers';
import PopularDestinations from '@/components/PopularDestinations';
import WhyChooseUs from '@/components/WhyChooseUs';

export const metadata = {
  title: 'Alboraq - Accueil | Réservez vos voyages en toute confiance',
  description: 'Bienvenue chez Alboraq, votre agence de voyage de confiance. Trouvez les meilleures offres de vols, hôtels et séjours pour vos prochaines vacances.',
  keywords: 'Alboraq, agence voyage, réservation vol, réservation hôtel, voyage pas cher, séjour tout compris',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpecialOffers />
      <PopularDestinations />
      <WhyChooseUs />
    </>
  );
}