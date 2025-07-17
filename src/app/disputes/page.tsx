import React from 'react';
import { Metadata } from 'next';
import { Shield, Scale, FileText, Phone, Mail, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Règlement des litiges - Nooraya Voyages',
  description: 'Procédures de règlement des litiges et réclamations. Médiation et résolution amiable des conflits.',
};

export default function DisputesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-green-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Règlement des litiges
          </h1>
          <p className="text-xl opacity-90">
            Nous privilégions toujours une résolution amiable de vos réclamations
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6 text-green-600">
            <Scale className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Procédure de réclamation</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">1. Réclamation initiale</h3>
              <p className="text-gray-600 mb-2">
                Contactez d&apos;abord notre service client pour exposer votre problème. 
                Nous nous engageons à vous répondre sous 48 heures ouvrées.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Délai de réponse : 48h
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">2. Escalade de la réclamation</h3>
              <p className="text-gray-600 mb-2">
                Si la réponse ne vous satisfait pas, vous pouvez demander l&apos;intervention 
                d&apos;un responsable. Votre dossier sera réexaminé en détail.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Délai de réponse : 7 jours
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">3. Médiation</h3>
              <p className="text-gray-600 mb-2">
                En cas de désaccord persistant, vous pouvez faire appel à un médiateur 
                indépendant. Cette procédure est gratuite pour le consommateur.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Délai de résolution : 90 jours
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-green-600" />
            Médiateur du tourisme
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Conformément aux articles L.616-1 et R.616-1 du code de la consommation, 
              nous proposons un dispositif de médiation de la consommation.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p className="text-gray-700">
                  <strong>Médiateur du Tourisme et du Voyage (MTV)</strong><br />
                  BP 80 303 - 75 823 Paris Cedex 17
                </p>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <p className="text-gray-700">
                  Site web : www.mtv.travel
                </p>
              </div>
              
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <p className="text-gray-700">
                  La médiation n&apos;est possible qu&apos;après avoir tenté de résoudre 
                  le litige directement avec notre service client.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-purple-600" />
            Documents nécessaires
          </h2>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-700">Copie de votre réservation ou facture</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-700">Correspondances échangées avec notre service client</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-700">Tout justificatif pertinent (photos, témoignages, etc.)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-700">Description détaillée du litige</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-green-900">
            Contactez-nous
          </h2>
          <p className="text-gray-700 mb-6">
            Notre équipe est à votre écoute pour résoudre tout différend à l&apos;amiable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-semibold">Par téléphone</p>
                <p className="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-semibold">Par email</p>
                <p className="text-gray-600">reclamations@noorayavoyages.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}