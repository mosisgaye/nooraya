import React from 'react';
import { Metadata } from 'next';
import { Shield, FileText, UserCheck, Database, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RGPD - Protection des données - Nooraya Voyages',
  description: 'Informations sur le Règlement Général sur la Protection des Données (RGPD) et vos droits.',
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-green-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            RGPD - Protection de vos données
          </h1>
          <p className="text-xl opacity-90">
            Vos droits et notre engagement pour la protection de vos données personnelles
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold">
              Qu&apos;est-ce que le RGPD ?
            </h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Le Règlement Général sur la Protection des Données (RGPD) est un règlement européen 
            qui renforce et unifie la protection des données personnelles des citoyens de l&apos;Union Européenne.
          </p>

          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-gray-800 font-medium mb-3">
              Le RGPD vous garantit :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Plus de contrôle sur vos données personnelles</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Une transparence totale sur l&apos;utilisation de vos données</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Des droits renforcés et facilement exerçables</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <UserCheck className="h-8 w-8 mr-3 text-green-600" />
            Vos droits RGPD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Droit d&apos;accès</h3>
              <p className="text-gray-600">
                Vous pouvez demander à accéder aux données personnelles que nous détenons sur vous.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Droit de rectification</h3>
              <p className="text-gray-600">
                Vous pouvez demander la correction de données inexactes ou incomplètes.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Droit à l&apos;effacement</h3>
              <p className="text-gray-600">
                Vous pouvez demander la suppression de vos données dans certains cas.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Droit à la limitation</h3>
              <p className="text-gray-600">
                Vous pouvez demander de limiter le traitement de vos données.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Droit à la portabilité</h3>
              <p className="text-gray-600">
                Vous pouvez recevoir vos données dans un format structuré et lisible.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Droit d&apos;opposition</h3>
              <p className="text-gray-600">
                Vous pouvez vous opposer au traitement de vos données dans certains cas.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Database className="h-8 w-8 mr-3 text-purple-600" />
            Comment nous protégeons vos données
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-gray-600" />
                Mesures de sécurité
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-6">
                <li>Cryptage de bout en bout pour toutes les données sensibles</li>
                <li>Authentification à deux facteurs pour l&apos;accès aux comptes</li>
                <li>Audits de sécurité réguliers</li>
                <li>Formation continue de notre personnel</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-gray-600" />
                Principes de traitement
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-6">
                <li>Minimisation des données collectées</li>
                <li>Limitation de la conservation</li>
                <li>Transparence totale sur l&apos;utilisation</li>
                <li>Base légale pour chaque traitement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Comment exercer vos droits</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Pour exercer l&apos;un de vos droits RGPD, vous pouvez :
            </p>
            
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>
                <strong>Nous contacter directement</strong> via notre formulaire dédié ou par email
              </li>
              <li>
                <strong>Fournir une preuve d&apos;identité</strong> pour protéger vos données
              </li>
              <li>
                <strong>Préciser votre demande</strong> et le droit que vous souhaitez exercer
              </li>
              <li>
                <strong>Recevoir une réponse</strong> dans un délai maximum de 30 jours
              </li>
            </ol>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              En cas de réponse insatisfaisante, vous pouvez déposer une réclamation 
              auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Délégué à la Protection des Données</h2>
          <p className="text-gray-700 mb-6">
            Notre DPO est à votre disposition pour toute question concernant vos données personnelles :
          </p>
          
          <div className="bg-white rounded-lg p-6">
            <p className="font-semibold text-gray-800 mb-2">Contact DPO</p>
            <p className="text-gray-600">Email : dpo@noorayavoyages.com</p>
            <p className="text-gray-600">Téléphone : +33 1 23 45 67 89</p>
            <p className="text-gray-600">Adresse : Nooraya Voyages - Service DPO<br />123 Avenue des Voyages, 75001 Paris</p>
          </div>
        </div>
      </div>
    </div>
  );
}