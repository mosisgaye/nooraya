import React from 'react';
import { Metadata } from 'next';
import { FileText, Building, Shield, Scale, MapPin, Phone, Mail, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentions légales - Nooraya Voyages',
  description: 'Mentions légales et informations juridiques de Nooraya Voyages, agence de voyage immatriculée.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mentions légales
          </h1>
          <p className="text-xl opacity-90">
            Informations juridiques et légales
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Building className="h-6 w-6 mr-3 text-gray-700" />
            Informations sur l&apos;entreprise
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Raison sociale</h3>
              <p>Nooraya Voyages SAS</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Forme juridique</h3>
              <p>Société par Actions Simplifiée (SAS)</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Capital social</h3>
              <p>100 000 euros</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">RCS</h3>
              <p>Paris B 812 345 678</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">TVA Intracommunautaire</h3>
              <p>FR 12 812345678</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Code APE</h3>
              <p>7912Z - Activités des voyagistes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-blue-600" />
            Autorisations et garanties
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold mb-2">Immatriculation Atout France</h3>
              <p className="text-gray-700">
                Nooraya Voyages est immatriculée au registre des opérateurs de voyages 
                et de séjours sous le numéro : <strong>IM075180042</strong>
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold mb-2">Garantie financière</h3>
              <p className="text-gray-700">
                <strong>APST (Association Professionnelle de Solidarité du Tourisme)</strong><br />
                15 avenue Carnot, 75017 Paris<br />
                Montant de la garantie : 500 000 €
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="font-semibold mb-2">Assurance Responsabilité Civile Professionnelle</h3>
              <p className="text-gray-700">
                <strong>HISCOX Europe Underwriting Limited</strong><br />
                19 rue Louis Le Grand, 75002 Paris<br />
                Police n° HA RCP0234567<br />
                Montant des garanties : 7 500 000 € par sinistre
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-3 text-red-600" />
            Siège social
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Adresse</h3>
              <p className="text-gray-700">
                Nooraya Voyages<br />
                123 Avenue des Voyages<br />
                75001 Paris<br />
                France
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +33 1 23 45 67 89
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@noorayavoyages.com
                </p>
                <p className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  www.noorayavoyages.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-orange-600" />
            Directeur de la publication
          </h2>
          
          <div className="text-gray-700">
            <p className="mb-2">
              <strong>Nom :</strong> M. Jean DUPONT
            </p>
            <p className="mb-2">
              <strong>Qualité :</strong> Président Directeur Général
            </p>
            <p>
              <strong>Email :</strong> direction@noorayavoyages.com
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-3 text-green-600" />
            Hébergement du site
          </h2>
          
          <div className="text-gray-700">
            <p className="mb-2">
              <strong>Hébergeur :</strong> Vercel Inc.
            </p>
            <p className="mb-2">
              <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </p>
            <p className="mb-2">
              <strong>Site web :</strong> www.vercel.com
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Scale className="h-6 w-6 mr-3 text-indigo-600" />
            Propriété intellectuelle
          </h2>
          
          <div className="text-gray-700 space-y-4">
            <p>
              L&apos;ensemble de ce site relève de la législation française et internationale 
              sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris pour les documents téléchargeables 
              et les représentations iconographiques et photographiques.
            </p>
            
            <p>
              La reproduction de tout ou partie de ce site sur un support quelconque est 
              formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
            
            <p>
              Les marques citées sur ce site sont déposées par les sociétés qui en sont 
              propriétaires.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 text-center">
            Les présentes mentions légales sont susceptibles d&apos;être modifiées à tout moment. 
            Nous vous invitons à les consulter régulièrement.
          </p>
          <p className="text-sm text-gray-600 text-center mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}