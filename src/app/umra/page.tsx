'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, Globe, Check, Star, Gift, Clock, Users, Send, User, MessageSquare, Package, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function UmraPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    pack: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Configuration EmailJS - IMPORTANT: Remplacez ces valeurs
  // 1. Créez un compte sur https://www.emailjs.com/
  // 2. Ajoutez un service SMTP avec vos paramètres Titan/Hostinger
  // 3. Créez un template d'email
  // 4. Copiez vos IDs ici
  const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Remplacer
  const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Remplacer
  const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxxxx'; // Remplacer

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Initialiser EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Paramètres pour l'email
      const templateParams = {
        to_email: 'contact@noorayagroup.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        pack: formData.pack || 'Non spécifié',
        message: formData.message || 'Aucun message supplémentaire',
        reply_to: formData.email
      };

      // Envoyer l'email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitMessage('Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
        setFormData({ name: '', email: '', phone: '', message: '', pack: '' });
        
        // Masquer le message après 10 secondes
        setTimeout(() => setSubmitMessage(''), 10000);
      }
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setSubmitMessage('Une erreur est survenue. Veuillez nous contacter directement par WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const departures = [
    { id: 1, name: 'Spécial Gamou', dates: '01 au 10 septembre 2025', icon: '🌙' },
    { id: 2, name: 'Fin d\'année', dates: '18 au 28 décembre 2025', icon: '🎊' },
    { id: 3, name: 'Laylatoul Qadr', dates: '08 au 18 mars 2026', icon: '✨' }
  ];

  const packs = [
    {
      id: 1,
      name: 'PACK STANDARD',
      price: '1.450.000',
      currency: 'Fcfa',
      features: [
        'Chambre triple ou quadruple',
        'Dîner ou Iftar inclus',
        'Billet A/R + Visa',
        'Accompagnement religieux',
        'Transport en bus climatisé',
        '4 jours à Médine (Hôtel Durrat ou Deyar Al Eiman)',
        '6 jours à Makkah (Hôtel Time Ruba)',
        'Visites : Mont Uhud, Mosquées Quba et Qiblatayn, Jabal Hira, Mina, Arafat…'
      ],
      gradient: 'from-green-600 to-green-800',
      popular: false
    },
    {
      id: 2,
      name: 'PACK VIP',
      price: '2.200.000',
      currency: 'Fcfa',
      features: [
        'Chambre double – Pension complète',
        'Budget taxi retour Kaaba',
        'Kit Oumra complet offert :',
        '🎒 Sac de voyage premium',
        '🕋 Ihram de qualité supérieure',
        '🧘‍♂️ Tapis de prière confortable',
        '📿 Chapelet en bois précieux',
        '🧴 5L d\'eau Zam Zam'
      ],
      gradient: 'from-amber-500 to-amber-700',
      popular: true,
      badge: 'Plus populaire'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section avec image de fond */}
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80 z-10" />
        <Image
          src="/images/mecca.jpg"
          alt="La Mecque"
          fill
          className="object-cover"
          priority
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <p className="text-amber-400 font-semibold mb-2 text-lg">Voyage spirituel</p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              PROGRAMME OUMRA 2025 - 2026
            </h1>
            <p className="text-xl lg:text-2xl mb-6 text-green-100">
              Organisé par NOORAYA GROUP
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Accompagnement complet</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Guides expérimentés</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Section Dates de départ */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            📅 Dates des départs
          </h2>
          <p className="text-xl text-gray-600">
            Choisissez la période qui vous convient le mieux
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {departures.map((departure) => (
            <div key={departure.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <div className="text-4xl mb-4">{departure.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{departure.name}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>{departure.dates}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière de réservation */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 text-white text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">
            ✨ Réservez dès maintenant !
          </h3>
          <p className="text-lg mb-6">
            Bénéficiez de facilités de paiement en plusieurs tranches
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Réserver maintenant
            </Link>
            <Link 
              href="#packs"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Voir les packs
            </Link>
          </div>
        </div>

        {/* Section Packs */}
        <div id="packs" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Nos formules Oumra
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le pack qui correspond à vos besoins
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <div 
                key={pack.id} 
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${pack.popular ? 'ring-4 ring-amber-400' : ''}`}
              >
                {pack.badge && (
                  <div className="absolute top-6 right-6 bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {pack.badge}
                  </div>
                )}

                <div className={`bg-gradient-to-r ${pack.gradient} p-8 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{pack.price}</span>
                    <span className="text-xl opacity-80">{pack.currency}</span>
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-4">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {!feature.startsWith('🎒') && !feature.startsWith('🕋') && 
                         !feature.startsWith('🧘') && !feature.startsWith('📿') && 
                         !feature.startsWith('🧴') && (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-gray-700 ${feature.includes('Kit Oumra') ? 'font-semibold' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full mt-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${pack.gradient} hover:opacity-90 transition-opacity`}>
                    Choisir ce pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Témoignages */}
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Vos avis, notre meilleure énergie
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-lg text-green-100">
              4.8 évaluation de 1847 avis
            </p>
          </div>

          {/* Grille de témoignages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Témoignage 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center font-bold text-white">
                  F
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Fatima</h4>
                  <p className="text-sm text-green-200">il y a 2 jours</p>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🇸🇳</span>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-green-50 text-sm">
                Excellent service pour notre Umra. Organisation parfaite et accompagnement spirituel de qualité. Je recommande vivement!
              </p>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center font-bold text-white">
                  A
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Ahmed</h4>
                  <p className="text-sm text-green-200">il y a 5 jours</p>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🇫🇷</span>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-green-50 text-sm">
                Très satisfait du pack VIP. Hôtels de qualité et proximité des lieux saints. Équipe très réactive.
              </p>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                  K
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Khadija</h4>
                  <p className="text-sm text-green-200">il y a 1 semaine</p>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🇸🇳</span>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-green-50 text-sm">
                Une expérience inoubliable grâce à Nooraya. Tout était parfaitement organisé. Merci pour ce voyage spirituel!
              </p>
            </div>

            {/* Témoignage 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                  M
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Mamadou</h4>
                  <p className="text-sm text-green-200">il y a 2 semaines</p>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🇫🇷</span>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-green-50 text-sm">
                Je recommande Nooraya pour leur professionnalisme. Guides compétents et programme bien structuré.
              </p>
            </div>
          </div>

          {/* Statistiques en bas */}
          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Service client basé à Dakar</h4>
                <p className="text-sm text-gray-400">Assistance en français et wolof</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Joignable 24h/7j</h4>
                <p className="text-sm text-gray-400">Par téléphone, WhatsApp et email</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">+1800 pèlerins satisfaits</h4>
                <p className="text-sm text-gray-400">Depuis 2010</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Pourquoi nous choisir */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Pourquoi choisir Nooraya Group ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expérience</h3>
              <p className="text-gray-600">Des années d\'expertise dans l\'organisation de voyages spirituels</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité</h3>
              <p className="text-gray-600">Des hébergements soigneusement sélectionnés près des lieux saints</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accompagnement</h3>
              <p className="text-gray-600">Un suivi personnalisé du début à la fin de votre voyage</p>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div id="contact-form" className="mt-16 bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              ✍️ Demande de réservation
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Remplissez ce formulaire pour nous envoyer votre demande par email
            </p>

            {submitMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-6 text-center">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="+221 77 xxx xx xx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Package className="inline w-4 h-4 mr-1" />
                    Pack souhaité
                  </label>
                  <select
                    value={formData.pack}
                    onChange={(e) => setFormData({...formData, pack: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="">Sélectionnez un pack</option>
                    <option value="Pack Standard - 1.450.000 Fcfa">Pack Standard - 1.450.000 Fcfa</option>
                    <option value="Pack VIP - 2.200.000 Fcfa">Pack VIP - 2.200.000 Fcfa</option>
                    <option value="Pack personnalisé">Pack personnalisé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-1" />
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  placeholder="Précisez vos besoins, dates souhaitées, nombre de personnes..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer la demande
                    </>
                  )}
                </button>

                <span className="text-gray-500">ou</span>

                <a
                  href="https://wa.me/221779867037?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20offres%20Umra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contacter sur WhatsApp
                </a>
              </div>
            </form>
            
            {/* Note: Pour activer l'envoi automatique d'emails */}
            {EMAILJS_SERVICE_ID === 'service_xxxxxxx' && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800 font-semibold mb-2">
                  ⚠️ Configuration EmailJS requise
                </p>
                <ol className="text-xs text-yellow-700 space-y-1 list-decimal list-inside">
                  <li>Créez un compte gratuit sur <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
                  <li>Ajoutez un service SMTP avec vos paramètres Titan/Hostinger</li>
                  <li>Créez un template d'email</li>
                  <li>Remplacez les IDs dans le code (lignes 20-22)</li>
                  <li>Consultez le guide : EMAILJS_TITAN_SETUP.md</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bouton WhatsApp flottant */}
      <WhatsAppButton />
    </div>
  );
}