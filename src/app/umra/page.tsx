'use client';

import React, { useState } from 'react';
import { Calendar, Phone, Mail, Check, Star, Users, Send, User, MessageSquare, Package, MessageCircle, ChevronDown, Hotel, Plane, Shield, Award, Heart } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsAppButton';

// Configuration EmailJS - À remplacer par vos propres IDs
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Remplacez avec votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Remplacez avec votre Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx'; // Remplacez avec votre Public Key

export default function UmraPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departureDate: '',
    numberOfPeople: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Ici vous pouvez ajouter l'envoi d'email avec EmailJS
      if (EMAILJS_SERVICE_ID !== 'service_xxxxxxx') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            departure_date: formData.departureDate,
            number_of_people: formData.numberOfPeople,
            message: formData.message,
            to_email: 'contact@noorayavoyages.com'
          },
          EMAILJS_PUBLIC_KEY
        );
      }
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        departureDate: '',
        numberOfPeople: 1,
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Données des dates de départ
  const dates = [
    {
      month: 'Janvier 2025',
      period: '10 - 20 Janvier',
      title: 'Départ Spécial Nouvel An',
      description: 'Commencez l\'année par un voyage spirituel',
      special: 'Promo -10%'
    },
    {
      month: 'Février 2025',
      period: '5 - 15 Février',
      title: 'Départ Vacances d\'hiver',
      description: 'Profitez du climat idéal de l\'Arabie'
    },
    {
      month: 'Ramadan 2025',
      period: 'Du 1er au 15 Ramadan',
      title: 'Umra du Ramadan',
      description: 'Vivez le mois sacré à la Mecque',
      special: 'Très demandé'
    },
    {
      month: 'Avril 2025',
      period: '10 - 20 Avril',
      title: 'Départ Printemps',
      description: 'Température agréable et moins de foule'
    },
    {
      month: 'Mai 2025',
      period: '5 - 15 Mai',
      title: 'Départ Pré-été',
      description: 'Dernière chance avant l\'été'
    },
    {
      month: 'Juin 2025',
      period: '20 - 30 Juin',
      title: 'Départ Vacances d\'été',
      description: 'Idéal pour les familles',
      special: 'Familles'
    }
  ];

  // Données des packs
  const packs = [
    {
      name: 'PACK ÉCONOMIQUE',
      price: '1.790.000 FCFA',
      duration: '15 jours / 14 nuits',
      features: [
        '✈️ Vol direct Dakar - Jeddah A/R',
        '🏨 Hôtel 3★ proche du Haram',
        '🚌 Transferts aéroport inclus',
        '🕌 Visite des lieux saints',
        '👥 Guide francophone expérimenté',
        '🎒 Kit de base du pèlerin',
        '📱 Carte SIM locale offerte'
      ],
      recommended: false
    },
    {
      name: 'PACK CONFORT',
      price: '2.200.000 FCFA',
      duration: '15 jours / 14 nuits',
      features: [
        '✈️ Vol direct Dakar - Jeddah A/R',
        '🏨 Hôtel 4★ vue sur le Haram',
        '🍽️ Pension complète',
        '🚌 Tous les transferts privés',
        '🕌 Programme de visites complet',
        '👥 Guide dédié francophone',
        '🎁 Kit premium + Eau Zamzam 5L',
        '🚕 Budget taxi pour le Haram'
      ],
      recommended: true
    },
    {
      name: 'PACK VIP',
      price: '3.500.000 FCFA',
      duration: '15 jours / 14 nuits',
      features: [
        '✈️ Vol Business Class A/R',
        '🏨 Hôtel 5★ Fairmont/Hilton',
        '🍽️ Pension complète premium',
        '🚗 Transferts VIP privés',
        '🕌 Accès privilégié + Visites VIP',
        '👥 Guide personnel 24/7',
        '🎁 Kit luxe complet + cadeaux',
        '💎 Services conciergerie'
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section améliorée */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/mecca.jpg"
            alt="La Mecque"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Fond avec gradient et motifs */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/85 to-green-700/90">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
            }}></div>
          </div>
        </div>
        
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Contenu principal */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Badge animé */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full mb-10 animate-fade-in">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-lg font-semibold uppercase tracking-wider">Départs Garantis 2025-2026</span>
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Titre principal */}
          <h1 className="mb-8 animate-fade-in-up">
            <span className="block text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-white">
              Umra
            </span>
            <span className="block text-5xl md:text-6xl mt-4 font-light text-green-100">عُمْرَة</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-2xl md:text-3xl mb-12 text-green-50 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Accomplissez votre pèlerinage dans les meilleures conditions avec 
            <span className="font-bold text-white"> NOORAYA GROUP</span>
          </p>
          
          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
            <a
              href="#packs"
              className="group bg-white text-green-800 px-12 py-5 rounded-full font-bold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl inline-flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Découvrir nos offres
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/221779867037?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20offres%20Umra%202025-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600/30 backdrop-blur-lg text-white border-2 border-white/40 px-12 py-5 rounded-full font-bold text-lg hover:bg-green-600/50 hover:border-white/60 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Réserver maintenant
            </a>
          </div>
          
          {/* Statistiques */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-600">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">10K+</div>
              <div className="text-sm text-green-100 mt-1">Pèlerins satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">15+</div>
              <div className="text-sm text-green-100 mt-1">Années d&apos;expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">98%</div>
              <div className="text-sm text-green-100 mt-1">Taux de satisfaction</div>
            </div>
          </div>
        </div>
        
        {/* Indicateur de défilement */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/70" />
        </div>
      </div>

      {/* Section des dates améliorée */}
      <div id="packs" className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-8 py-3 rounded-full mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Programmes Exclusifs</span>
            </div>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Nos départs Umra 2025/2026</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Choisissez la date qui vous convient parmi nos départs réguliers avec guides francophones
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {dates.map((date, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* En-tête coloré */}
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <Calendar className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{date.month}</h3>
                      </div>
                      {date.special && (
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                          {date.special}
                        </span>
                      )}
                    </div>
                    <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 inline-block">
                      <p className="text-green-700 font-semibold">{date.period}</p>
                    </div>
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{date.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-6">{date.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Plane className="w-5 h-5 text-green-600" />
                      <span>Vol direct inclus</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Hotel className="w-5 h-5 text-green-600" />
                      <span>Hébergement premium</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>Guide francophone</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Réserver ce départ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section des packs améliorée */}
      <div className="py-32 px-4 bg-gradient-to-b from-white via-green-50/30 to-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-8 py-3 rounded-full mb-6">
              <Package className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Formules Tout Inclus</span>
            </div>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Nos formules Umra</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Des packs conçus pour répondre à tous vos besoins et budgets
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {packs.map((pack, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 ${
                  pack.recommended ? 'ring-4 ring-green-500 ring-offset-4 scale-105' : ''
                }`}
              >
                {pack.recommended && (
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 animate-gradient"></div>
                )}
                
                {pack.recommended && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Plus populaire
                    </div>
                  </div>
                )}
                
                <div className="p-10">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">{pack.name}</h3>
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {pack.price}
                    </div>
                    <p className="text-gray-600 font-medium text-lg">{pack.duration}</p>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    {pack.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start group">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-4 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors flex-shrink-0">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-gray-700 leading-relaxed text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    pack.recommended 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}>
                    {pack.recommended ? 'Choisir ce pack ⭐' : 'Choisir ce pack'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section pourquoi choisir améliorée */}
      <div className="py-32 px-4 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-8 py-3 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Pourquoi nous choisir</span>
            </div>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">L&apos;excellence NOORAYA GROUP</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Une expertise reconnue pour un pèlerinage serein et mémorable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-500 shadow-xl">
                  <Users className="w-16 h-16 text-green-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-lg font-bold text-green-600">15+ ans</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Expérience</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                Plus de 10 000 pèlerins nous ont fait confiance pour accomplir leur Umra en toute sérénité
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-500 shadow-xl">
                  <Star className="w-16 h-16 text-amber-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-lg font-bold text-amber-600">5★ Premium</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Qualité Premium</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                Hôtels 4-5 étoiles proches du Haram, transport VIP climatisé et repas de qualité
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-500 shadow-xl">
                  <Heart className="w-16 h-16 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-lg font-bold text-blue-600">24/7</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Accompagnement</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                Guides religieux certifiés et équipe d&apos;assistance disponible à tout moment
              </p>
            </div>
          </div>
          
          {/* Témoignages */}
          <div className="mt-24 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Ce que disent nos pèlerins</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;Une organisation parfaite du début à la fin. Les guides sont très attentionnés et compétents.&rdquo;</p>
                <p className="font-semibold text-gray-900">Fatou Diop</p>
                <p className="text-sm text-gray-500">Umra Ramadan 2024</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;Hôtel magnifique avec vue sur le Haram. Je recommande vivement NOORAYA GROUP.&rdquo;</p>
                <p className="font-semibold text-gray-900">Amadou Sow</p>
                <p className="text-sm text-gray-500">Umra Février 2024</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;Mon 3ème voyage avec eux. Toujours la même qualité de service exceptionnelle.&rdquo;</p>
                <p className="font-semibold text-gray-900">Aïssatou Ba</p>
                <p className="text-sm text-gray-500">Umra Mai 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section formulaire de réservation améliorée */}
      <div className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* En-tête du formulaire */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-white text-center">
              <h2 className="text-5xl font-bold mb-4">Réservez votre Umra</h2>
              <p className="text-xl text-green-100">Commencez votre voyage spirituel dès aujourd&apos;hui</p>
            </div>
            
            {/* Corps du formulaire */}
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              {submitStatus === 'success' && (
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-green-800 text-lg">Demande envoyée avec succès !</p>
                      <p className="text-green-600">Nous vous contacterons dans les plus brefs délais.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                  <p className="font-bold text-red-800 text-lg">Une erreur s&apos;est produite</p>
                  <p className="text-red-600">Veuillez réessayer ou nous contacter directement.</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <User className="inline w-5 h-5 mr-2" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Mail className="inline w-5 h-5 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Phone className="inline w-5 h-5 mr-2" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                    placeholder="+221 77 123 45 67"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Calendar className="inline w-5 h-5 mr-2" />
                    Date de départ souhaitée
                  </label>
                  <select
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                  >
                    <option value="">Sélectionnez une date</option>
                    {dates.map((date, index) => (
                      <option key={index} value={date.month}>{date.month} - {date.period}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Users className="inline w-5 h-5 mr-2" />
                    Nombre de personnes
                  </label>
                  <select
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Package className="inline w-5 h-5 mr-2" />
                    Pack souhaité
                  </label>
                  <select
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                  >
                    <option>Pack Économique</option>
                    <option>Pack Confort (Recommandé)</option>
                    <option>Pack VIP</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <MessageSquare className="inline w-5 h-5 mr-2" />
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                  placeholder="Des questions ou des demandes spécifiques ?"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Envoyer ma demande
                    </>
                  )}
                </button>
                
                <a
                  href="https://wa.me/221779867037?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20offres%20Umra%202025-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 py-5 rounded-2xl font-bold text-lg hover:from-green-200 hover:to-emerald-200 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  Contacter sur WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bouton WhatsApp flottant */}
      <WhatsAppButton />
    </div>
  );
}