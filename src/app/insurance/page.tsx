import React from 'react';
import { Metadata } from 'next';
import { Shield, Heart, Plane, Home, Users, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Assurance voyage - Nooraya Voyages',
  description: 'Protégez vos voyages avec nos assurances complètes : annulation, assistance médicale, bagages.',
};

export default function InsurancePage() {
  const insuranceOptions = [
    {
      name: 'Essentielle',
      price: 'À partir de 15€',
      color: 'blue',
      features: [
        'Annulation pour maladie',
        'Assistance rapatriement',
        'Frais médicaux jusqu\'à 150 000€',
        'Responsabilité civile',
        'Assistance 24h/24'
      ]
    },
    {
      name: 'Confort',
      price: 'À partir de 35€',
      color: 'green',
      popular: true,
      features: [
        'Tout de l\'Essentielle +',
        'Annulation toutes causes',
        'Bagages jusqu\'à 3000€',
        'Retard de vol (>4h)',
        'Interruption de séjour',
        'Sports et loisirs inclus'
      ]
    },
    {
      name: 'Premium',
      price: 'À partir de 65€',
      color: 'purple',
      features: [
        'Tout du Confort +',
        'Frais médicaux jusqu\'à 500 000€',
        'Bagages jusqu\'à 5000€',
        'Annulation sans franchise',
        'Protection juridique',
        'Garantie prix',
        'Conciergerie 24h/24'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Assurance voyage
          </h1>
          <p className="text-xl opacity-90">
            Voyagez l&apos;esprit tranquille avec nos garanties complètes
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi souscrire une assurance voyage ?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Un imprévu peut survenir à tout moment. Protégez votre investissement et 
            voyagez sereinement avec une couverture adaptée à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {insuranceOptions.map((option, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                option.popular ? 'ring-2 ring-green-500 transform scale-105' : ''
              }`}
            >
              {option.popular && (
                <div className="bg-green-500 text-white text-center py-2 text-sm font-semibold">
                  PLUS POPULAIRE
                </div>
              )}
              <div className={`bg-gradient-to-r from-${option.color}-500 to-${option.color}-600 text-white p-6`}>
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <p className="text-3xl font-bold">{option.price}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 bg-${option.color}-600 text-white py-3 rounded-lg font-semibold hover:bg-${option.color}-700 transition-colors`}>
                  Choisir cette formule
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Garanties détaillées</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-blue-600" />
                Annulation & Modification
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Maladie, accident ou décès</li>
                <li>• Complications de grossesse</li>
                <li>• Licenciement économique</li>
                <li>• Convocation administrative</li>
                <li>• Refus de visa</li>
                <li>• Vol de papiers d&apos;identité</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-600" />
                Assistance médicale
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Frais médicaux et hospitalisation</li>
                <li>• Rapatriement sanitaire</li>
                <li>• Visite d&apos;un proche si hospitalisation</li>
                <li>• Frais de recherche et secours</li>
                <li>• Assistance psychologique</li>
                <li>• Avance de caution pénale</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Plane className="h-6 w-6 mr-2 text-purple-600" />
                Bagages & Transport
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Perte, vol ou détérioration bagages</li>
                <li>• Retard de livraison bagages</li>
                <li>• Retard ou annulation de vol</li>
                <li>• Manquement de correspondance</li>
                <li>• Sur-réservation (surbooking)</li>
                <li>• Frais de première nécessité</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Home className="h-6 w-6 mr-2 text-green-600" />
                Autres garanties
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Responsabilité civile à l&apos;étranger</li>
                <li>• Interruption de séjour</li>
                <li>• Retour anticipé</li>
                <li>• Assistance juridique</li>
                <li>• Garantie neige (sports d&apos;hiver)</li>
                <li>• Protection achats</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
            Points d&apos;attention
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Exclusions courantes</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Maladies préexistantes non déclarées</li>
                <li>• Sports extrêmes (sauf option)</li>
                <li>• Guerre et terrorisme</li>
                <li>• Épidémies (vérifier conditions)</li>
                <li>• Négligence ou imprudence</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Conseils importants</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Souscrivez dans les 48h après réservation</li>
                <li>• Déclarez toute condition médicale</li>
                <li>• Conservez tous les justificatifs</li>
                <li>• Lisez attentivement les conditions</li>
                <li>• Contactez-nous en cas de doute</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Comment ça marche ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Choisissez</h3>
              <p className="text-sm text-gray-600">
                Sélectionnez la formule adaptée à votre voyage
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Souscrivez</h3>
              <p className="text-sm text-gray-600">
                Complétez le formulaire en ligne rapidement
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Voyagez</h3>
              <p className="text-sm text-gray-600">
                Partez l&apos;esprit tranquille, vous êtes protégé
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 inline-block mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">4. Assistance</h3>
              <p className="text-sm text-gray-600">
                24h/24, 7j/7 en cas de besoin
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Obtenez votre devis personnalisé
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Répondez à quelques questions et recevez une proposition adaptée à votre voyage
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Demander un devis gratuit
          </button>
        </div>
      </div>
    </div>
  );
}