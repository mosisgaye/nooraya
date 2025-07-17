import React from 'react';
import { Metadata } from 'next';
import { XCircle, Calendar, AlertTriangle, Clock, HelpCircle, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique d\'annulation - Nooraya Voyages',
  description: 'Conditions et procédures d\'annulation de vos réservations chez Nooraya Voyages.',
};

export default function CancellationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politique d&apos;annulation
          </h1>
          <p className="text-xl opacity-90">
            Annulez en toute transparence
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Important</h3>
              <p className="text-gray-700">
                Les conditions d&apos;annulation varient selon le type de réservation, le tarif choisi 
                et le délai avant le départ. Vérifiez toujours les conditions spécifiques de votre 
                réservation avant d&apos;annuler.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-3 text-red-600" />
            Barème des frais d&apos;annulation
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Vols secs</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Délai avant départ</th>
                      <th className="border p-3 text-left">Frais d&apos;annulation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Plus de 60 jours</td>
                      <td className="border p-3">150€ de frais de dossier</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border p-3">Entre 60 et 31 jours</td>
                      <td className="border p-3">25% du montant total</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Entre 30 et 21 jours</td>
                      <td className="border p-3">50% du montant total</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border p-3">Entre 20 et 8 jours</td>
                      <td className="border p-3">75% du montant total</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Moins de 8 jours</td>
                      <td className="border p-3 text-red-600 font-semibold">100% du montant total</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hôtels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-green-700">Tarifs flexibles</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Annulation gratuite jusqu&apos;à 24-48h</li>
                    <li>• Modification sans frais</li>
                    <li>• Remboursement intégral si éligible</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-red-700">Tarifs non remboursables</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Aucun remboursement possible</li>
                    <li>• Prix réduit de 10-30%</li>
                    <li>• Paiement immédiat requis</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Packages (Vol + Hôtel)</h3>
              <p className="text-gray-700 mb-3">
                Les frais d&apos;annulation les plus restrictifs s&apos;appliquent entre le vol et l&apos;hôtel.
              </p>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Exemple :</strong> Si le vol a des frais de 50% et l&apos;hôtel de 75%, 
                  les frais totaux seront de 75% du montant du package.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <XCircle className="h-6 w-6 mr-3 text-purple-600" />
            Comment annuler votre réservation
          </h2>
          
          <ol className="space-y-6">
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold mb-2">Connectez-vous à votre espace client</h3>
                <p className="text-gray-700">
                  Accédez à la section &quot;Mes réservations&quot; pour voir toutes vos réservations actives
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold mb-2">Sélectionnez la réservation</h3>
                <p className="text-gray-700">
                  Cliquez sur la réservation que vous souhaitez annuler et vérifiez les conditions
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
              <div>
                <h3 className="font-semibold mb-2">Confirmez l&apos;annulation</h3>
                <p className="text-gray-700">
                  Cliquez sur &quot;Annuler la réservation&quot; et confirmez après avoir pris connaissance des frais
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
              <div>
                <h3 className="font-semibold mb-2">Recevez la confirmation</h3>
                <p className="text-gray-700">
                  Un email de confirmation avec le détail du remboursement vous sera envoyé immédiatement
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-3 text-green-600" />
            Cas particuliers
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold mb-2">Force majeure</h3>
              <p className="text-gray-700">
                En cas de force majeure (catastrophe naturelle, pandémie, guerre), des conditions 
                spéciales peuvent s&apos;appliquer. Contactez-nous pour étudier votre situation.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold mb-2">Maladie ou accident</h3>
              <p className="text-gray-700">
                Sur présentation d&apos;un certificat médical, nous étudions chaque cas individuellement. 
                Une assurance annulation est recommandée pour ces situations.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="font-semibold mb-2">Modification de vol par la compagnie</h3>
              <p className="text-gray-700">
                Si la compagnie modifie significativement votre vol (plus de 3h), vous pouvez annuler 
                sans frais et obtenir un remboursement intégral.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calculator className="h-6 w-6 mr-3 text-green-600" />
            Calculateur de frais
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de réservation
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Vol seul</option>
                <option>Hôtel seul</option>
                <option>Package vol + hôtel</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de départ
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant total de la réservation
              </label>
              <input
                type="number"
                placeholder="0.00 €"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <button
              type="button"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Calculer les frais d&apos;annulation
            </button>
          </form>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <HelpCircle className="h-6 w-6 mr-3 text-green-600" />
            Besoin d&apos;aide ?
          </h2>
          
          <p className="text-gray-700 mb-6">
            Notre équipe est disponible pour vous accompagner dans votre annulation et 
            répondre à toutes vos questions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/chat"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Chat en direct
            </a>
            <a
              href="tel:+33123456789"
              className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
            >
              +33 1 23 45 67 89
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}