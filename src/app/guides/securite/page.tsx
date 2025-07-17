import React from 'react';
import { Metadata } from 'next';
import { Shield, Heart, Phone, AlertTriangle, Lock, MapPin, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guide Sécurité Voyage - Nooraya Voyages',
  description: 'Conseils de sécurité et santé pour voyager sereinement. Précautions et numéros d\'urgence.',
};

export default function SecuriteGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Voyager en sécurité
          </h1>
          <p className="text-xl opacity-90">
            Conseils santé et sécurité pour un voyage serein
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-purple-600" />
            Sécurité personnelle
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold mb-3">Avant le départ</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Enregistrez votre voyage auprès du consulat</li>
                <li>• Scannez tous vos documents importants</li>
                <li>• Partagez votre itinéraire avec des proches</li>
                <li>• Installez une app de localisation d&apos;urgence</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold mb-3">Sur place</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Évitez d&apos;afficher objets de valeur</li>
                <li>• Utilisez le coffre-fort de l&apos;hôtel</li>
                <li>• Restez vigilant dans les lieux touristiques</li>
                <li>• Privilégiez les taxis officiels</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-purple-600" />
                Protection des documents
              </h3>
              <p className="text-gray-700">
                Gardez vos originaux en sécurité et utilisez des copies pour vos déplacements 
                quotidiens. Stockez des copies numériques dans le cloud.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-3 text-red-600" />
            Santé en voyage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Précautions sanitaires</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Eau en bouteille uniquement</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Éviter glaçons et crudités</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Protection anti-moustiques</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Hygiène des mains fréquente</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Trousse de pharmacie</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Médicaments personnels + ordonnance</li>
                <li>• Anti-diarrhéique et réhydratation</li>
                <li>• Antalgiques et antipyrétiques</li>
                <li>• Pansements et antiseptique</li>
                <li>• Crème solaire haute protection</li>
                <li>• Répulsif anti-insectes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important :</strong> Souscrivez une assurance santé internationale 
              couvrant les frais médicaux et le rapatriement sanitaire.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Phone className="h-6 w-6 mr-3 text-green-600" />
            Numéros d&apos;urgence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">International</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>112</strong> - Urgence Europe</li>
                <li><strong>911</strong> - Urgence USA/Canada</li>
                <li><strong>+33 1 43 17 55 55</strong> - Centre de crise France</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Assistance Nooraya</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>+33 1 23 45 67 89</strong> - 24h/24</li>
                <li><strong>WhatsApp</strong> - +33 6 12 34 56 78</li>
                <li><strong>Email</strong> - urgence@noorayavoyages.com</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Conseil :</strong> Enregistrez ces numéros dans votre téléphone 
              et gardez une copie papier dans votre portefeuille.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-3 text-orange-600" />
            Zones à risque
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-yellow-600" />
                Consultez les conseils aux voyageurs
              </h3>
              <p className="text-gray-700 mb-2">
                Avant tout départ, consultez le site du Ministère des Affaires Étrangères 
                pour les dernières recommandations sur votre destination.
              </p>
              <a href="#" className="text-blue-600 hover:underline">
                www.diplomatie.gouv.fr/conseils-aux-voyageurs
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-green-800">Zone verte</p>
                <p className="text-sm text-gray-600">Vigilance normale</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-100 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-yellow-800">Zone jaune</p>
                <p className="text-sm text-gray-600">Vigilance renforcée</p>
              </div>
              
              <div className="text-center p-4 bg-red-100 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-red-800">Zone rouge</p>
                <p className="text-sm text-gray-600">Déconseillé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-purple-600" />
            Check-list sécurité
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Avant le départ</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Assurance voyage souscrite</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Documents scannés</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Vaccinations à jour</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Contacts d&apos;urgence notés</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Dans vos bagages</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Trousse de pharmacie</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Copie des documents</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Cadenas pour bagages</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Pochette sécurisée</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}