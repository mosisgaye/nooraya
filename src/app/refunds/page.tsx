import React from 'react';
import { Metadata } from 'next';
import { CreditCard, Clock, FileText, CheckCircle, AlertCircle, TrendingDown, Calculator, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remboursements - Nooraya Voyages',
  description: 'Politique de remboursement et procédures pour obtenir un remboursement chez Nooraya Voyages.',
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politique de remboursement
          </h1>
          <p className="text-xl opacity-90">
            Nous facilitons vos remboursements
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingDown className="h-6 w-6 mr-3 text-green-600" />
            Cas de remboursement
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Remboursement total</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Annulation de notre fait (hors force majeure)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Double facturation avérée</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Service non fourni sans alternative proposée</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Remboursement partiel</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Annulation selon nos CGV (frais déduits)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Modification tarifaire à la baisse</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <span>Services partiellement fournis</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Non remboursable</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <span>No-show (non présentation)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <span>Documents de voyage invalides</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <span>Tarifs non remboursables acceptés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Procédure de remboursement
          </h2>
          
          <ol className="space-y-6">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Demande de remboursement</h3>
                <p className="text-gray-700 mb-2">
                  Remplissez le formulaire en ligne ou contactez notre service client
                </p>
                <div className="bg-blue-50 rounded p-3 text-sm text-gray-600">
                  Documents requis : réservation, justificatifs, RIB
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Vérification du dossier</h3>
                <p className="text-gray-700 mb-2">
                  Notre équipe examine votre demande sous 48h ouvrées
                </p>
                <div className="bg-blue-50 rounded p-3 text-sm text-gray-600">
                  Vous recevez un email de confirmation avec le numéro de dossier
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Traitement</h3>
                <p className="text-gray-700 mb-2">
                  Calcul du montant selon nos conditions et validation
                </p>
                <div className="bg-blue-50 rounded p-3 text-sm text-gray-600">
                  Délai moyen : 5-7 jours ouvrés
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Remboursement effectif</h3>
                <p className="text-gray-700 mb-2">
                  Virement sur le compte utilisé pour le paiement
                </p>
                <div className="bg-blue-50 rounded p-3 text-sm text-gray-600">
                  Délai bancaire : 3-10 jours selon votre banque
                </div>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-3 text-purple-600" />
            Délais de remboursement
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-3 text-left">Type de service</th>
                  <th className="border p-3 text-left">Délai de traitement</th>
                  <th className="border p-3 text-left">Mode de remboursement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Vol sec</td>
                  <td className="border p-3">7-14 jours</td>
                  <td className="border p-3">Mode de paiement original</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Hôtel</td>
                  <td className="border p-3">5-10 jours</td>
                  <td className="border p-3">Mode de paiement original</td>
                </tr>
                <tr>
                  <td className="border p-3">Package complet</td>
                  <td className="border p-3">10-20 jours</td>
                  <td className="border p-3">Virement bancaire</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Assurance</td>
                  <td className="border p-3">15-30 jours</td>
                  <td className="border p-3">Selon assureur</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calculator className="h-6 w-6 mr-3 text-orange-600" />
            Calcul des remboursements
          </h2>
          
          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Le montant du remboursement est calculé selon :
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• La date d&apos;annulation par rapport au départ</li>
              <li>• Les conditions tarifaires du billet/réservation</li>
              <li>• Les frais de service applicables</li>
              <li>• Les taxes remboursables</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-green-700">Remboursable</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Taxes aéroport non utilisées</li>
                <li>✓ Assurances (si annulation dans les 14 jours)</li>
                <li>✓ Services non consommés</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-red-700">Non remboursable</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✗ Frais de service Nooraya</li>
                <li>✗ Frais d&apos;émission billets</li>
                <li>✗ Pénalités compagnies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <HelpCircle className="h-6 w-6 mr-3 text-green-600" />
            Besoin d&apos;aide ?
          </h2>
          
          <p className="text-gray-700 mb-6">
            Notre équipe dédiée aux remboursements est là pour vous accompagner
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">Email dédié</p>
              <p className="text-sm text-gray-600">remboursements@noorayavoyages.com</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Hotline</p>
              <p className="text-sm text-gray-600">+33 1 23 45 67 90</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">Suivi en ligne</p>
              <p className="text-sm text-gray-600">Espace client - Mes remboursements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}