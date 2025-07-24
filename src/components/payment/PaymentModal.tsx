'use client';

import React, { useState } from 'react';
import { X, Smartphone, CreditCard, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    id: string;
    type: 'flight' | 'hotel' | 'package';
    amount: number;
    currency: string;
    description: string;
    details?: {
      flight?: unknown;
      passengers?: unknown[];
    };
  };
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  onSuccess,
  onError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'processing'>('method');
  const [retryCount, setRetryCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const paymentMethods = [
    {
      id: 'orange_money',
      name: 'Orange Money',
      icon: 'https://intech-apiv2.s3.amazonaws.com/icons/om_sn.png',
      description: 'Paiement rapide et sécurisé',
      color: 'bg-orange-50 border-orange-200 hover:border-orange-400'
    },
    {
      id: 'wave',
      name: 'Wave',
      icon: 'https://intech-apiv2.s3.amazonaws.com/icons/wave.png',
      description: 'Simple et instantané',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      icon: 'https://intech-apiv2.s3.amazonaws.com/icons/CB.png',
      description: 'Visa, Mastercard',
      color: 'bg-gray-50 border-gray-200 hover:border-gray-400'
    }
  ];

  const handlePayment = async (isRetry: boolean = false) => {
    if (!selectedMethod || !phoneNumber) {
      onError('Veuillez remplir tous les champs');
      return;
    }

    // Validate phone number format
    if (phoneNumber.length !== 9 || !/^[0-9]+$/.test(phoneNumber)) {
      onError('Le numéro doit contenir exactement 9 chiffres');
      return;
    }

    setIsProcessing(true);
    setStep('processing');
    setStatusMessage('Initialisation du paiement...');

    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingData.id,
          paymentMethod: selectedMethod,
          phone: phoneNumber,
          amount: bookingData.amount,
          bookingType: bookingData.type,
          bookingData: bookingData.details
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du paiement');
      }

      // Show success message
      setStatusMessage('Paiement initié avec succès! Vérifiez votre téléphone.');
      
      // Start polling for payment status
      const checkPaymentStatus = async () => {
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes max
        
        const interval = setInterval(async () => {
          attempts++;
          
          try {
            const statusResponse = await fetch(`/api/payments/status/${data.paymentId}`);
            const statusData = await statusResponse.json();
            
            if (statusData.status === 'success') {
              clearInterval(interval);
              onSuccess(data.paymentId);
              setStep('method');
              onClose();
            } else if (statusData.status === 'failed') {
              clearInterval(interval);
              throw new Error(statusData.error || 'Le paiement a échoué');
            } else if (attempts >= maxAttempts) {
              clearInterval(interval);
              throw new Error('Délai d\'attente dépassé. Vérifiez votre téléphone.');
            }
          } catch (error) {
            clearInterval(interval);
            console.error('Status check error:', error);
            onError(error instanceof Error ? error.message : 'Erreur lors de la vérification');
            setStep('details');
            setIsProcessing(false);
          }
        }, 5000); // Check every 5 seconds
      };
      
      checkPaymentStatus();

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du paiement';
      onError(errorMessage);
      
      // Allow retry for certain errors
      if (retryCount < 3 && !isRetry) {
        setRetryCount(retryCount + 1);
        setStatusMessage(`Erreur: ${errorMessage}. Réessai possible.`);
      }
      
      setStep('details');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Paiement sécurisé</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Amount Summary */}
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Montant à payer</span>
              <span className="text-2xl font-bold text-green-600">
                {bookingData.amount.toLocaleString('fr-FR')} {bookingData.currency}
              </span>
            </div>
            <p className="text-sm text-gray-600">{bookingData.description}</p>
          </div>

          {/* Payment Method Selection */}
          {step === 'method' && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Choisissez votre moyen de paiement</h3>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setStep('details');
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${method.color}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                      <Image
                        src={method.icon}
                        alt={method.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Phone Number Input */}
          {step === 'details' && (
            <div className="space-y-4">
              <button
                onClick={() => setStep('method')}
                className="text-sm text-green-600 hover:text-green-700 mb-2"
              >
                ← Changer de méthode
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    +221
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="77 123 45 67"
                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={9}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Vous recevrez une demande de validation sur ce numéro
                </p>
              </div>

              {retryCount > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
                  Tentative {retryCount}/3. Vérifiez votre solde et réessayez.
                </div>
              )}

              <button
                onClick={() => handlePayment(false)}
                disabled={!phoneNumber || phoneNumber.length < 9 || isProcessing}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {retryCount > 0 ? 'Réessayer le paiement' : 'Procéder au paiement'}
              </button>
            </div>
          )}

          {/* Processing */}
          {step === 'processing' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Paiement en cours...</h3>
              <p className="text-gray-600">
                {statusMessage || 'Veuillez valider le paiement sur votre téléphone'}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Vous recevrez une notification sur le numéro +221 {phoneNumber}
              </p>
              <div className="mt-6 text-xs text-gray-500">
                <p>Cela peut prendre quelques instants...</p>
                <p className="mt-2">Si vous ne recevez pas de notification:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Vérifiez votre connexion internet</li>
                  <li>Assurez-vous que votre numéro est correct</li>
                  <li>Vérifiez votre solde {selectedMethod === 'orange_money' ? 'Orange Money' : selectedMethod === 'wave' ? 'Wave' : ''}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Paiement sécurisé par</span>
            <span className="font-semibold">Intech</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;