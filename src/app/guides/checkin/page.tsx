import React from 'react';
import { Metadata } from 'next';
import { Clock, Smartphone, MapPin, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guide Check-in - Nooraya Voyages',
  description: 'Guide complet des procédures d\'enregistrement en ligne et à l\'aéroport.',
};

export default function CheckinGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Procédures d&apos;enregistrement
          </h1>
          <p className="text-xl opacity-90">
            Check-in en ligne et à l&apos;aéroport simplifié
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Smartphone className="h-6 w-6 mr-3 text-green-600" />
            Check-in en ligne
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Quand s&apos;enregistrer ?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>24h à 48h avant</strong> le départ pour la plupart des compagnies</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>30 jours avant</strong> pour certaines compagnies low-cost</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>1h avant</strong> fermeture du check-in en ligne</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Étapes du check-in en ligne</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                  <div>
                    <h4 className="font-semibold">Accédez au site de la compagnie</h4>
                    <p className="text-gray-600 text-sm">Munissez-vous de votre numéro de réservation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                  <div>
                    <h4 className="font-semibold">Vérifiez vos informations</h4>
                    <p className="text-gray-600 text-sm">Nom, prénom, date de naissance, numéro de passeport</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                  <div>
                    <h4 className="font-semibold">Choisissez votre siège</h4>
                    <p className="text-gray-600 text-sm">Selon disponibilité et type de billet</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
                  <div>
                    <h4 className="font-semibold">Téléchargez votre carte d&apos;embarquement</h4>
                    <p className="text-gray-600 text-sm">PDF, mobile pass ou impression</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-3 text-blue-600" />
            Check-in à l&apos;aéroport
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Comptoirs traditionnels</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Ouverture 2-3h avant le vol</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Fermeture 45min-1h avant</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Enregistrement des bagages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Attribution des sièges</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Bornes automatiques</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Plus rapide que les comptoirs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Impression carte d&apos;embarquement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Étiquettes bagages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Disponible 24h/24</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Conseil :</strong> Même avec un check-in en ligne, présentez-vous au 
              comptoir de dépose bagages si vous avez des valises en soute.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
            Points d&apos;attention
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="font-semibold mb-2">Documents requis</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Passeport ou carte d&apos;identité valide</li>
                <li>• Visa si nécessaire</li>
                <li>• Billet électronique ou référence</li>
                <li>• Carte d&apos;embarquement (si check-in fait)</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="font-semibold mb-2">Restrictions bagages</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Poids maximum selon la classe</li>
                <li>• Dimensions cabine : 55x40x20 cm</li>
                <li>• Liquides : 100ml max par contenant</li>
                <li>• Objets interdits en cabine</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold mb-2">Services spéciaux</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Assistance mobilité réduite</li>
                <li>• Voyageurs avec enfants</li>
                <li>• Animaux de compagnie</li>
                <li>• Équipements sportifs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Info className="h-6 w-6 mr-3 text-green-600" />
            Astuces pour gagner du temps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Avant l&apos;aéroport</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Check-in en ligne dès l&apos;ouverture</li>
                <li>✓ Carte d&apos;embarquement sur mobile</li>
                <li>✓ Pesez vos bagages à la maison</li>
                <li>✓ Préparez vos documents</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">À l&apos;aéroport</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Utilisez les bornes automatiques</li>
                <li>✓ Files prioritaires si éligible</li>
                <li>✓ Dépose bagages express</li>
                <li>✓ Contrôles sécurité rapides</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}