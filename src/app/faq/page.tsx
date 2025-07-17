import React from 'react';
import { Metadata } from 'next';
import { HelpCircle, Search, Plane, CreditCard, Calendar, Globe, Shield, Users } from 'lucide-react';
import FAQItem from '@/components/content/FAQItem';

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes - Nooraya Voyages',
  description: 'Trouvez rapidement des réponses à vos questions sur nos services de voyage.',
};

export default function FAQPage() {
  const faqCategories = [
    {
      title: 'Réservation et paiement',
      icon: <CreditCard className="h-6 w-6" />,
      questions: [
        {
          question: "Comment puis-je réserver un vol ou un hôtel ?",
          answer: "Vous pouvez réserver directement sur notre site en utilisant notre moteur de recherche. Sélectionnez vos dates, destination et préférences, puis suivez les étapes de réservation. Vous pouvez également nous contacter par téléphone pour une assistance personnalisée."
        },
        {
          question: "Quels sont les moyens de paiement acceptés ?",
          answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, et les virements bancaires pour certaines réservations. Tous les paiements sont sécurisés avec un cryptage SSL."
        },
        {
          question: "Puis-je payer en plusieurs fois ?",
          answer: "Oui, nous proposons le paiement en 3 ou 4 fois sans frais pour les réservations supérieures à 300€. Cette option est disponible lors du processus de paiement."
        },
        {
          question: "Comment obtenir une facture ?",
          answer: "Votre facture est automatiquement envoyée par email après le paiement. Vous pouvez également la télécharger depuis votre espace client dans la section &apos;Mes réservations&apos;."
        }
      ]
    },
    {
      title: 'Modification et annulation',
      icon: <Calendar className="h-6 w-6" />,
      questions: [
        {
          question: "Comment annuler ma réservation ?",
          answer: "Connectez-vous à votre espace client et accédez à &apos;Mes réservations&apos;. Cliquez sur la réservation concernée puis sur 'Annuler'. Les frais d&apos;annulation dépendent du type de réservation et du délai avant le départ."
        },
        {
          question: "Quels sont les frais d&apos;annulation ?",
          answer: "Les frais varient selon le délai : plus de 60 jours (150€), 60-31 jours (25%), 30-21 jours (50%), 20-8 jours (75%), moins de 8 jours (100%). Consultez nos conditions générales pour plus de détails."
        },
        {
          question: "Puis-je modifier ma réservation ?",
          answer: "Oui, les modifications sont possibles selon les conditions tarifaires. Connectez-vous à votre espace client ou contactez notre service client. Des frais peuvent s&apos;appliquer."
        },
        {
          question: "Que se passe-t-il si mon vol est annulé par la compagnie ?",
          answer: "Nous vous proposons un vol alternatif ou un remboursement intégral. Notre équipe vous contacte immédiatement pour trouver la meilleure solution."
        }
      ]
    },
    {
      title: 'Vols et transport',
      icon: <Plane className="h-6 w-6" />,
      questions: [
        {
          question: "Comment faire mon check-in en ligne ?",
          answer: "Le check-in en ligne ouvre généralement 24-48h avant le départ. Vous recevrez un email avec le lien direct. Vous pouvez aussi le faire depuis l&apos;application de la compagnie aérienne."
        },
        {
          question: "Quelle est la franchise bagage ?",
          answer: "La franchise dépend de la compagnie et du type de billet. En général : bagage cabine 7-10kg, bagage en soute 20-23kg en classe économique. Vérifiez les détails dans votre confirmation de réservation."
        },
        {
          question: "Comment ajouter des bagages supplémentaires ?",
          answer: "Connectez-vous à votre espace client ou contactez-nous. Il est plus économique d&apos;ajouter des bagages avant le départ qu&apos;à l&apos;aéroport."
        },
        {
          question: "Puis-je choisir mon siège ?",
          answer: "Oui, lors du check-in en ligne ou moyennant un supplément pour certains sièges (sortie de secours, avant de l&apos;avion). Les options varient selon la compagnie."
        }
      ]
    },
    {
      title: 'Documents de voyage',
      icon: <Globe className="h-6 w-6" />,
      questions: [
        {
          question: "Quels documents sont nécessaires pour voyager ?",
          answer: "Pour les vols internationaux : passeport valide (6 mois minimum après le retour), visa si requis, billets d&apos;avion, assurance voyage. Pour l&apos;Europe : carte d&apos;identité ou passeport."
        },
        {
          question: "Comment obtenir un visa ?",
          answer: "Nous pouvons vous assister dans vos démarches de visa. Les délais varient de 2 semaines à 2 mois selon les pays. Contactez-nous pour un accompagnement personnalisé."
        },
        {
          question: "Mon passeport expire bientôt, est-ce un problème ?",
          answer: "La plupart des pays exigent une validité de 6 mois après la date de retour. Vérifiez les exigences spécifiques de votre destination et renouvelez votre passeport si nécessaire."
        },
        {
          question: "Ai-je besoin de vaccinations ?",
          answer: "Cela dépend de votre destination. Certains pays exigent des vaccinations spécifiques (fièvre jaune, par exemple). Consultez votre médecin 4-6 semaines avant le départ."
        }
      ]
    },
    {
      title: 'Assurance et sécurité',
      icon: <Shield className="h-6 w-6" />,
      questions: [
        {
          question: "L&apos;assurance voyage est-elle obligatoire ?",
          answer: "Elle n&apos;est pas obligatoire mais fortement recommandée. Elle couvre l&apos;annulation, les frais médicaux, le rapatriement et la perte de bagages. Certains pays l&apos;exigent (comme Cuba)."
        },
        {
          question: "Que couvre l&apos;assurance annulation ?",
          answer: "Elle rembourse vos frais en cas d&apos;annulation pour raison valable : maladie, accident, décès d&apos;un proche, licenciement, etc. Les conditions exactes dépendent du contrat choisi."
        },
        {
          question: "Comment déclarer un sinistre ?",
          answer: "Contactez immédiatement l&apos;assureur (numéro dans votre contrat). Conservez tous les justificatifs. Nous pouvons vous assister dans vos démarches."
        },
        {
          question: "Mes données sont-elles sécurisées ?",
          answer: "Oui, nous utilisons un cryptage SSL 256 bits pour toutes les transactions. Vos données sont stockées sur des serveurs sécurisés et nous respectons le RGPD."
        }
      ]
    },
    {
      title: 'Services et assistance',
      icon: <Users className="h-6 w-6" />,
      questions: [
        {
          question: "Proposez-vous une assistance 24h/24 ?",
          answer: "Oui, notre service d&apos;urgence est disponible 24h/24 et 7j/7 pour nos clients en voyage. Utilisez le numéro d&apos;urgence fourni dans vos documents de voyage."
        },
        {
          question: "Comment vous contacter en cas d&apos;urgence ?",
          answer: "Numéro d&apos;urgence : +33 1 23 45 67 89 (24h/24). WhatsApp : +33 6 12 34 56 78. Email urgence : urgence@noorayavoyages.com"
        },
        {
          question: "Proposez-vous des transferts aéroport ?",
          answer: "Oui, nous proposons des transferts privés et partagés dans la plupart des destinations. Réservez en même temps que votre vol pour bénéficier de tarifs préférentiels."
        },
        {
          question: "Puis-je réserver des activités sur place ?",
          answer: "Oui, nous proposons une large sélection d&apos;excursions et activités. Réservez à l&apos;avance pour garantir la disponibilité et bénéficier des meilleurs prix."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <HelpCircle className="h-10 w-10 mr-3" />
            Questions fréquentes
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Trouvez rapidement des réponses à vos questions
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une question..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {faqCategories.map((category, index) => (
            <a
              key={index}
              href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-3 text-purple-600">
                {category.icon}
                <h3 className="ml-3 font-semibold text-gray-900">{category.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {category.questions.length} questions
              </p>
            </a>
          ))}
        </div>

        {faqCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            id={category.title.toLowerCase().replace(/\s+/g, '-')}
            className="mb-12"
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-purple-600 mr-3">{category.icon}</span>
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <FAQItem
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-gray-700 mb-6">
            Notre équipe est là pour vous aider
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/chat"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Chat en direct
            </a>
            <a
              href="/help"
              className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Centre d&apos;aide complet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}