'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Plane, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  CreditCard, 
  Shield,
  Award,
  Users,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-greenS-900 to-slate-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6" aria-label="Nooraya Voyages - Accueil">
              <Plane className="h-10 w-10 text-green-400 transform -rotate-45" />
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                  Nooraya Voyages
                </span>
                <span className="block text-xs text-gray-400 font-light tracking-wider uppercase">
                  Voyages Élégants
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire de confiance depuis 2010. Nous transformons vos rêves de voyage en réalité avec notre expertise et notre service d&apos;exception.
            </p>
            
            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-bold text-green-400">2M+</div>
                <div className="text-xs text-gray-400">Destinations</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-bold text-purple-400">1M+</div>
                <div className="text-xs text-gray-400">Clients satisfaits</div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3" role="list" aria-label="Suivez-nous sur les réseaux sociaux">
              <SocialIcon icon={<Facebook size={18} />} href="#" platform="Facebook" />
              <SocialIcon icon={<Twitter size={18} />} href="#" platform="Twitter" />
              <SocialIcon icon={<Instagram size={18} />} href="#" platform="Instagram" />
              <SocialIcon icon={<Youtube size={18} />} href="#" platform="YouTube" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Award className="mr-2" size={20} aria-hidden="true" />
              Nos Services
            </h3>
            <ul className="space-y-3" role="list">
              <FooterLink href="/flights" text="Réservation de vols" />
              <FooterLink href="/hotels" text="Hôtels de luxe" />
              <FooterLink href="/packages" text="Packages sur mesure" />
              <FooterLink href="/insurance" text="Assurance voyage" />
              <FooterLink href="/transfers" text="Transferts aéroport" />
              <FooterLink href="/guides" text="Guides locaux" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Users className="mr-2" size={20} aria-hidden="true" />
              Support Client
            </h3>
            <ul className="space-y-3" role="list">
              <FooterLink href="/help" text="Centre d&apos;aide" />
              <FooterLink href="/chat" text="Chat en direct" />
              <FooterLink href="/cancellation" text="Politique d&apos;annulation" />
              <FooterLink href="/refunds" text="Remboursements" />
              <FooterLink href="/faq" text="FAQ" />
              <FooterLink href="/complaints" text="Réclamations" />
            </ul>
            
            {/* Contact rapide */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl" role="complementary" aria-label="Informations de contact">
              <div className="flex items-center mb-2">
                <Phone size={16} className="mr-2 text-green-400" aria-hidden="true" />
                <a href="tel:+33123456789" className="text-sm text-white hover:text-green-300 transition-colors">+33 1 23 45 67 89</a>
              </div>
              <div className="flex items-center mb-2">
                <Mail size={16} className="mr-2 text-green-400" aria-hidden="true" />
                <a href="mailto:support@noorayavoyages.com" className="text-sm text-white hover:text-green-300 transition-colors">support@noorayavoyages.com</a>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-purple-400" aria-hidden="true" />
                <span className="text-sm text-white">24h/24 - 7j/7</span>
              </div>
            </div>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Shield className="mr-2" size={20} aria-hidden="true" />
              Informations Légales
            </h3>
            <ul className="space-y-3" role="list">
              <FooterLink href="/terms" text="Conditions générales" />
              <FooterLink href="/privacy" text="Politique de confidentialité" />
              <FooterLink href="/cookies" text="Cookies" />
              <FooterLink href="/legal" text="Mentions légales" />
              <FooterLink href="/gdpr" text="RGPD" />
              <FooterLink href="/disputes" text="Règlement des litiges" />
            </ul>

            {/* Certifications */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-sm">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs">IATA</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs">ATOL</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs">ISO 9001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section paiements et sécurité */}
        <div className="border-t border-gray-700 pt-8 mb-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-6 lg:mb-0">
            <h4 className="font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" size={20} aria-hidden="true" />
              Moyens de paiement sécurisés
            </h4>
            <div className="flex flex-wrap gap-3">
              <PaymentBadge text="Visa" />
              <PaymentBadge text="Mastercard" />
              <PaymentBadge text="PayPal" />
              <PaymentBadge text="Apple Pay" />
              <PaymentBadge text="Google Pay" />
              <PaymentBadge text="Amex" />
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-green-400 mr-2" aria-hidden="true" />
              <span className="font-medium text-white">Paiement 100% sécurisé</span>
            </div>
            <div className="text-sm text-gray-300 text-center lg:text-right">
              Cryptage SSL 256 bits<br />
              Données protégées
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-green-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:max-w-md">
            <h3 className="text-xl font-bold mb-2">
              Restez informé de nos meilleures offres
            </h3>
            <p className="text-gray-300 text-sm">
              Recevez en exclusivité nos promotions et conseils de voyage
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-3" role="form" aria-label="Inscription à la newsletter">
              <label htmlFor="newsletter-email" className="sr-only">Votre adresse email</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Votre adresse email"
                className="input-field bg-white/10 border-white/20 text-white placeholder-gray-300 sm:w-64"
                aria-describedby="newsletter-description"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap px-6">
                S&apos;abonner
              </button>
            </form>
            <p id="newsletter-description" className="text-xs text-gray-300 mt-2">
              Pas de spam, désinscription facile
            </p>
          </div>
        </div>

        {/* Copyright et liens */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-200 text-sm">
              © {new Date().getFullYear()} Nooraya Voyages. Tous droits réservés.
            </p>
            <p className="text-gray-300 text-xs mt-1">
              Licence d&apos;agence de voyage n° IM075180042
            </p>
          </div>
          
          <nav className="flex items-center space-x-4 text-sm" role="navigation" aria-label="Liens secondaires">
            <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
              Plan du site
            </Link>
            <span className="text-gray-500" aria-hidden="true">•</span>
            <Link href="/partners" className="text-gray-300 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
              Partenaires
            </Link>
            <span className="text-gray-500" aria-hidden="true">•</span>
            <Link href="/careers" className="text-gray-300 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
              Carrières
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <li role="listitem">
      <Link 
        href={href} 
        className="text-gray-200 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
      >
        {text}
      </Link>
    </li>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string; platform: string }> = ({ icon, href, platform }) => {
  return (
    <Link 
      href={href} 
      className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-6 inline-block focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Suivez-nous sur ${platform}`}
      role="listitem"
    >
      <span aria-hidden="true">{icon}</span>
    </Link>
  );
};

const PaymentBadge: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="bg-white rounded-lg px-3 py-2 text-gray-800 font-medium text-sm shadow-sm" role="img" aria-label={`Moyen de paiement accepté : ${text}`}>
      {text}
    </div>
  );
};

export default Footer;