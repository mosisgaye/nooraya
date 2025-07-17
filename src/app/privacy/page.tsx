import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, Users, Cookie, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Nooraya Voyages',
  description: 'Découvrez comment Nooraya Voyages protège vos données personnelles et respecte votre vie privée.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-xl opacity-90">
            Votre vie privée est notre priorité
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-600 mb-6">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p className="text-gray-700 mb-8">
            Chez Nooraya Voyages, nous accordons une importance primordiale à la protection 
            de vos données personnelles. Cette politique de confidentialité explique comment 
            nous collectons, utilisons et protégeons vos informations.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Database className="h-6 w-6 mr-3 text-blue-600" />
              Collecte des données
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Données que nous collectons :</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Informations d&apos;identification (nom, prénom, date de naissance)</li>
                  <li>Coordonnées (email, téléphone, adresse)</li>
                  <li>Informations de paiement (cryptées et sécurisées)</li>
                  <li>Préférences de voyage et historique de réservation</li>
                  <li>Données de navigation sur notre site</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-3 text-green-600" />
              Utilisation des données
            </h2>
            <p className="text-gray-700 mb-4">
              Nous utilisons vos données personnelles pour :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Traiter vos réservations et paiements</li>
              <li>Vous envoyer les confirmations et documents de voyage</li>
              <li>Améliorer nos services et personnaliser votre expérience</li>
              <li>Vous informer de nos offres spéciales (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-purple-600" />
              Protection des données
            </h2>
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre des mesures de sécurité avancées :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Lock className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">Cryptage SSL/TLS pour toutes les transmissions</span>
                </li>
                <li className="flex items-start">
                  <Lock className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">Serveurs sécurisés et régulièrement audités</span>
                </li>
                <li className="flex items-start">
                  <Lock className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">Accès restreint aux données personnelles</span>
                </li>
                <li className="flex items-start">
                  <Lock className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">Formation régulière de notre personnel</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="h-6 w-6 mr-3 text-orange-600" />
              Partage des données
            </h2>
            <p className="text-gray-700 mb-4">
              Nous ne vendons jamais vos données personnelles. Nous pouvons les partager uniquement avec :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Les compagnies aériennes et hôtels pour vos réservations</li>
              <li>Les prestataires de paiement sécurisés</li>
              <li>Les autorités légales si requis par la loi</li>
              <li>Nos partenaires de confiance (avec votre consentement)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Cookie className="h-6 w-6 mr-3 text-yellow-600" />
              Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez 
              gérer vos préférences de cookies à tout moment. Pour plus d&apos;informations, 
              consultez notre <a href="/cookies" className="text-blue-600 hover:underline">politique de cookies</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Vos droits</h2>
            <p className="text-gray-700 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Droit d&apos;accès</h3>
                <p className="text-sm text-gray-600">Demander une copie de vos données</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Droit de rectification</h3>
                <p className="text-sm text-gray-600">Corriger vos informations personnelles</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Droit à l&apos;effacement</h3>
                <p className="text-sm text-gray-600">Supprimer vos données de nos systèmes</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Droit à la portabilité</h3>
                <p className="text-sm text-gray-600">Recevoir vos données dans un format standard</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Conservation des données</h2>
            <p className="text-gray-700">
              Nous conservons vos données personnelles uniquement pendant la durée nécessaire 
              aux finalités pour lesquelles elles ont été collectées, conformément aux 
              exigences légales et réglementaires.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Modifications</h2>
            <p className="text-gray-700">
              Nous pouvons mettre à jour cette politique de confidentialité. Les modifications 
              importantes seront notifiées par email ou sur notre site web.
            </p>
          </section>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            Contact - Protection des données
          </h2>
          <p className="text-gray-700 mb-6">
            Pour toute question concernant vos données personnelles ou pour exercer vos droits :
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">dpo@noorayavoyages.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="font-semibold">Téléphone</p>
                <p className="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}