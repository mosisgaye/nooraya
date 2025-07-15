import { Metadata } from 'next';
import { Package, MapPin, Calendar, Users, Star, Shield, Coffee, Wifi } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Séjours Tout Compris - Nooraya Voyages | Vol + Hôtel',
  description: 'Réservez vos séjours tout compris avec Nooraya Voyages. Profitez de nos packages vol + hôtel aux meilleurs prix avec assurance annulation gratuite.',
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-6">
            <Shield className="mr-2" size={16} />
            Annulation gratuite jusqu&apos;à 24h avant
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Séjours Tout Compris
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Vol + Hôtel + Transferts : tout est inclus pour des vacances sans stress
          </p>
          
          {/* Search Form Quick */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6">
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input
                  type="text"
                  placeholder="Dates"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input
                  type="text"
                  placeholder="2 adultes"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Why Choose Packages */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir un séjour tout compris ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<Package className="h-12 w-12 text-purple-600" />}
            title="Tout est inclus"
            description="Vol, hôtel, transferts et parfois même les repas. Pas de mauvaise surprise !"
          />
          <BenefitCard
            icon={<Shield className="h-12 w-12 text-purple-600" />}
            title="Protection complète"
            description="Assurance annulation et assistance 24/7 incluses dans tous nos packages"
          />
          <BenefitCard
            icon={<Star className="h-12 w-12 text-purple-600" />}
            title="Meilleurs prix garantis"
            description="Économisez jusqu&apos;à 30% en réservant vol et hôtel ensemble"
          />
        </div>
      </div>

      {/* Popular Packages */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos séjours les plus populaires</h2>
          <p className="text-center text-gray-600 mb-12">Sélectionnés par nos experts voyage</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </div>

      {/* Destinations by Theme */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Trouvez votre séjour idéal</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ThemeCard
            title="Plage & Soleil"
            image="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg"
            count={156}
          />
          <ThemeCard
            title="City Break"
            image="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg"
            count={89}
          />
          <ThemeCard
            title="Montagne"
            image="https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg"
            count={45}
          />
          <ThemeCard
            title="Culture"
            image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
            count={67}
          />
          <ThemeCard
            title="Romantique"
            image="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg"
            count={34}
          />
          <ThemeCard
            title="Famille"
            image="https://images.pexels.com/photos/1157398/pexels-photo-1157398.jpeg"
            count={78}
          />
          <ThemeCard
            title="Aventure"
            image="https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg"
            count={52}
          />
          <ThemeCard
            title="Luxe"
            image="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
            count={41}
          />
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <TrustIndicator value="500K+" label="Voyageurs satisfaits" />
            <TrustIndicator value="98%" label="Taux de satisfaction" />
            <TrustIndicator value="24/7" label="Assistance voyage" />
            <TrustIndicator value="100%" label="Paiement sécurisé" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface PackageCardProps {
  package: {
    id: number;
    destination: string;
    country: string;
    image: string;
    duration: string;
    hotel: string;
    stars: number;
    price: number;
    originalPrice: number;
    includes: string[];
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <div className="relative h-48 w-full">
        <Image src={pkg.image} alt={pkg.destination} fill className="object-cover" />
      </div>
      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        -{Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold">{pkg.destination}</h3>
          <p className="text-gray-600">{pkg.country}</p>
        </div>
        <span className="text-sm text-gray-500">{pkg.duration}</span>
      </div>
      
      <div className="flex items-center mb-3">
        <span className="text-sm font-medium">{pkg.hotel}</span>
        <div className="flex items-center ml-2">
          {[...Array(pkg.stars)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {pkg.includes.map((item, index) => (
          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
            {item === 'wifi' && <Wifi size={12} className="inline mr-1" />}
            {item === 'breakfast' && <Coffee size={12} className="inline mr-1" />}
            {item}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-500 line-through text-sm">{pkg.originalPrice}€</span>
          <span className="text-2xl font-bold text-purple-600 ml-2">{pkg.price}€</span>
          <span className="text-sm text-gray-500 block">par personne</span>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Voir l&apos;offre
        </button>
      </div>
    </div>
  </div>
);

interface ThemeCardProps {
  title: string;
  image: string;
  count: number;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ title, image, count }) => (
  <div className="relative group cursor-pointer rounded-lg overflow-hidden">
    <div className="relative h-32 w-full">
      <Image 
        src={image} 
        alt={title} 
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-4">
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-white/80 text-sm">{count} séjours</p>
    </div>
  </div>
);

interface TrustIndicatorProps {
  value: string;
  label: string;
}

const TrustIndicator: React.FC<TrustIndicatorProps> = ({ value, label }) => (
  <div>
    <div className="text-3xl font-bold text-purple-600 mb-2">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const popularPackages = [
  {
    id: 1,
    destination: 'Marrakech',
    country: 'Maroc',
    image: 'https://images.pexels.com/photos/3889891/pexels-photo-3889891.jpeg',
    duration: '7 nuits',
    hotel: 'Riad Luxe',
    stars: 5,
    price: 599,
    originalPrice: 899,
    includes: ['Vol A/R', 'Transferts', 'breakfast', 'wifi']
  },
  {
    id: 2,
    destination: 'Santorini',
    country: 'Grèce',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    duration: '5 nuits',
    hotel: 'Cave Hotel',
    stars: 4,
    price: 789,
    originalPrice: 1099,
    includes: ['Vol A/R', 'Transferts', 'breakfast', 'Piscine']
  },
  {
    id: 3,
    destination: 'Dubai',
    country: 'Émirats',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
    duration: '4 nuits',
    hotel: 'Marina Hotel',
    stars: 5,
    price: 999,
    originalPrice: 1499,
    includes: ['Vol A/R', 'Transferts', 'All inclusive', 'wifi']
  },
  {
    id: 4,
    destination: 'Bali',
    country: 'Indonésie',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    duration: '10 nuits',
    hotel: 'Beach Resort',
    stars: 4,
    price: 1299,
    originalPrice: 1799,
    includes: ['Vol A/R', 'Transferts', 'breakfast', 'Spa']
  },
  {
    id: 5,
    destination: 'Rome',
    country: 'Italie',
    image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
    duration: '3 nuits',
    hotel: 'Centro Storico',
    stars: 4,
    price: 449,
    originalPrice: 649,
    includes: ['Vol A/R', 'Transferts', 'breakfast', 'wifi']
  },
  {
    id: 6,
    destination: 'Maldives',
    country: 'Maldives',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    duration: '7 nuits',
    hotel: 'Water Villa',
    stars: 5,
    price: 1899,
    originalPrice: 2599,
    includes: ['Vol A/R', 'Hydravion', 'All inclusive', 'Spa']
  }
];