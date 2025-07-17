import React from 'react';
import { Metadata } from 'next';
import { Briefcase, MapPin, Clock, TrendingUp, Heart, Users, Rocket, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Carrières - Rejoignez Nooraya Voyages',
  description: 'Découvrez les opportunités de carrière chez Nooraya Voyages et rejoignez une équipe passionnée.',
};

export default function CareersPage() {
  const jobOpenings = [
    {
      title: 'Conseiller(ère) Voyage Senior',
      location: 'Paris, France',
      type: 'CDI - Temps plein',
      department: 'Ventes',
      description: 'Nous recherchons un(e) conseiller(ère) voyage expérimenté(e) pour rejoindre notre équipe commerciale.',
      requirements: [
        '3+ ans d\'expérience en agence de voyage',
        'Maîtrise des GDS (Amadeus, Sabre)',
        'Excellent relationnel client',
        'Anglais courant'
      ]
    },
    {
      title: 'Développeur Full Stack',
      location: 'Paris, France',
      type: 'CDI - Temps plein',
      department: 'Tech',
      description: 'Participez au développement de notre plateforme de réservation nouvelle génération.',
      requirements: [
        'Expérience React/Next.js et Node.js',
        'Connaissance des APIs REST',
        'Pratique des méthodes agiles',
        'Passion pour le voyage'
      ]
    },
    {
      title: 'Responsable Marketing Digital',
      location: 'Paris, France',
      type: 'CDI - Temps plein',
      department: 'Marketing',
      description: 'Pilotez notre stratégie digitale et développez notre présence en ligne.',
      requirements: [
        '5+ ans en marketing digital',
        'Expertise SEO/SEA',
        'Gestion des réseaux sociaux',
        'Data-driven mindset'
      ]
    },
    {
      title: 'Agent de Réservation',
      location: 'Dakar, Sénégal',
      type: 'CDI - Temps plein',
      department: 'Opérations',
      description: 'Gérez les réservations et assistez nos clients dans leurs projets de voyage.',
      requirements: [
        'Expérience en réservation touristique',
        'Français et anglais courants',
        'Sens du service client',
        'Disponibilité horaires flexibles'
      ]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Santé & Bien-être',
      description: 'Mutuelle premium, télétravail flexible, salle de sport'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Évolution',
      description: 'Plans de carrière personnalisés et formations continues'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Équipe',
      description: 'Ambiance internationale et événements team building'
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: 'Avantages',
      description: 'Réductions voyages, tickets restaurant, prime annuelle'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rejoignez l&apos;aventure Nooraya
          </h1>
          <p className="text-xl opacity-90">
            Construisons ensemble le futur du voyage
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi nous rejoindre ?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Chez Nooraya Voyages, nous croyons que nos employés sont notre plus grande richesse. 
            Rejoignez une équipe passionnée qui réinvente l&apos;expérience du voyage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-purple-600 mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Briefcase className="h-6 w-6 mr-3 text-purple-600" />
            Postes ouverts
          </h2>
          
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.department}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{job.description}</p>
                    <div>
                      <p className="font-medium text-sm mb-2">Compétences requises :</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Postuler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos valeurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
                <Rocket className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Nous repoussons les limites pour créer des expériences uniques
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
                <Heart className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                Le voyage est notre passion, votre satisfaction notre mission
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                Ensemble, nous allons plus loin et réalisons l&apos;impossible
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Processus de recrutement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-purple-600">
                1
              </div>
              <h3 className="font-semibold mb-2">Candidature</h3>
              <p className="text-sm text-gray-600">
                Envoyez votre CV et lettre de motivation
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-purple-600">
                2
              </div>
              <h3 className="font-semibold mb-2">Présélection</h3>
              <p className="text-sm text-gray-600">
                Entretien téléphonique de 30 minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-purple-600">
                3
              </div>
              <h3 className="font-semibold mb-2">Entretien</h3>
              <p className="text-sm text-gray-600">
                Rencontre avec l&apos;équipe et cas pratique
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-purple-600">
                4
              </div>
              <h3 className="font-semibold mb-2">Décision</h3>
              <p className="text-sm text-gray-600">
                Réponse sous 5 jours ouvrés
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Candidature spontanée</h2>
          
          <p className="text-gray-700 mb-6">
            Vous ne trouvez pas le poste de vos rêves ? Envoyez-nous votre candidature spontanée !
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste recherché
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Parlez-nous de vous et de vos motivations..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CV et lettre de motivation
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  Glissez vos fichiers ici ou cliquez pour parcourir
                </p>
                <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx" />
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Envoyer ma candidature
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Restons en contact
          </h2>
          <p className="mb-6">
            Suivez-nous sur LinkedIn pour ne manquer aucune opportunité
          </p>
          <a
            href="#"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Suivre Nooraya Voyages
          </a>
        </div>
      </div>
    </div>
  );
}