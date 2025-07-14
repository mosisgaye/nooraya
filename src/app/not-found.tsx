import Link from 'next/link';
import { Home, Search, HelpCircle, ArrowLeft, Building } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-blue-200">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <Search className="h-12 w-12 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oups ! Page introuvable
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          La page que vous recherchez semble avoir pris des vacances. 
          Elle n&apos;est pas là où nous pensions la trouver.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="mr-2" size={20} />
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Page précédente
          </button>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Peut-être cherchiez-vous...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SuggestionCard
              icon={<Search />}
              title="Rechercher un vol"
              description="Trouvez les meilleurs prix"
              link="/flights"
            />
            <SuggestionCard
              icon={<Building />}
              title="Réserver un hôtel"
              description="Plus de 2M d&apos;hébergements"
              link="/hotels"
            />
            <SuggestionCard
              icon={<HelpCircle />}
              title="Besoin d&apos;aide ?"
              description="Contactez notre support"
              link="/help"
            />
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>💡 Le saviez-vous ?</p>
          <p>L&apos;erreur 404 tire son nom du bureau 404 du CERN où le premier serveur web était situé.</p>
        </div>
      </div>
    </div>
  );
}

interface SuggestionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ icon, title, description, link }) => (
  <Link
    href={link}
    className="group bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-colors"
  >
    <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Link>
);