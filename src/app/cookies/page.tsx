import React from 'react';
import { Metadata } from 'next';
import { Cookie, Shield, Eye, BarChart, Settings, Info, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de cookies - Nooraya Voyages',
  description: 'Découvrez comment nous utilisons les cookies et gérez vos préférences de confidentialité.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-green-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politique de cookies
          </h1>
          <p className="text-xl opacity-90">
            Transparence sur notre utilisation des cookies
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <Cookie className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold">Qu&apos;est-ce qu&apos;un cookie ?</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez 
            notre site web. Les cookies nous permettent de vous offrir une expérience personnalisée 
            et d&apos;améliorer nos services.
          </p>

          <div className="bg-orange-50 rounded-lg p-6">
            <p className="text-gray-800 font-medium mb-3">
              Les cookies nous aident à :
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Mémoriser vos préférences et paramètres
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Améliorer la vitesse et la sécurité du site
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Personnaliser votre expérience utilisateur
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Analyser l&apos;utilisation de notre site
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Types de cookies utilisés</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Cookies essentiels
              </h3>
              <p className="text-gray-600 mb-2">
                Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm">
                <p className="font-medium text-gray-700 mb-1">Exemples :</p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Cookies de session</li>
                  <li>Préférences de confidentialité</li>
                  <li>Sécurité et authentification</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-green-600" />
                Cookies fonctionnels
              </h3>
              <p className="text-gray-600 mb-2">
                Améliorent votre expérience en mémorisant vos choix et préférences.
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm">
                <p className="font-medium text-gray-700 mb-1">Exemples :</p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Langue préférée</li>
                  <li>Devise sélectionnée</li>
                  <li>Historique de recherche</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-purple-600" />
                Cookies analytiques
              </h3>
              <p className="text-gray-600 mb-2">
                Nous aident à comprendre comment vous utilisez notre site.
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm">
                <p className="font-medium text-gray-700 mb-1">Exemples :</p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Pages visitées</li>
                  <li>Durée de visite</li>
                  <li>Taux de rebond</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-yellow-600" />
                Cookies marketing
              </h3>
              <p className="text-gray-600 mb-2">
                Utilisés pour vous présenter des publicités pertinentes.
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm">
                <p className="font-medium text-gray-700 mb-1">Exemples :</p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Remarketing</li>
                  <li>Publicités ciblées</li>
                  <li>Mesure de performance des campagnes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Gérer vos préférences</h2>
          
          <p className="text-gray-700 mb-6">
            Vous avez le contrôle total sur les cookies que nous utilisons. 
            Vous pouvez accepter ou refuser certains types de cookies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button className="border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Accepter tous les cookies
            </button>
            <button className="border-2 border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Personnaliser mes préférences
            </button>
          </div>

          <div className="bg-green-50 rounded-lg p-4 flex items-start">
            <Info className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Vous pouvez également configurer votre navigateur pour bloquer ou supprimer 
              les cookies. Notez que cela peut affecter certaines fonctionnalités du site.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Cookies tiers</h2>
          
          <p className="text-gray-700 mb-4">
            Certains de nos partenaires peuvent également placer des cookies sur votre appareil :
          </p>

          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Google Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Analyse du trafic et comportement des utilisateurs
                </p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Facebook Pixel</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Publicités ciblées et mesure de performance
                </p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Stripe</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Traitement sécurisé des paiements
                </p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Plus d&apos;informations</h2>
          <p className="text-gray-700 mb-4">
            Si vous avez des questions sur notre utilisation des cookies ou souhaitez 
            exercer vos droits, n&apos;hésitez pas à nous contacter.
          </p>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>Email :</strong> privacy@noorayavoyages.com
            </p>
            <p className="text-gray-600">
              <strong>Téléphone :</strong> +33 1 23 45 67 89
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}