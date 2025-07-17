import React from 'react';
import { Metadata } from 'next';
import { AlertCircle, Info, Shield, Calendar, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conditions générales de vente - Nooraya Voyages',
  description: 'Conditions générales de vente et d\'utilisation des services Nooraya Voyages.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conditions générales de vente
          </h1>
          <p className="text-xl opacity-90">
            En vigueur au {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">
              Les présentes conditions générales de vente s&apos;appliquent à toutes les prestations 
              de services vendues par Nooraya Voyages. En effectuant une réservation, vous 
              acceptez sans réserve l&apos;intégralité de ces conditions.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Article 1 - Réservation et paiement</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">1.1 Processus de réservation</h3>
              <p>
                La réservation devient ferme et définitive après :
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>Acceptation écrite de notre offre</li>
                <li>Versement de l&apos;acompte demandé (30% minimum)</li>
                <li>Réception de notre confirmation de réservation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">1.2 Modalités de paiement</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Acompte de 30% à la réservation</li>
                <li>Solde à payer 30 jours avant le départ</li>
                <li>Paiement intégral pour toute réservation à moins de 30 jours</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 mt-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-sm">
                  Le défaut de paiement du solde à la date prévue entraîne l&apos;annulation 
                  automatique de la réservation avec application des frais d&apos;annulation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Article 2 - Prix</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">2.1 Ce que comprennent nos prix</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Les prestations mentionnées dans le descriptif</li>
                <li>Les taxes aériennes et de sécurité</li>
                <li>L&apos;assistance de notre équipe 24h/24</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2.2 Ce que ne comprennent pas nos prix</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Les frais de visa et passeport</li>
                <li>Les assurances optionnelles</li>
                <li>Les dépenses personnelles</li>
                <li>Les pourboires et extras</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2.3 Révision des prix</h3>
              <p>
                Les prix peuvent être révisés jusqu&apos;à 20 jours avant le départ en cas de :
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>Variation du coût du transport (carburant)</li>
                <li>Variation des taxes et redevances</li>
                <li>Variation des taux de change</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Article 3 - Annulation et modification</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <X className="h-5 w-5 mr-2 text-red-600" />
                3.1 Annulation par le client
              </h3>
              
              <div className="bg-red-50 rounded-lg p-4">
                <p className="font-medium mb-3">Barème des frais d&apos;annulation :</p>
                <ul className="space-y-2 text-sm">
                  <li>• Plus de 60 jours avant le départ : 150€ de frais de dossier</li>
                  <li>• De 60 à 31 jours : 25% du montant total</li>
                  <li>• De 30 à 21 jours : 50% du montant total</li>
                  <li>• De 20 à 8 jours : 75% du montant total</li>
                  <li>• Moins de 8 jours : 100% du montant total</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                3.2 Modification par le client
              </h3>
              <p className="text-gray-700">
                Toute modification est soumise à acceptation et peut entraîner des frais 
                supplémentaires. Les modifications sont traitées comme une annulation 
                suivie d&apos;une nouvelle réservation si elles interviennent à moins de 30 jours.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">3.3 Annulation par Nooraya Voyages</h3>
              <p className="text-gray-700">
                En cas d&apos;annulation de notre fait (hors cas de force majeure), nous vous 
                proposons soit un voyage de substitution, soit le remboursement intégral 
                des sommes versées.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Article 4 - Responsabilités</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">4.1 Responsabilité de Nooraya Voyages</h3>
              <p>
                Nous sommes responsables de la bonne exécution des services prévus au contrat. 
                Toutefois, notre responsabilité ne saurait être engagée en cas de :
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>Force majeure ou fait d&apos;un tiers</li>
                <li>Faute du voyageur</li>
                <li>Retards ou annulations des transporteurs</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">4.2 Responsabilité du voyageur</h3>
              <p>
                Le voyageur est responsable de :
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>La validité de ses documents de voyage</li>
                <li>Le respect des formalités sanitaires</li>
                <li>Son comportement pendant le voyage</li>
                <li>Les dommages qu&apos;il pourrait causer</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Article 5 - Assurances</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold mb-2">Assurance recommandée</h3>
              <p className="text-gray-700">
                Nous recommandons vivement la souscription d&apos;une assurance annulation 
                et assistance rapatriement. Celle-ci doit être souscrite au moment de 
                la réservation.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold mb-2">Couvertures disponibles</h3>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                <li>Annulation toutes causes justifiées</li>
                <li>Assistance médicale et rapatriement</li>
                <li>Bagages et effets personnels</li>
                <li>Responsabilité civile à l&apos;étranger</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Article 6 - Réclamations</h2>
          
          <div className="text-gray-700 space-y-4">
            <p>
              Toute réclamation doit être adressée par lettre recommandée avec AR dans 
              un délai de 30 jours après la fin du voyage à :
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium">
                Nooraya Voyages - Service Réclamations<br />
                123 Avenue des Voyages<br />
                75001 Paris
              </p>
            </div>
            
            <p>
              Après avoir saisi notre service client et à défaut de réponse satisfaisante 
              dans un délai de 60 jours, vous pouvez saisir le médiateur du Tourisme et 
              du Voyage (MTV).
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-slate-700" />
            Protection juridique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Droit applicable</h3>
              <p>
                Les présentes CGV sont soumises au droit français. Tout litige sera 
                de la compétence exclusive des tribunaux français.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Données personnelles</h3>
              <p>
                Vos données sont traitées conformément au RGPD. Consultez notre 
                <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                  politique de confidentialité
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}