'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Plane, 
  Building, 
  Package, 
  Tag, 
  HelpCircle, 
  User, 
  ChevronDown, 
  Globe, 
  Menu, 
  X,
  Bell,
  Heart,
  Settings
} from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAllDropdowns = () => {
    setLanguageDropdownOpen(false);
    setAccountDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Gestion des touches du clavier pour l'accessibilité
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      role="banner"
      onKeyDown={handleKeyDown}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 lg:h-20" role="navigation" aria-label="Navigation principale">
        {/* Logo simplifié */}
        <Link href="/" className="flex items-center group" aria-label="Nooraya - Accueil">
          <Plane className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600 transform -rotate-45 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110" />
          <div className="ml-3">
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Nooraya
            </span>
            <span className="block text-xs text-gray-500 font-light tracking-wider uppercase">
              Voyages Élégants
            </span>
          </div>
        </Link>

        {/* Navigation desktop simplifiée */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavLink 
            href="/flights" 
            icon={<Plane size={18} />} 
            label="Vols" 
            isActive={isActive('/flights') || isActive('/flight-results')} 
          />
          <NavLink 
            href="/hotels" 
            icon={<Building size={18} />} 
            label="Hôtels" 
            isActive={isActive('/hotels') || isActive('/hotel-results')} 
          />
          <NavLink 
            href="/packages" 
            icon={<Package size={18} />} 
            label="Séjours" 
            isActive={isActive('/packages')} 
          />
          <NavLink 
            href="/offers" 
            icon={<Tag size={18} />} 
            label="Offres" 
            isActive={isActive('/offers')} 
            badge="Nouveau"
          />
          <NavLink 
            href="/help" 
            icon={<HelpCircle size={18} />} 
            label="Aide" 
            isActive={isActive('/help')} 
          />
        </nav>

        {/* Contrôles utilisateur simplifiés */}
        <div className="hidden lg:flex items-center space-x-3">
          <button 
            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            aria-label="Notifications (1 nouveau)"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" aria-hidden="true"></span>
          </button>

          <button 
            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
            aria-label="Mes favoris"
          >
            <Heart size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setLanguageDropdownOpen(!languageDropdownOpen);
                setAccountDropdownOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
              aria-label="Sélectionner la langue"
              aria-expanded={languageDropdownOpen}
              aria-haspopup="true"
            >
              <Globe size={18} />
              <span className="font-medium">FR</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {languageDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200"
                role="menu"
                aria-label="Sélection de langue"
              >
                <LanguageOption flag="🇫🇷" language="Français" isActive />
                <LanguageOption flag="🇬🇧" language="English" />
                <LanguageOption flag="🇪🇸" language="Español" />
                <LanguageOption flag="🇩🇪" language="Deutsch" />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setAccountDropdownOpen(!accountDropdownOpen);
                setLanguageDropdownOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
              aria-label="Menu compte utilisateur"
              aria-expanded={accountDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <User size={16} className="text-white" />
              </div>
              <span className="font-medium">Compte</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {accountDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200"
                role="menu"
                aria-label="Menu compte utilisateur"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Bienvenue !</p>
                  <p className="text-xs text-gray-500">Connectez-vous pour accéder à vos réservations</p>
                </div>
                <AccountMenuItem icon={<User size={16} />} text="Se connecter" />
                <AccountMenuItem icon={<User size={16} />} text="Créer un compte" />
                <div className="border-t border-gray-100 my-1"></div>
                <AccountMenuItem icon={<Package size={16} />} text="Mes réservations" />
                <AccountMenuItem icon={<Heart size={16} />} text="Mes favoris" />
                <AccountMenuItem icon={<Bell size={16} />} text="Mes alertes" />
                <AccountMenuItem icon={<Settings size={16} />} text="Paramètres" />
              </div>
            )}
          </div>
        </div>

        {/* Bouton menu mobile simplifié */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu mobile simplifié */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-300"
          role="menu"
          aria-label="Menu mobile"
        >
          <div className="px-4 pt-4 pb-3 space-y-2">
            <MobileNavLink 
              href="/flights" 
              icon={<Plane size={18} />} 
              label="Vols" 
              isActive={isActive('/flights')} 
              onClick={closeAllDropdowns}
            />
            <MobileNavLink 
              href="/hotels" 
              icon={<Building size={18} />} 
              label="Hôtels" 
              isActive={isActive('/hotels')} 
              onClick={closeAllDropdowns}
            />
            <MobileNavLink 
              href="/packages" 
              icon={<Package size={18} />} 
              label="Séjours" 
              isActive={isActive('/packages')} 
              onClick={closeAllDropdowns}
            />
            <MobileNavLink 
              href="/offers" 
              icon={<Tag size={18} />} 
              label="Offres" 
              isActive={isActive('/offers')} 
              onClick={closeAllDropdowns}
              badge="Nouveau"
            />
            <MobileNavLink 
              href="/help" 
              icon={<HelpCircle size={18} />} 
              label="Aide" 
              isActive={isActive('/help')} 
              onClick={closeAllDropdowns}
            />
          </div>
          
          <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 space-y-3">
            <MobileActionButton icon={<Globe size={18} />} text="Changer la langue" />
            <MobileActionButton icon={<User size={18} />} text="Se connecter" />
            <MobileActionButton icon={<Bell size={18} />} text="Notifications" />
            <MobileActionButton icon={<Heart size={18} />} text="Favoris" />
          </div>
        </div>
      )}

      {/* Overlay pour les dropdowns */}
      {(languageDropdownOpen || accountDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" 
          onClick={closeAllDropdowns}
          aria-label="Fermer les menus"
        ></div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label, isActive, badge }) => {
  return (
    <Link
      href={href}
      className={`relative flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
        isActive
          ? 'text-blue-600 bg-blue-50 shadow-sm'
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
      {badge && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
          {badge}
        </span>
      )}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, icon, label, isActive, onClick, badge }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
        isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
      {badge && (
        <span className="ml-auto bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          {badge}
        </span>
      )}
    </Link>
  );
};

const LanguageOption: React.FC<{ flag: string; language: string; isActive?: boolean }> = ({ 
  flag, language, isActive 
}) => (
  <button 
    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center transition-colors ${
      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
    }`}
    role="menuitem"
    aria-current={isActive ? 'true' : 'false'}
  >
    <span className="mr-3 text-lg" aria-hidden="true">{flag}</span> 
    {language}
    {isActive && <span className="ml-auto text-blue-600" aria-hidden="true">✓</span>}
  </button>
);

const AccountMenuItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <button 
    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
    role="menuitem"
  >
    <span className="mr-3 text-gray-400" aria-hidden="true">{icon}</span>
    {text}
  </button>
);

const MobileActionButton: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <button 
    className="flex items-center space-x-3 text-gray-700 w-full p-3 rounded-xl hover:bg-white transition-colors"
    role="menuitem"
  >
    <span aria-hidden="true">{icon}</span>
    <span>{text}</span>
  </button>
);

export default Header;