export const structuredData = {
  travelAgency: {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Nooraya Voyages",
    "url": "https://www.noorayavoyages.com",
    "logo": "https://www.noorayavoyages.com/logo.png",
    "description": "Agence de voyage spécialisée en vols pas cher, réservation hôtels et séjours tout compris. Spécialiste des voyages vers le Sénégal et l'Afrique de l'Ouest.",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "123 Rue de la Paix",
        "addressLocality": "Paris",
        "addressRegion": "Île-de-France",
        "postalCode": "75001",
        "addressCountry": "FR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Avenue Cheikh Anta Diop",
        "addressLocality": "Dakar",
        "addressRegion": "Dakar",
        "postalCode": "10000",
        "addressCountry": "SN"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+33-1-23-45-67-89",
        "contactType": "customer service",
        "email": "support@noorayavoyages.com",
        "availableLanguage": ["French", "English", "Arabic"],
        "areaServed": "FR"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+221-33-123-45-67",
        "contactType": "customer service",
        "email": "dakar@noorayavoyages.com",
        "availableLanguage": ["French", "Wolof", "English"],
        "areaServed": "SN"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/noorayavoyages",
      "https://www.instagram.com/noorayavoyages",
      "https://www.linkedin.com/company/noorayavoyages",
      "https://twitter.com/noorayavoyages"
    ],
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-17:00",
    "areaServed": ["FR", "SN", "International"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de voyage",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Réservation de vols"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Réservation d'hôtels"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Séjours tout compris"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Voyages organisés Sénégal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Circuits touristiques Sénégal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vols Paris-Dakar"
          }
        }
      ]
    }
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nooraya Voyages",
    "url": "https://www.noorayavoyages.com",
    "description": "Agence de voyage Nooraya Voyages Paris : réservez vos vols pas cher, hôtels discount, séjours tout compris",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.noorayavoyages.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nooraya Voyages",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.noorayavoyages.com/logo.png"
      }
    }
  },

  breadcrumb: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.noorayavoyages.com${item.url}`
    }))
  }),

  flightOffer: (flight: {
    id: string;
    flightNumber: string;
    airline: string;
    airlineCode: string;
    departure: { airport: string; code: string; time: string };
    arrival: { airport: string; code: string; time: string };
    price: number;
  }) => ({
    "@context": "https://schema.org",
    "@type": "FlightReservation",
    "reservationNumber": flight.id,
    "reservationStatus": "https://schema.org/ReservationConfirmed",
    "reservationFor": {
      "@type": "Flight",
      "flightNumber": flight.flightNumber,
      "airline": {
        "@type": "Airline",
        "name": flight.airline,
        "iataCode": flight.airlineCode
      },
      "departureAirport": {
        "@type": "Airport",
        "name": flight.departure.airport,
        "iataCode": flight.departure.code
      },
      "arrivalAirport": {
        "@type": "Airport",
        "name": flight.arrival.airport,
        "iataCode": flight.arrival.code
      },
      "departureTime": flight.departure.time,
      "arrivalTime": flight.arrival.time
    },
    "totalPrice": {
      "@type": "PriceSpecification",
      "price": flight.price,
      "priceCurrency": "EUR"
    }
  }),

  hotelOffer: (hotel: {
    name: string;
    location: string;
    country: string;
    priceRange: string;
    rating: number;
    reviews: number;
    amenities?: string[];
    price: number;
  }) => ({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": hotel.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": hotel.location,
      "addressCountry": hotel.country
    },
    "priceRange": hotel.priceRange,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": hotel.rating,
      "ratingCount": hotel.reviews
    },
    "amenityFeature": hotel.amenities?.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "offers": {
      "@type": "Offer",
      "price": hotel.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  }),

  faq: (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  })
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateStructuredData = (type: keyof typeof structuredData, data?: any) => {
  const schema = typeof structuredData[type] === 'function' 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (structuredData[type] as any)(data) 
    : structuredData[type];
  
  return {
    __html: JSON.stringify(schema)
  };
};