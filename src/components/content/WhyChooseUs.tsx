'use client';

'use client';

import React from 'react';
import { Key, Plane, Shield, Headphones, Clock, CreditCard } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: 'Paiement sécurisé',
    description: 'Vos données bancaires sont protégées par un cryptage SSL'
  },
  {
    id: 2,
    icon: <Headphones className="h-8 w-8 text-green-500" />,
    title: 'Assistance 24/7',
    description: 'Notre équipe est disponible à tout moment pour vous aider'
  },
  {
    id: 3,
    icon: <Plane className="h-8 w-8 text-green-500" />,
    title: 'Meilleur prix garanti',
    description: 'Nous vous remboursons la différence si vous trouvez moins cher'
  },
  {
    id: 4,
    icon: <Clock className="h-8 w-8 text-green-500" />,
    title: 'Réservation rapide',
    description: 'Complétez votre réservation en moins de 3 minutes'
  },
  {
    id: 5,
    icon: <Key className="h-8 w-8 text-green-500" />,
    title: 'Hôtels sélectionnés',
    description: 'Nous vérifions personnellement chaque hébergement'
  },
  {
    id: 6,
    icon: <CreditCard className="h-8 w-8 text-green-500" />,
    title: 'Annulation gratuite',
    description: 'Modifiez ou annulez votre réservation sans frais'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Pourquoi nous choisir</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Voyagez en toute confiance</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des milliers de voyageurs nous font confiance chaque jour pour organiser leur séjour parfait.
            Découvrez pourquoi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Section Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white md:max-w-lg">
              <h3 className="text-3xl font-bold mb-3">
                Prêt à vivre une expérience inoubliable ?
              </h3>
              <p className="text-green-100 text-lg">
                Rejoignez notre newsletter et recevez des offres exclusives et des conseils de voyage personnalisés.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="px-6 py-4 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur text-white placeholder-white/70 focus:border-white focus:ring-4 focus:ring-white/20 transition-all sm:w-72"
                />
                <button type="submit" className="px-8 py-4 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl whitespace-nowrap transform hover:scale-105">
                  Je m&apos;inscris
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
      {/* Effet de hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
          <div className="h-10 w-10 text-green-600">
            {feature.icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">{feature.description}</p>
      </div>
    </div>
  );
};

export default WhyChooseUs;