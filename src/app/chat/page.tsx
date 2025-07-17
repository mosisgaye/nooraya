'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, Clock, Paperclip } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Bonjour ! Je suis votre assistant virtuel Nooraya. Comment puis-je vous aider aujourd\'hui ?',
      time: '09:00'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickResponses = [
    'Réserver un vol',
    'Modifier ma réservation',
    'État de ma commande',
    'Parler à un conseiller'
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputValue,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: 'Je traite votre demande. Un conseiller vous répondra dans quelques instants.',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-green-600 to-cyan-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Chat en direct
          </h1>
          <p className="text-lg opacity-90">
            Assistance instantanée 24h/24 et 7j/7
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 mr-3" />
              <div>
                <h2 className="font-semibold">Assistant Nooraya</h2>
                <p className="text-sm opacity-90">En ligne</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>Temps de réponse : ~1 min</span>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                    {message.type === 'bot' ? (
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Réponses rapides :</p>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(response)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mx-2"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Besoin d&apos;aide supplémentaire ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="font-medium text-gray-800">Téléphone</p>
              <p className="text-green-600">+33 1 23 45 67 89</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-green-600">support@noorayavoyages.com</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800">WhatsApp</p>
              <p className="text-green-600">+33 6 12 34 56 78</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}