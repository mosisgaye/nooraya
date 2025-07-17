import React from 'react';
import { Metadata } from 'next';
import { Book, Shield, Clock, Compass, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides de voyage - Nooraya Voyages',
  description: 'Guides pratiques et conseils pour préparer votre voyage en toute sérénité.',
};

export default function GuidesPage() {
  const guides = [
    {
      icon: <Book className="h-8 w-8" />,
      title: 'Guide du voyageur',
      description: 'Tout ce qu\'il faut savoir avant de partir en voyage',
      link: '/guides/voyageur',
      color: 'blue'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Procédures d\'enregistrement',
      description: 'Check-in en ligne et procédures à l\'aéroport',
      link: '/guides/checkin',
      color: 'green'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Voyager en sécurité',
      description: 'Conseils santé et sécurité pour vos déplacements',
      link: '/guides/securite',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guides de voyage
          </h1>
          <p className="text-xl opacity-90">
            Nos conseils d&apos;experts pour des voyages réussis
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {guides.map((guide, index) => (
            <Link key={index} href={guide.link} className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className={`bg-gradient-to-r from-${guide.color}-500 to-${guide.color}-600 p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {guide.icon}
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{guide.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Compass className="h-6 w-6 mr-3 text-orange-600" />
            Destinations populaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Paris, France</h3>
              <p className="text-sm text-gray-600 mb-3">
                La ville lumière : art, culture et gastronomie
              </p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Découvrir le guide →
              </Link>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Dakar, Sénégal</h3>
              <p className="text-sm text-gray-600 mb-3">
                Porte d&apos;entrée de l&apos;Afrique de l&apos;Ouest
              </p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Découvrir le guide →
              </Link>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">New York, USA</h3>
              <p className="text-sm text-gray-600 mb-3">
                La ville qui ne dort jamais
              </p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Découvrir le guide →
              </Link>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Tokyo, Japon</h3>
              <p className="text-sm text-gray-600 mb-3">
                Tradition et modernité en harmonie
              </p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Découvrir le guide →
              </Link>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Dubaï, EAU</h3>
              <p className="text-sm text-gray-600 mb-3">
                Luxe et démesure au Moyen-Orient
              </p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Découvrir le guide →
              </Link>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Rome, Italie</h3>
              <p className="text-sm text-gray-600 mb-3">
                Berceau de la civilisation occidentale
              </p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Découvrir le guide →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="h-6 w-6 mr-3 text-blue-600" />
            Ressources utiles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Documents de voyage</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <Link href="#" className="hover:text-blue-600">Liste des visas par pays</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <Link href="#" className="hover:text-blue-600">Validité du passeport</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <Link href="#" className="hover:text-blue-600">Formulaires douaniers</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Informations pratiques</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <Link href="#" className="hover:text-blue-600">Convertisseur de devises</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <Link href="#" className="hover:text-blue-600">Fuseaux horaires</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <Link href="#" className="hover:text-blue-600">Météo mondiale</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}