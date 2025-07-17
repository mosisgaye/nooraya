import React from 'react';
import { Metadata } from 'next';
import { Handshake, Plane, Building, Shield, Globe, Award, Users, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nos Partenaires - Nooraya Voyages',
  description: 'Découvrez nos partenaires de confiance : compagnies aériennes, hôtels et prestataires sélectionnés.',
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Partenaires
          </h1>
          <p className="text-xl opacity-90">
            Un réseau de partenaires premium pour votre satisfaction
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Nous collaborons avec les meilleures entreprises du secteur pour vous offrir 
            des services de qualité supérieure et des tarifs compétitifs.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center justify-center">
            <Plane className="h-8 w-8 mr-3 text-blue-600" />
            Compagnies aériennes
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Air France</span>
              </div>
              <p className="text-sm text-gray-600">France</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Air Sénégal</span>
              </div>
              <p className="text-sm text-gray-600">Sénégal</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Emirates</span>
              </div>
              <p className="text-sm text-gray-600">Émirats Arabes Unis</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Turkish Airlines</span>
              </div>
              <p className="text-sm text-gray-600">Turquie</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Royal Air Maroc</span>
              </div>
              <p className="text-sm text-gray-600">Maroc</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Qatar Airways</span>
              </div>
              <p className="text-sm text-gray-600">Qatar</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Ethiopian Airlines</span>
              </div>
              <p className="text-sm text-gray-600">Éthiopie</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center mb-3 hover:shadow-md transition-shadow">
                <span className="text-xl font-bold text-gray-700">Brussels Airlines</span>
              </div>
              <p className="text-sm text-gray-600">Belgique</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center justify-center">
            <Building className="h-8 w-8 mr-3 text-green-600" />
            Chaînes hôtelières
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Accor Hotels', 'Hilton', 'Marriott', 'Radisson',
              'Best Western', 'Ibis', 'Novotel', 'Pullman',
              'Sheraton', 'Holiday Inn', 'Mercure', 'Sofitel'
            ].map((hotel, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                <h3 className="font-semibold text-gray-800">{hotel}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-purple-600" />
              Assurances voyage
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold">AXA Travel Insurance</h3>
                <p className="text-gray-600 text-sm">Leader mondial de l&apos;assurance voyage</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold">Allianz Travel</h3>
                <p className="text-gray-600 text-sm">Protection complète pour tous vos voyages</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold">Europ Assistance</h3>
                <p className="text-gray-600 text-sm">Assistance 24h/24 dans le monde entier</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold">Mondial Assistance</h3>
                <p className="text-gray-600 text-sm">Solutions d&apos;assurance sur mesure</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Globe className="h-6 w-6 mr-3 text-orange-600" />
              Services locaux
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold">GetYourGuide</h3>
                <p className="text-gray-600 text-sm">Activités et excursions dans le monde</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold">Viator</h3>
                <p className="text-gray-600 text-sm">Visites guidées et expériences uniques</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold">Hertz</h3>
                <p className="text-gray-600 text-sm">Location de voitures premium</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold">Europcar</h3>
                <p className="text-gray-600 text-sm">Solutions de mobilité flexibles</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Devenir partenaire
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Critères de sélection</h3>
              <p className="text-gray-600 text-sm">
                Qualité de service, fiabilité et engagement client
              </p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Avantages mutuels</h3>
              <p className="text-gray-600 text-sm">
                Visibilité accrue et accès à notre clientèle premium
              </p>
            </div>
            
            <div className="text-center">
              <Handshake className="h-12 w-12 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Partenariat durable</h3>
              <p className="text-gray-600 text-sm">
                Relations long terme basées sur la confiance
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a href="/contact" className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Contactez notre équipe partenariats
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Certifications et labels</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-blue-100 rounded-full p-6 inline-block mb-3">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">IATA</h3>
              <p className="text-sm text-gray-600">Membre accrédité</p>
            </div>
            
            <div>
              <div className="bg-green-100 rounded-full p-6 inline-block mb-3">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">ATOL</h3>
              <p className="text-sm text-gray-600">Protection financière</p>
            </div>
            
            <div>
              <div className="bg-purple-100 rounded-full p-6 inline-block mb-3">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">ISO 9001</h3>
              <p className="text-sm text-gray-600">Qualité certifiée</p>
            </div>
            
            <div>
              <div className="bg-orange-100 rounded-full p-6 inline-block mb-3">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold">APST</h3>
              <p className="text-sm text-gray-600">Garantie voyages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}