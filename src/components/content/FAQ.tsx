'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Plane, CreditCard, Calendar, Users, Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'reservation' | 'paiement' | 'modification' | 'bagages' | 'general';
  icon: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Comment puis-je modifier ou annuler ma réservation de vol ?",
    answer: "Vous pouvez modifier ou annuler votre réservation directement depuis votre espace client ou en nous contactant au +221 77 986 70 37. Les conditions de modification dépendent du tarif choisi et de la compagnie aérienne. Certains billets permettent des modifications gratuites, d'autres appliquent des frais. Nous vous assistons dans toutes vos démarches pour minimiser les coûts.",
    category: 'modification',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    id: 2,
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons plusieurs moyens de paiement pour votre confort : Wave, Orange Money, Free Money, cartes bancaires (Visa, Mastercard), virements bancaires et paiement en espèces dans nos agences. Le paiement est sécurisé et vous recevez une confirmation immédiate par email et SMS.",
    category: 'paiement',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    id: 3,
    question: "Quelle est la politique concernant les bagages ?",
    answer: "La franchise bagages varie selon la compagnie aérienne et la classe de voyage. En général : Économie (23kg en soute + 7kg en cabine), Business (32kg en soute + 2x7kg en cabine). Les bagages supplémentaires sont facturés selon les tarifs de la compagnie. Nous vous informons précisément de votre franchise lors de la réservation.",
    category: 'bagages',
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 4,
    question: "Comment obtenir un remboursement en cas d'annulation de vol ?",
    answer: "En cas d'annulation par la compagnie aérienne, vous avez droit à un remboursement intégral ou un vol de remplacement. Nous gérons toute la procédure pour vous. Pour une annulation de votre part, les conditions dépendent du type de billet. Les billets flexibles permettent souvent un remboursement partiel. Nous vous accompagnons pour obtenir le maximum possible.",
    category: 'modification',
    icon: <AlertCircle className="w-6 h-6" />
  },
  {
    id: 5,
    question: "Dois-je imprimer mon billet d'avion ?",
    answer: "La plupart des compagnies acceptent les billets électroniques sur smartphone. Cependant, nous recommandons d'avoir une copie imprimée par sécurité. Certains pays exigent encore un billet papier à l'immigration. Nous vous envoyons toujours votre e-ticket par email et WhatsApp pour plus de commodité.",
    category: 'reservation',
    icon: <Plane className="w-6 h-6" />
  },
  {
    id: 6,
    question: "Comment fonctionne l'enregistrement en ligne ?",
    answer: "L'enregistrement en ligne ouvre généralement 24-48h avant le départ. Vous recevrez un rappel de notre part avec le lien direct. L'enregistrement en ligne permet de choisir votre siège et d'obtenir votre carte d'embarquement. À l'aéroport, vous pourrez déposer vos bagages au comptoir dédié, évitant ainsi les longues files d'attente.",
    category: 'general',
    icon: <Clock className="w-6 h-6" />
  },
  {
    id: 7,
    question: "Que faire en cas de retard ou d'annulation de mon vol ?",
    answer: "Contactez-nous immédiatement au +221 77 986 70 37 (disponible 24/7). Nous vous assistons pour : trouver un vol alternatif, obtenir une compensation si éligible, gérer l'hébergement si nécessaire, modifier vos correspondances. Conservez tous vos reçus pour les remboursements. Votre protection est notre priorité.",
    category: 'general',
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 8,
    question: "Comment voyager avec des enfants ou des bébés ?",
    answer: "Les enfants de moins de 2 ans voyagent généralement sur les genoux des parents avec un tarif réduit (10-25% du prix adulte). De 2 à 11 ans, ils bénéficient souvent de réductions. Nous pouvons réserver des services spéciaux : sièges familiaux groupés, repas enfants, assistance aéroport, poussettes en cabine. Informez-nous de vos besoins lors de la réservation.",
    category: 'general',
    icon: <Users className="w-6 h-6" />
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', label: 'Toutes', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'reservation', label: 'Réservation', icon: <Plane className="w-4 h-4" /> },
    { id: 'paiement', label: 'Paiement', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'modification', label: 'Modification', icon: <Calendar className="w-4 h-4" /> },
    { id: 'bagages', label: 'Bagages', icon: <Users className="w-4 h-4" /> },
    { id: 'general', label: 'Général', icon: <Shield className="w-4 h-4" /> }
  ];

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative">
      {/* Décoration de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Centre d&apos;aide</span>
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement des réponses à vos questions sur les réservations, modifications et politiques de voyage
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Liste des questions */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    openItems.includes(item.id)
                      ? 'bg-gradient-to-br from-emerald-100 to-green-100'
                      : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-emerald-50 group-hover:to-green-50'
                  }`}>
                    <div className={`transition-colors duration-300 ${
                      openItems.includes(item.id) ? 'text-emerald-600' : 'text-gray-600'
                    }`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-8 pb-6 animate-fadeIn">
                  <div className="pl-16 pr-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Cette information vous a-t-elle été utile ?</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section de contact */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </h3>
          <p className="text-lg mb-8 text-emerald-50">
            Notre équipe est là pour vous aider 24h/24 et 7j/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+221779867037"
              className="inline-flex items-center justify-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appeler maintenant
            </a>
            <a
              href="https://wa.me/221779867037"
              className="inline-flex items-center justify-center gap-3 bg-emerald-700 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}