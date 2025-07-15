import { generateStructuredData } from '@/lib/seo';

export const metadata = {
  title: 'Voyage Sénégal - Agence Nooraya Voyages | Vols Paris-Dakar, Séjours Saly, Circuits',
  description: 'Découvrez le Sénégal avec Nooraya Voyages : vols Paris-Dakar, séjours balnéaires à Saly, circuits touristiques, voyage Casamance. Spécialiste du tourisme sénégalais depuis Paris.',
  keywords: 'voyage Sénégal, agence voyage Sénégal, vols Paris Dakar, séjour Saly, voyage Casamance, circuit touristique Sénégal, Saint-Louis Sénégal, voyage Thiès, hôtel Sénégal, Air Sénégal, voyage organisé Sénégal, culture sénégalaise, Nooraya Voyages, agence voyage Dakar, séjour balnéaire Sénégal, Cap Skirring, Sine Saloum, Joal Fadiouth',
  openGraph: {
    title: 'Voyage Sénégal - Nooraya Voyages | Spécialiste Vols Paris-Dakar',
    description: 'Découvrez le Sénégal avec Nooraya Voyages : vols Paris-Dakar, séjours balnéaires à Saly, circuits touristiques, voyage Casamance.',
    images: ['/og-senegal.jpg'],
    url: '/senegal',
  },
  twitter: {
    title: 'Voyage Sénégal - Nooraya Voyages | Vols Paris-Dakar',
    description: 'Découvrez le Sénégal avec Nooraya Voyages : vols Paris-Dakar, séjours balnéaires à Saly, circuits touristiques.',
  },
  alternates: {
    canonical: 'https://www.noorayavoyages.com/senegal',
  },
};

const senegalFAQs = [
  {
    question: "Quand partir au Sénégal ?",
    answer: "La meilleure période pour visiter le Sénégal est de novembre à mai, pendant la saison sèche. Les températures sont agréables et les précipitations rares."
  },
  {
    question: "Faut-il un visa pour le Sénégal ?",
    answer: "Les ressortissants français n&apos;ont pas besoin de visa pour un séjour touristique de moins de 90 jours au Sénégal. Un passeport valide suffit."
  },
  {
    question: "Quelle est la durée de vol Paris-Dakar ?",
    answer: "Un vol direct Paris-Dakar dure environ 5h30. Nooraya Voyages propose des vols directs avec Air Sénégal et d'autres compagnies."
  },
  {
    question: "Que visiter au Sénégal ?",
    answer: "Les incontournables : Dakar et ses marchés, l'île de Gorée, Saint-Louis, le parc national du Niokolo-Koba, la Casamance, les plages de Saly et Cap Skirring."
  }
];

export default function SenegalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('faq', senegalFAQs)}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Découvrez le <span className="text-yellow-400">Sénégal</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Spécialiste des voyages vers le Sénégal depuis Paris
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-colors">
                  Vols Paris-Dakar
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors">
                  Séjours Saly
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Nos Services pour le Sénégal
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Vols Paris-Dakar</h3>
                <p className="text-gray-600">Vols directs et avec escales vers Dakar au meilleur prix. Partenaire officiel Air Sénégal.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V9a5 5 0 0110 0v8m0 0v4m0-4H3m18 0v4m0-4V9a5 5 0 00-10 0v8m0 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Séjours Balnéaires</h3>
                <p className="text-gray-600">Séjours tout compris à Saly, Cap Skirring et Mbour. Hôtels de qualité face à l&apos;océan.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Circuits Culturels</h3>
                <p className="text-gray-600">Découvrez la richesse culturelle du Sénégal : Saint-Louis, Casamance, Sine Saloum.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Destinations Populaires au Sénégal
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Dakar', description: 'Capitale dynamique', image: '/dakar.jpg' },
                { name: 'Saly', description: 'Station balnéaire', image: '/saly.jpg' },
                { name: 'Saint-Louis', description: 'Ville historique', image: '/saint-louis.jpg' },
                { name: 'Casamance', description: 'Nature préservée', image: '/casamance.jpg' },
              ].map((destination, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-teal-400"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
                    <p className="text-gray-600 text-sm">{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Questions Fréquentes - Voyage Sénégal
            </h2>
            <div className="max-w-3xl mx-auto">
              {senegalFAQs.map((faq, index) => (
                <div key={index} className="mb-6 bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à découvrir le Sénégal ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contactez nos experts pour organiser votre voyage sur mesure au Sénégal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-colors">
                Demander un devis
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}