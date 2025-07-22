'use client';

import React, { useState } from 'react';
import { Phone, Mail, Check, Star, Clock, Users, Send, User, MessageSquare, Package, MessageCircle, Trophy, Sparkles, ChevronDown, Shield, Award, Zap, Heart, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsAppButton';

// Configuration EmailJS - À remplacer par vos propres IDs
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Remplacez avec votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Remplacez avec votre Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx'; // Remplacez avec votre Public Key

export default function CANPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pack: 'standard',
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
            pack: formData.pack === 'standard' ? 'Standard' : 'VIP',
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
        pack: 'standard',
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

  const packs = [
    {
      id: 'standard',
      name: 'PACK STANDARD',
      price: '1.190.000',
      currency: 'FCFA',
      features: [
        { icon: '✈️', text: 'Billet d\'avion A/R Dakar-Casablanca' },
        { icon: '🏨', text: 'Hôtel 3★ centre-ville (12 nuits)' },
        { icon: '🎟️', text: '3 matchs garantis de la CAN' },
        { icon: '🚄', text: 'TGV Casablanca–Tanger A/R' },
        { icon: '⚽', text: 'Activités touristiques incluses' },
        { icon: '☕', text: 'Petit-déjeuner buffet' },
        { icon: '🛎️', text: 'Assistance 24h/24 en français' },
        { icon: '🚌', text: 'Transferts aéroport' }
      ],
      gradient: 'from-green-600 to-emerald-600',
      popular: false
    },
    {
      id: 'vip',
      name: 'PACK VIP',
      price: '1.790.000',
      currency: 'FCFA',
      badge: 'RECOMMANDÉ',
      features: [
        { icon: '✈️', text: 'Billet d\'avion A/R classe affaires' },
        { icon: '🏨', text: 'Hôtel 4★ premium (12 nuits)' },
        { icon: '🎟️', text: '3 matchs VIP avec places premium' },
        { icon: '🚄', text: 'TGV 1ère classe Casablanca–Tanger' },
        { icon: '⚽', text: 'Programme touristique exclusif' },
        { icon: '🍽️', text: 'Demi-pension (petit-déj + dîner)' },
        { icon: '🛎️', text: 'Conciergerie VIP 24h/24' },
        { icon: '🧖', text: 'Excursion & hammam traditionnel' },
        { icon: '🚗', text: 'Transferts privés VIP' }
      ],
      gradient: 'from-amber-500 to-orange-500',
      popular: true
    }
  ];

  const experiences = [
    {
      icon: Trophy,
      title: "Matchs Garantis",
      description: "3 matchs de la CAN avec les meilleures places"
    },
    {
      icon: Globe,
      title: "Découverte du Maroc",
      description: "Visites guidées de Casablanca et Tanger"
    },
    {
      icon: Shield,
      title: "Sécurité Totale",
      description: "Assistance et encadrement 24h/24"
    },
    {
      icon: Heart,
      title: "Confort Premium",
      description: "Hébergements sélectionnés avec soin"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section améliorée */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/can.jpeg"
            alt="CAN Afrique"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Fond animé avec gradient et motifs */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-700/80 to-emerald-700/85">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px),
                repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)
              `,
            }}></div>
          </div>
        </div>
        
        {/* Particules flottantes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-red-500 rounded-full animate-pulse animation-delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badge promo animé */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-2xl flex items-center gap-2">
              <Zap className="w-6 h-6" />
              PROMO CAN 2025
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></span>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Badge d'événement */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full mb-10 animate-fade-in">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-bold uppercase tracking-wider">CAN 2025 • MAROC</span>
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          
          {/* Titre principal */}
          <h1 className="mb-8 animate-fade-in-up">
            <span className="block text-6xl md:text-8xl font-black mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-400">
                CAN 2025
              </span>
            </span>
            <span className="block text-3xl md:text-5xl font-light text-green-100">
              au Maroc avec
            </span>
            <span className="block text-4xl md:text-6xl font-bold mt-2 text-white">
              NOORAYA GROUP
            </span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-2xl md:text-3xl mb-12 text-green-50 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            12 jours inoubliables à Casablanca pour vivre la passion du football africain et découvrir le Maroc !
          </p>
          
          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
            <a
              href="#packs"
              className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-12 py-5 rounded-full font-black text-lg hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl inline-flex items-center gap-3"
            >
              <Trophy className="w-6 h-6" />
              Découvrir nos packs
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/221779867037?text=Bonjour,%20je%20suis%20intéressé%20par%20l'offre%20CAN%202025"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-lg text-white border-2 border-white/40 px-12 py-5 rounded-full font-bold text-lg hover:bg-white/30 hover:border-white/60 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Réserver maintenant
            </a>
          </div>
          
          {/* Caractéristiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-600">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="text-3xl font-bold text-yellow-400">12</div>
              <div className="text-sm text-green-100">Jours d&apos;aventure</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="text-3xl font-bold text-yellow-400">3</div>
              <div className="text-sm text-green-100">Matchs CAN</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="text-3xl font-bold text-yellow-400">2</div>
              <div className="text-sm text-green-100">Villes visitées</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-green-100">Assistance</div>
            </div>
          </div>
        </div>
        
        {/* Indicateur de défilement */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/70" />
        </div>
      </div>

      {/* Section des packs améliorée */}
      <div id="packs" className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-8 py-3 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Offres Exclusives</span>
            </div>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Nos Packs CAN 2025</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Choisissez la formule qui correspond à vos envies et votre budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl ${
                  pack.popular ? 'ring-4 ring-yellow-400 ring-offset-4 scale-105' : ''
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-gradient"></div>
                )}
                
                {pack.badge && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg animate-pulse flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {pack.badge}
                    </div>
                  </div>
                )}
                
                {/* En-tête du pack */}
                <div className={`p-10 bg-gradient-to-br ${pack.gradient} text-white`}>
                  <h3 className="text-4xl font-black mb-4">{pack.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black">{pack.price}</span>
                    <span className="text-2xl font-light opacity-90">{pack.currency}</span>
                  </div>
                </div>
                
                {/* Caractéristiques */}
                <div className="p-10">
                  <div className="space-y-4 mb-10">
                    {pack.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <span className="text-2xl flex-shrink-0 transform group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </span>
                        <span className="text-gray-700 text-lg leading-relaxed">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, pack: pack.id }))}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                      formData.pack === pack.id
                        ? `bg-gradient-to-r ${pack.gradient} text-white`
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {formData.pack === pack.id ? 'Pack sélectionné ✓' : 'Sélectionner ce pack'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  🎯 Places limitées !
                </p>
                <p className="text-lg text-gray-700">
                  Paiement en <span className="font-bold text-green-600">3 tranches</span> disponible
                </p>
                <p className="text-gray-600 mt-2">
                  Possibilité de prolonger le séjour selon vos envies
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#reservation"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
                >
                  Réserver maintenant
                  <ChevronDown className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section expérience CAN */}
      <div className="py-32 px-4 bg-gradient-to-br from-green-900 to-emerald-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-6">L&apos;Expérience CAN 2025</h2>
            <p className="text-2xl text-green-100 max-w-4xl mx-auto">
              Vivez la magie du football africain dans les meilleures conditions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {experiences.map((exp, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-500 transform group-hover:scale-110">
                  <exp.icon className="w-16 h-16 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{exp.title}</h3>
                <p className="text-green-100 text-lg">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section pourquoi choisir améliorée */}
      <div className="py-32 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-8 py-3 rounded-full mb-6">
              <Award className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Pourquoi nous choisir</span>
            </div>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Pourquoi partir avec NOORAYA GROUP ?</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Une expertise reconnue pour des voyages sportifs mémorables
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-500 shadow-xl transform group-hover:scale-110">
                  <Users className="w-16 h-16 text-green-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-lg font-bold text-green-600">15+ ans</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Expérience</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                Des années d&apos;expertise dans l&apos;organisation de voyages sportifs avec plus de 5000 supporters satisfaits
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-500 shadow-xl transform group-hover:scale-110">
                  <Star className="w-16 h-16 text-amber-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-lg font-bold text-amber-600">Premium</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Qualité Premium</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                Hébergements soigneusement sélectionnés et services haut de gamme pour votre confort
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-500 shadow-xl transform group-hover:scale-110">
                  <Clock className="w-16 h-16 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-lg font-bold text-blue-600">24/7</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Assistance Continue</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                Une équipe disponible à tout moment pour garantir le succès de votre séjour
              </p>
            </div>
          </div>
          
          {/* Témoignages */}
          <div className="mt-24 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Ils ont voyagé avec nous</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-lg">&ldquo;Une organisation parfaite ! J&apos;ai pu vivre ma passion du foot dans les meilleures conditions.&rdquo;</p>
                <p className="font-bold text-gray-900">Moussa Diallo</p>
                <p className="text-sm text-gray-500">Voyage Coupe du Monde 2022</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-lg">&ldquo;L&apos;équipe NOORAYA est au top ! Tout était prévu, je recommande vivement.&rdquo;</p>
                <p className="font-bold text-gray-900">Aminata Sow</p>
                <p className="text-sm text-gray-500">Voyage CAN 2023</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-lg">&ldquo;Des souvenirs inoubliables grâce à NOORAYA GROUP. Vivement la prochaine !&rdquo;</p>
                <p className="font-bold text-gray-900">Ibrahim Ndiaye</p>
                <p className="text-sm text-gray-500">Voyage Europa League 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section formulaire de réservation améliorée */}
      <div id="reservation" className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* En-tête du formulaire */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
                }}></div>
              </div>
              <div className="relative z-10">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h2 className="text-5xl font-bold mb-4">Réservez votre place</h2>
                <p className="text-xl text-green-100">Ne ratez pas cette opportunité unique !</p>
              </div>
            </div>
            
            {/* Corps du formulaire */}
            <form onSubmit={handleSubmit} className="p-12 space-y-8">
              {submitStatus === 'success' && (
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl animate-fade-in">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-green-800 text-lg">Demande envoyée avec succès !</p>
                      <p className="text-green-600">Notre équipe vous contactera dans les 24h.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in">
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
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
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
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
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
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                    placeholder="+221 77 123 45 67"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Users className="inline w-5 h-5 mr-2" />
                    Nombre de personnes
                  </label>
                  <select
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Package className="inline w-5 h-5 mr-2" />
                  Pack sélectionné
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {packs.map((pack) => (
                    <label
                      key={pack.id}
                      className={`relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.pack === pack.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pack"
                        value={pack.id}
                        checked={formData.pack === pack.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-lg">{pack.name}</div>
                        <div className="text-2xl font-bold text-green-600 mt-1">{pack.price} {pack.currency}</div>
                      </div>
                      {formData.pack === pack.id && (
                        <Check className="w-6 h-6 text-green-600 ml-4" />
                      )}
                    </label>
                  ))}
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
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
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
                  href="https://wa.me/221779867037?text=Bonjour,%20je%20suis%20intéressé%20par%20l'offre%20CAN%202025"
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

      {/* Section contact améliorée */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Infos & réservations</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <a href="tel:+221779867037" className="group flex items-center gap-3 text-xl hover:text-green-400 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-7 h-7" />
              </div>
              <span className="font-semibold">+221 77 986 70 37</span>
            </a>
            <a href="tel:+221766144337" className="group flex items-center gap-3 text-xl hover:text-green-400 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-7 h-7" />
              </div>
              <span className="font-semibold">+221 76 614 43 37</span>
            </a>
          </div>
          <p className="text-gray-400 text-lg">
            Disponibles du lundi au dimanche de 8h à 22h
          </p>
        </div>
      </div>

      {/* Bouton WhatsApp flottant */}
      <WhatsAppButton />
      
      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}