'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Plane, 
  Building, 
  Package, 
  Tag, 
  HelpCircle, 
  ChevronDown, 
  Globe, 
  Menu, 
  X,
  LogOut,
  UserCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/features/auth';
import { AuthModal } from '@/components/auth';

const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
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

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => {
                  setAccountDropdownOpen(!accountDropdownOpen);
                  setLanguageDropdownOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 hover:from-blue-100 hover:to-purple-100 rounded-2xl transition-all duration-200 border border-gray-200"
                aria-label="Menu compte utilisateur"
                aria-expanded={accountDropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">
                    {user?.firstName?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="font-medium">{user?.firstName || 'Mon compte'}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {accountDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 py-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200"
                  role="menu"
                  aria-label="Menu compte utilisateur"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <AccountMenuItem icon={UserCircle} label="Mon profil" onClick={() => router.push('/profile')} />
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <AccountMenuItem 
                      icon={LogOut} 
                      label="Se déconnecter" 
                      onClick={async () => {
                        await logout();
                        router.push('/');
                        setAccountDropdownOpen(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/20"
            >
              <Sparkles size={18} />
              <span>Se connecter</span>
            </button>
          )}
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
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 bg-white rounded-2xl border border-gray-200 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold">
                        {user?.firstName?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <MobileActionButton icon={<UserCircle size={18} />} text="Mon profil" onClick={() => { router.push('/profile'); closeAllDropdowns(); }} />
                <MobileActionButton icon={<LogOut size={18} />} text="Se déconnecter" onClick={async () => { await logout(); router.push('/'); closeAllDropdowns(); }} />
              </>
            ) : (
              <button
                onClick={() => { setAuthModalOpen(true); closeAllDropdowns(); }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                <Sparkles size={18} />
                <span>Se connecter</span>
              </button>
            )}
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

      {/* Modal d'authentification */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
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

const AccountMenuItem: React.FC<{ icon: React.ComponentType<{ size?: number; className?: string }>; label: string; onClick?: () => void }> = ({ icon: Icon, label, onClick }) => (
  <button 
    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
    role="menuitem"
    onClick={onClick}
  >
    <Icon size={18} className="mr-3 text-gray-400" aria-hidden="true" />
    {label}
  </button>
);

const MobileActionButton: React.FC<{ icon: React.ReactNode; text: string; onClick?: () => void }> = ({ icon, text, onClick }) => (
  <button 
    className="flex items-center space-x-3 text-gray-700 w-full p-3 rounded-xl hover:bg-white transition-colors"
    role="menuitem"
    onClick={onClick}
  >
    <span aria-hidden="true">{icon}</span>
    <span>{text}</span>
  </button>
);

export default Header;