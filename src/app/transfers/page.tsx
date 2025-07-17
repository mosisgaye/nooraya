import React from 'react';
import { Metadata } from 'next';
import { Car, MapPin, Clock, Users, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transferts Aéroport - Nooraya Voyages',
  description: 'Réservez vos transferts aéroport en toute sérénité. Service de navette privée et partagée disponible 24h/24.',
};

export default function TransfersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transferts Aéroport
          </h1>
          <p className="text-xl opacity-90">
            De l&apos;aéroport à votre hôtel en toute tranquillité
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos services de transfert</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transfert privé</h3>
              <p className="text-gray-600 mb-4">
                Véhicule exclusif pour vous et votre groupe. Confort maximal et flexibilité totale.
              </p>
              <p className="text-2xl font-bold text-blue-600">À partir de 45€</p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Navette partagée</h3>
              <p className="text-gray-600 mb-4">
                Solution économique avec d&apos;autres voyageurs. Idéal pour les voyageurs solo.
              </p>
              <p className="text-2xl font-bold text-green-600">À partir de 15€</p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">VIP Premium</h3>
              <p className="text-gray-600 mb-4">
                Service haut de gamme avec chauffeur personnel et véhicule de luxe.
              </p>
              <p className="text-2xl font-bold text-purple-600">À partir de 120€</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-red-600" />
              Destinations populaires
            </h2>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-semibold">Paris CDG ↔ Centre-ville</h3>
                <p className="text-gray-600 text-sm">Durée : 45-60 min | À partir de 50€</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-semibold">Paris Orly ↔ Centre-ville</h3>
                <p className="text-gray-600 text-sm">Durée : 30-45 min | À partir de 40€</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-semibold">Nice Côte d&apos;Azur ↔ Cannes</h3>
                <p className="text-gray-600 text-sm">Durée : 35-45 min | À partir de 65€</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-semibold">Lyon Saint-Exupéry ↔ Centre</h3>
                <p className="text-gray-600 text-sm">Durée : 30-40 min | À partir de 45€</p>
              </div>
              <div>
                <h3 className="font-semibold">Marseille Provence ↔ Aix</h3>
                <p className="text-gray-600 text-sm">Durée : 25-35 min | À partir de 40€</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-orange-600" />
              Comment ça marche ?
            </h2>
            
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                <div>
                  <h3 className="font-semibold">Réservez en ligne</h3>
                  <p className="text-gray-600 text-sm">Choisissez votre type de transfert et vos horaires</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                <div>
                  <h3 className="font-semibold">Confirmation immédiate</h3>
                  <p className="text-gray-600 text-sm">Recevez votre voucher et les détails du chauffeur</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                <div>
                  <h3 className="font-semibold">Rencontre à l&apos;aéroport</h3>
                  <p className="text-gray-600 text-sm">Votre chauffeur vous attend avec une pancarte</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
                <div>
                  <h3 className="font-semibold">Trajet confortable</h3>
                  <p className="text-gray-600 text-sm">Profitez d&apos;un transport sûr jusqu&apos;à destination</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Pourquoi choisir nos transferts ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Ponctualité garantie</h3>
              <p className="text-gray-600 text-sm">Surveillance des vols en temps réel</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Prix fixes</h3>
              <p className="text-gray-600 text-sm">Pas de surprises, tarifs tout compris</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">24h/24 - 7j/7</h3>
              <p className="text-gray-600 text-sm">Service disponible à toute heure</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Chauffeurs professionnels</h3>
              <p className="text-gray-600 text-sm">Licenciés et expérimentés</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Réservez votre transfert</h2>
          
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de trajet
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Aéroport → Hôtel</option>
                  <option>Hôtel → Aéroport</option>
                  <option>Aller-retour</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de transfert
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Transfert privé</option>
                  <option>Navette partagée</option>
                  <option>VIP Premium</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aéroport
                </label>
                <input
                  type="text"
                  placeholder="Ex: Paris CDG"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Adresse ou nom de l&apos;hôtel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Vérifier la disponibilité
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              <strong>Conseil :</strong> Réservez au moins 48h à l&apos;avance pour garantir la disponibilité
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}