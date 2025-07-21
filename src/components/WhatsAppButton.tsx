'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '221779867037'; // Sans le +
  const message = 'Bonjour, je suis intéressé par vos offres Umra. Pouvez-vous me donner plus d\'informations ?';

  useEffect(() => {
    // Afficher le tooltip après 5 secondes
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Masquer le tooltip après 10 secondes
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Plus besoin de cette fonction car on utilise des liens directs

  return (
    <>
      {/* Bouton flottant WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 mb-2 animate-in slide-in-from-bottom-2 duration-300 w-64">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              💬 Besoin d\'aide ?
            </p>
            <p className="text-xs text-gray-600">
              Chattez avec nous sur WhatsApp pour une réponse immédiate !
            </p>
            <div className="absolute bottom-[-8px] right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
          </div>
        )}

        {/* Bouton principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      </div>

      {/* Fenêtre de chat WhatsApp */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80 sm:w-96">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Nooraya Voyages</h3>
                    <p className="text-xs opacity-90">En ligne maintenant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Corps du chat */}
            <div className="p-4 bg-gray-50">
              {/* Message de bienvenue */}
              <div className="bg-white rounded-lg p-3 mb-4 shadow-sm">
                <p className="text-sm text-gray-700 mb-2">
                  👋 Assalamu alaikum ! Bienvenue chez Nooraya Voyages.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Comment puis-je vous aider aujourd\'hui ?
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a
                    href="https://wa.me/221779867037?text=Bonjour,%20je%20voudrais%20des%20informations%20sur%20les%20dates%20Umra%202025-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors inline-block"
                  >
                    📅 Dates Umra 2025-2026
                  </a>
                  <a
                    href="https://wa.me/221779867037?text=Bonjour,%20je%20voudrais%20connaître%20les%20tarifs%20des%20packs%20Umra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors inline-block"
                  >
                    💰 Tarifs des packs
                  </a>
                  <a
                    href="https://wa.me/221779867037?text=Bonjour,%20je%20souhaite%20faire%20une%20réservation%20pour%20Umra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors inline-block"
                  >
                    ✈️ Réservation
                  </a>
                </div>
              </div>

              {/* Agents disponibles */}
              <div className="bg-white rounded-lg p-3 mb-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-600 mb-2">Nos agents disponibles :</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">Fatou - Conseillère Umra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">Amadou - Expert voyages</span>
                  </div>
                </div>
              </div>

              {/* Bouton démarrer la conversation */}
              <a
                href="https://wa.me/221779867037?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20offres%20Umra.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 block"
              >
                <MessageCircle size={20} />
                Démarrer la conversation
              </a>

              <p className="text-xs text-gray-500 text-center mt-3">
                Réponse immédiate sur WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}