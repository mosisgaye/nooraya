'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Nooraya Voyages
              </h3>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire de confiance pour vos voyages et pèlerinages depuis 2010.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+221779867037" className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors">
                <Phone size={18} />
                <span className="text-sm">+221 77 986 70 37</span>
              </a>
              <a href="tel:+221766144337" className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors">
                <Phone size={18} />
                <span className="text-sm">+221 76 614 43 37</span>
              </a>
              <a href="mailto:contact@noorayagroup.com" className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors">
                <Mail size={18} />
                <span className="text-sm">contact@noorayagroup.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="mt-0.5" />
                <span className="text-sm">Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          {/* Liens rapides et WhatsApp */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <Link href="/flights" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                Vols
              </Link>
              <Link href="/hotels" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                Hôtels
              </Link>
              <Link href="/umra" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                Umra
              </Link>
              <Link href="/packages" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                Séjours
              </Link>
            </div>
            
            {/* Bouton WhatsApp */}
            <a
              href="https://wa.me/221779867037?text=Bonjour,%20je%20souhaite%20avoir%20des%20informations%20sur%20vos%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle size={20} />
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Nooraya Voyages. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;