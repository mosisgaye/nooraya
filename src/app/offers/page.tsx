import { Metadata } from 'next';
import SpecialOffers from '@/components/content/SpecialOffers';
import { Tag, Clock, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Offres Spéciales - Nooraya Voyages | Économisez jusqu\'à 70%',
  description: 'Découvrez nos offres exclusives et promotions sur les vols, hôtels et séjours. Économisez jusqu\'à 70% sur votre prochaine réservation.',
};

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-6">
            <Clock className="mr-2" size={16} />
            Offres limitées dans le temps
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Offres Spéciales & Promotions
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Économisez jusqu&apos;à 70% sur vos prochaines vacances
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <StatCard icon={<Tag />} value="500+" label="Offres actives" />
            <StatCard icon={<TrendingUp />} value="70%" label="Économies max" />
            <StatCard icon={<Star />} value="4.8/5" label="Satisfaction client" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-wrap gap-4">
            <FilterButton active>Toutes les offres</FilterButton>
            <FilterButton>Vols</FilterButton>
            <FilterButton>Hôtels</FilterButton>
            <FilterButton>Séjours complets</FilterButton>
            <FilterButton>Dernière minute</FilterButton>
            <FilterButton>Early booking</FilterButton>
          </div>
        </div>
      </div>

      {/* Special Offers Component */}
      <div className="max-w-7xl mx-auto px-4">
        <SpecialOffers />
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Offres par catégorie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CategoryCard
            title="Escapades romantiques"
            description="Séjours en amoureux dans les plus belles destinations"
            image="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg"
            count={45}
            discount={30}
          />
          <CategoryCard
            title="Vacances en famille"
            description="Des séjours adaptés pour toute la famille"
            image="https://images.pexels.com/photos/1157398/pexels-photo-1157398.jpeg"
            count={78}
            discount={25}
          />
          <CategoryCard
            title="City breaks"
            description="Courts séjours dans les plus belles villes d&apos;Europe"
            image="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg"
            count={92}
            discount={40}
          />
          <CategoryCard
            title="Plages paradisiaques"
            description="Détente sur les plus belles plages du monde"
            image="https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg"
            count={63}
            discount={35}
          />
          <CategoryCard
            title="Aventure & Nature"
            description="Pour les amateurs de sensations fortes"
            image="https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg"
            count={34}
            discount={20}
          />
          <CategoryCard
            title="Luxe & Bien-être"
            description="Séjours haut de gamme avec spa et soins"
            image="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
            count={28}
            discount={45}
          />
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ne manquez aucune offre exclusive
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Inscrivez-vous à notre newsletter et recevez les meilleures offres en avant-première
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="bg-white/10 backdrop-blur rounded-lg px-6 py-4 flex items-center space-x-4">
    <div className="text-white/80">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  </div>
);

interface FilterButtonProps {
  children: React.ReactNode;
  active?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ children, active = false }) => (
  <button className={`px-6 py-2 rounded-full font-medium transition-colors ${
    active 
      ? 'bg-orange-500 text-white' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }`}>
    {children}
  </button>
);

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  count: number;
  discount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, count, discount }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        -{discount}%
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{count} offres disponibles</span>
        <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
          Voir les offres →
        </button>
      </div>
    </div>
  </div>
);