import React from 'react';
import { Metadata } from 'next';
import { MessageSquare, Phone, Mail, FileText, Clock, AlertCircle, CheckCircle, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Réclamations - Nooraya Voyages',
  description: 'Service réclamations Nooraya Voyages. Nous traitons vos réclamations avec attention et rapidité.',
};

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Service Réclamations
          </h1>
          <p className="text-xl opacity-90">
            Votre satisfaction est notre priorité
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Nous sommes désolés que votre expérience n&apos;ait pas été à la hauteur de vos attentes. 
              Notre équipe s&apos;engage à traiter votre réclamation dans les meilleurs délais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <Clock className="h-10 w-10 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Réponse rapide</h3>
              <p className="text-sm text-gray-600">Accusé de réception sous 24h</p>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <MessageSquare className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Suivi personnalisé</h3>
              <p className="text-sm text-gray-600">Un conseiller dédié à votre dossier</p>
            </div>
            
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <CheckCircle className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Solution adaptée</h3>
              <p className="text-sm text-gray-600">Résolution sous 15 jours max</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Formulaire de réclamation</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de réservation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: NV123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date du voyage
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de réclamation <span className="text-red-500">*</span>
              </label>
              <select 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Sélectionnez un type</option>
                <option>Retard ou annulation</option>
                <option>Problème de réservation</option>
                <option>Service non conforme</option>
                <option>Problème de remboursement</option>
                <option>Bagages</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                placeholder="Décrivez votre réclamation en détail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pièces jointes
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Glissez vos fichiers ici ou cliquez pour parcourir
                </p>
                <p className="text-xs text-gray-500">
                  PDF, JPG, PNG (max 10MB par fichier)
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Les champs marqués d&apos;un astérisque (*) sont obligatoires. 
                  Plus votre réclamation est détaillée, plus nous pourrons la traiter efficacement.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="consent"
                className="mr-2"
                required
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                J&apos;accepte que mes données soient traitées dans le cadre de ma réclamation
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Send className="h-5 w-5 mr-2" />
                Envoyer ma réclamation
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Autres moyens de nous contacter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-red-600" />
                Par courrier
              </h3>
              <p className="text-gray-700">
                Nooraya Voyages<br />
                Service Réclamations<br />
                123 Avenue des Voyages<br />
                75001 Paris
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Recommandé avec AR conseillé
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-600" />
                Par téléphone
              </h3>
              <p className="text-gray-700">
                Service Réclamations<br />
                <span className="text-xl font-bold">+33 1 23 45 67 91</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Lun-Ven : 9h-18h<br />
                Sam : 9h-12h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Engagement qualité</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-semibold">Accusé de réception sous 24h</h3>
                <p className="text-gray-600 text-sm">
                  Confirmation de la prise en compte de votre réclamation
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-semibold">Réponse détaillée sous 15 jours</h3>
                <p className="text-gray-600 text-sm">
                  Analyse complète et proposition de solution
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-semibold">Suivi jusqu&apos;à résolution</h3>
                <p className="text-gray-600 text-sm">
                  Accompagnement personnalisé jusqu&apos;à votre satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}