import React from 'react';
import { Metadata } from 'next';
import { MessageCircle, Phone, Mail, Book, CreditCard, Plane, Building, Shield, Clock, ChevronRight, Search } from 'lucide-react';
import QuickActionCard from '@/components/QuickActionCard';
import FAQItem from '@/components/FAQItem';

export const metadata: Metadata = {
  title: 'Centre d\'Aide - Alboraq | Support 24/7',
  description: 'Trouvez des réponses à vos questions et contactez notre équipe de support disponible 24h/24 et 7j/7.',
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Notre équipe est disponible 24h/24 et 7j/7 pour vous assister
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher dans l&apos;aide (ex: annulation, remboursement...)"
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            icon={<MessageCircle className="h-8 w-8" />}
            title="Chat en direct"
            description="Discutez avec un conseiller"
            action="Démarrer le chat"
            variant="primary"
          />
          <QuickActionCard
            icon={<Phone className="h-8 w-8" />}
            title="Appelez-nous"
            description="+33 1 23 45 67 89"
            action="Appeler maintenant"
            variant="secondary"
          />
          <QuickActionCard
            icon={<Mail className="h-8 w-8" />}
            title="Email"
            description="support@alboraq.com"
            action="Envoyer un email"
            variant="tertiary"
          />
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Sujets populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TopicCard
            icon={<CreditCard />}
            title="Paiement & Remboursement"
            topics={[
              'Moyens de paiement acceptés',
              'Délais de remboursement',
              'Paiement en plusieurs fois',
              'Problème de paiement'
            ]}
          />
          <TopicCard
            icon={<Plane />}
            title="Réservation de vols"
            topics={[
              'Modifier ma réservation',
              'Annuler mon vol',
              'Choisir mon siège',
              'Bagage supplémentaire'
            ]}
          />
          <TopicCard
            icon={<Building />}
            title="Réservation d&apos;hôtels"
            topics={[
              'Check-in et check-out',
              'Annulation gratuite',
              'Demandes spéciales',
              'Taxe de séjour'
            ]}
          />
          <TopicCard
            icon={<Shield />}
            title="Assurance voyage"
            topics={[
              'Couverture assurance',
              'Faire une réclamation',
              'Assistance médicale',
              'Documents nécessaires'
            ]}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>

      {/* Guides Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Guides pratiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GuideCard
            icon={<Book />}
            title="Guide du voyageur"
            description="Tout ce qu&apos;il faut savoir avant de partir"
            link="/guides/voyageur"
          />
          <GuideCard
            icon={<Clock />}
            title="Procédures d&apos;enregistrement"
            description="Check-in en ligne et à l&apos;aéroport"
            link="/guides/checkin"
          />
          <GuideCard
            icon={<Shield />}
            title="Voyager en sécurité"
            description="Conseils santé et sécurité en voyage"
            link="/guides/securite"
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-center text-gray-600 mb-8">
            Envoyez-nous votre question, nous vous répondrons dans les plus brefs délais
          </p>
          
          <form className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Réservation existante</option>
                <option>Nouvelle réservation</option>
                <option>Remboursement</option>
                <option>Réclamation</option>
                <option>Autre</option>
              </select>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez votre demande en détail..."
                required
              />
            </div>
            
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Envoyer ma demande
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  topics: string[];
}

const TopicCard: React.FC<TopicCardProps> = ({ icon, title, topics }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4 text-blue-600">
      {icon}
      <h3 className="ml-3 text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-2">
      {topics.map((topic, index) => (
        <li key={index}>
          <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ChevronRight size={16} className="mr-2" />
            <span className="text-sm">{topic}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);


interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ icon, title, description, link }) => (
  <a href={link} className="group">
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all group-hover:scale-105">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <span className="text-blue-600 font-medium flex items-center">
        Lire le guide
        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </a>
);

const faqs = [
  {
    question: "Comment puis-je annuler ma réservation ?",
    answer: "Vous pouvez annuler votre réservation depuis votre espace client ou en nous contactant directement. Les conditions d'annulation dépendent du type de réservation et du tarif choisi."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay et le virement bancaire pour certaines réservations."
  },
  {
    question: "Comment modifier ma réservation ?",
    answer: "Les modifications peuvent être effectuées depuis votre espace client. Des frais peuvent s'appliquer selon les conditions tarifaires de votre réservation."
  },
  {
    question: "Que faire si je rate mon vol ?",
    answer: "Contactez immédiatement la compagnie aérienne et notre service client. Selon votre billet, vous pourrez peut-être être replacé sur un vol ultérieur."
  },
  {
    question: "L'assurance voyage est-elle obligatoire ?",
    answer: "L'assurance voyage n'est pas obligatoire mais fortement recommandée. Elle vous protège contre les annulations, les urgences médicales et autres imprévus."
  }
];