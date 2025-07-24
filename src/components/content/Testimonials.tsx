'use client';

import React from 'react';
import { Star, Quote, Award, Users, Heart } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  trip: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Fatou Diop",
    location: "Dakar, Sénégal",
    rating: 5,
    comment: "Service exceptionnel ! L'équipe de Nooraya m'a accompagnée du début à la fin. Mon vol pour Paris était parfait et le prix très compétitif.",
    date: "Il y a 2 semaines",
    verified: true,
    trip: "Dakar - Paris"
  },
  {
    id: 2,
    name: "Amadou Sow",
    location: "Saint-Louis, Sénégal",
    rating: 5,
    comment: "J'ai économisé plus de 200.000 FCFA sur mon billet pour New York. Le service client est très réactif et professionnel. Je recommande vivement !",
    date: "Il y a 1 mois",
    verified: true,
    trip: "Dakar - New York"
  },
  {
    id: 3,
    name: "Aïssatou Ba",
    location: "Thiès, Sénégal",
    rating: 5,
    comment: "Réservation simple et rapide. J'ai apprécié la transparence des prix et l'assistance pour le choix des sièges. Excellent rapport qualité-prix.",
    date: "Il y a 3 semaines",
    verified: true,
    trip: "Dakar - Dubaï"
  },
  {
    id: 4,
    name: "Moussa Ndiaye",
    location: "Ziguinchor, Sénégal",
    rating: 5,
    comment: "Troisième réservation avec Nooraya. Toujours aussi satisfait ! Les prix sont imbattables et le service est impeccable.",
    date: "Il y a 1 semaine",
    verified: true,
    trip: "Dakar - Istanbul"
  },
  {
    id: 5,
    name: "Mariama Fall",
    location: "Kaolack, Sénégal",
    rating: 5,
    comment: "Parfait pour mon voyage d'affaires. Modification gratuite de mon vol retour, équipe très compréhensive. Une vraie tranquillité d'esprit.",
    date: "Il y a 2 mois",
    verified: true,
    trip: "Dakar - Londres"
  },
  {
    id: 6,
    name: "Ibrahima Diallo",
    location: "Dakar, Sénégal",
    rating: 5,
    comment: "Meilleur service de réservation de vols au Sénégal ! Prix compétitifs et service client exceptionnel. Mon vol pour le Canada était parfait.",
    date: "Il y a 1 mois",
    verified: true,
    trip: "Dakar - Montréal"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Motif de fond décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-6 py-3 rounded-full mb-6">
            <Star className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Témoignages Clients</span>
            <Star className="w-5 h-5" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi des milliers de voyageurs choisissent Nooraya pour leurs réservations de vols
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">15K+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">5K+</div>
            <div className="text-gray-600">Avis positifs</div>
          </div>
        </div>

        {/* Grille de témoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                {/* En-tête du témoignage */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-sm text-emerald-600 font-medium mt-1">{testimonial.trip}</p>
                  </div>
                  {testimonial.verified && (
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Vérifié
                    </div>
                  )}
                </div>

                {/* Étoiles */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{testimonial.date}</span>
                </div>

                {/* Citation */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-100 transform rotate-180" />
                  <p className="text-gray-700 leading-relaxed relative z-10 italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </div>
              </div>

              {/* Barre décorative en bas */}
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Rejoignez des milliers de voyageurs satisfaits
          </p>
          <a
            href="/flight-search"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-emerald-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Réserver mon vol
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}