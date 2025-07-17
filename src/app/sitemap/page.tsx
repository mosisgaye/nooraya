import React from 'react';
import { Metadata } from 'next';
import { Map, Plane, Building, HelpCircle, FileText, Users, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plan du site - Nooraya Voyages',
  description: 'Retrouvez toutes les pages et sections du site Nooraya Voyages.',
};

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Services principaux',
      icon: <Plane className="h-6 w-6" />,
      links: [
        { name: 'Accueil', href: '/' },
        { name: 'Vols', href: '/flights' },
        { name: 'Hôtels', href: '/hotels' },
        { name: 'Packages', href: '/packages' },
        { name: 'Transferts aéroport', href: '/transfers' },
        { name: 'Assurance voyage', href: '/insurance' },
        { name: 'Offres spéciales', href: '/offers' }
      ]
    },
    {
      title: 'Destinations',
      icon: <Map className="h-6 w-6" />,
      links: [
        { name: 'Sénégal', href: '/senegal' },
        { name: 'Guides de voyage', href: '/guides' },
        { name: 'Guide du voyageur', href: '/guides/voyageur' },
        { name: 'Procédures check-in', href: '/guides/checkin' },
        { name: 'Sécurité en voyage', href: '/guides/securite' }
      ]
    },
    {
      title: 'Espace client',
      icon: <Users className="h-6 w-6" />,
      links: [
        { name: 'Mon compte', href: '/profile' },
        { name: 'Connexion', href: '/login' },
        { name: 'Inscription', href: '/register' },
        { name: 'Confirmation email', href: '/confirm-email' }
      ]
    },
    {
      title: 'Aide et support',
      icon: <HelpCircle className="h-6 w-6" />,
      links: [
        { name: 'Centre d\'aide', href: '/help' },
        { name: 'Chat en direct', href: '/chat' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Remboursements', href: '/refunds' },
        { name: 'Annulations', href: '/cancellation' },
        { name: 'Réclamations', href: '/complaints' }
      ]
    },
    {
      title: 'Informations légales',
      icon: <Shield className="h-6 w-6" />,
      links: [
        { name: 'Mentions légales', href: '/legal' },
        { name: 'Conditions générales', href: '/terms' },
        { name: 'Politique de confidentialité', href: '/privacy' },
        { name: 'RGPD', href: '/gdpr' },
        { name: 'Cookies', href: '/cookies' },
        { name: 'Règlement des litiges', href: '/disputes' }
      ]
    },
    {
      title: 'À propos',
      icon: <Building className="h-6 w-6" />,
      links: [
        { name: 'Nos partenaires', href: '/partners' },
        { name: 'Carrières', href: '/careers' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan du site
          </h1>
          <p className="text-xl opacity-90">
            Naviguez facilement sur Nooraya Voyages
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <span className="text-blue-600 mr-3">{section.icon}</span>
                {section.title}
              </h2>
              
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-1"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Recherche rapide</h2>
          <p className="text-center text-gray-700 mb-6">
            Vous ne trouvez pas ce que vous cherchez ? Utilisez notre recherche ou contactez-nous.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Que recherchez-vous ?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Rechercher
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Besoin d&apos;aide pour naviguer sur notre site ?
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/help"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Centre d&apos;aide
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/chat"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <FileText className="h-5 w-5 mr-2" />
              Chat en direct
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}