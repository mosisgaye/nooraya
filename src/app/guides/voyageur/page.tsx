import React from 'react';
import { Metadata } from 'next';
import { FileText, CreditCard, Heart, Globe, AlertCircle, CheckCircle, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guide du voyageur - Nooraya Voyages',
  description: 'Guide complet pour préparer votre voyage : documents, santé, bagages et conseils pratiques.',
};

export default function VoyageurGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guide du voyageur
          </h1>
          <p className="text-xl opacity-90">
            Tout ce qu&apos;il faut savoir avant de partir
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Documents de voyage
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Passeport</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Validité minimum 6 mois après la date de retour</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Au moins 2 pages vierges pour les tampons</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Photocopie conservée séparément</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Visa</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Vérifier les exigences selon votre destination</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Délai d&apos;obtention : 2 semaines à 2 mois</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Certains pays proposent des e-visas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-3 text-red-600" />
            Santé et vaccinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Avant le départ</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Consultation médecin 4-6 semaines avant</li>
                <li>• Mise à jour carnet de vaccination</li>
                <li>• Trousse de pharmacie adaptée</li>
                <li>• Assurance santé internationale</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Vaccins recommandés</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• DTP (Diphtérie-Tétanos-Polio)</li>
                <li>• Hépatite A et B</li>
                <li>• Fièvre jaune (zones tropicales)</li>
                <li>• Typhoïde (selon destination)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important :</strong> Certains pays exigent un certificat de vaccination 
              contre la fièvre jaune. Renseignez-vous auprès de votre médecin ou d&apos;un centre 
              de vaccination international.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <CreditCard className="h-6 w-6 mr-3 text-green-600" />
            Argent et moyens de paiement
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold mb-2">Cartes bancaires</h3>
              <p className="text-gray-700">
                Prévenez votre banque de vos dates et destinations. Vérifiez les plafonds 
                de retrait et paiement à l&apos;étranger.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold mb-2">Espèces</h3>
              <p className="text-gray-700">
                Emportez des euros ou dollars US en petites coupures. Changez à l&apos;arrivée 
                dans des bureaux officiels.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="font-semibold mb-2">Sécurité</h3>
              <p className="text-gray-700">
                Répartissez votre argent dans plusieurs endroits. Gardez une copie des 
                numéros de cartes en lieu sûr.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-3 text-purple-600" />
            Check-list avant le départ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">30 jours avant</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Vérifier passeport et visa
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Prendre RDV médecin/vaccinations
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Souscrire assurance voyage
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Réserver transferts aéroport
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">7 jours avant</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Check-in en ligne
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Préparer documents voyage
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Vérifier météo destination
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Confirmer réservations
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Download className="h-6 w-6 mr-3 text-blue-600" />
            Téléchargez notre guide complet
          </h2>
          <p className="text-gray-700 mb-6">
            Retrouvez toutes ces informations et bien plus dans notre guide PDF de 50 pages.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Télécharger le guide PDF
          </button>
        </div>
      </div>
    </div>
  );
}