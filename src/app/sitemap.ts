import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.noorayavoyages.com';
  const currentDate = new Date();

  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/flights`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Pages légales
  const legalPages = [
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Pages de support
  const supportPages = [
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cancellation`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refunds`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Destinations populaires (exemples)
  const popularDestinations = [
    'paris',
    'londres',
    'rome',
    'barcelone',
    'amsterdam',
    'berlin',
    'madrid',
    'lisbonne',
    'new-york',
    'dubai',
    'tokyo',
    'bangkok',
    'istanbul',
    'marrakech',
    'tunis',
    'casablanca',
    'alger',
    'cairo',
    'doha',
    'abu-dhabi',
    // Destinations Sénégal
    'dakar',
    'saly',
    'saint-louis',
    'thies',
    'ziguinchor',
    'casamance',
    'sine-saloum',
    'joal-fadiouth',
    'touba',
    'kaolack',
    'tambacounda',
    'kedougou',
    'cap-skiring',
    'mbour',
    'rufisque',
  ];

  const destinationPages = popularDestinations.flatMap(destination => [
    {
      url: `${baseUrl}/flights/to/${destination}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hotels/${destination}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/packages/${destination}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]);

  // Routes de recherche populaires
  const popularRoutes = [
    { from: 'paris', to: 'londres' },
    { from: 'paris', to: 'new-york' },
    { from: 'paris', to: 'rome' },
    { from: 'paris', to: 'barcelone' },
    { from: 'paris', to: 'berlin' },
    { from: 'paris', to: 'dubai' },
    { from: 'paris', to: 'tokyo' },
    { from: 'paris', to: 'marrakech' },
    { from: 'paris', to: 'tunis' },
    { from: 'paris', to: 'casablanca' },
    { from: 'lyon', to: 'paris' },
    { from: 'marseille', to: 'paris' },
    { from: 'nice', to: 'paris' },
    { from: 'toulouse', to: 'paris' },
    { from: 'bordeaux', to: 'paris' },
    // Routes Sénégal populaires
    { from: 'paris', to: 'dakar' },
    { from: 'dakar', to: 'paris' },
    { from: 'lyon', to: 'dakar' },
    { from: 'marseille', to: 'dakar' },
    { from: 'nice', to: 'dakar' },
    { from: 'toulouse', to: 'dakar' },
    { from: 'bordeaux', to: 'dakar' },
    { from: 'bruxelles', to: 'dakar' },
    { from: 'geneve', to: 'dakar' },
    { from: 'dakar', to: 'saly' },
    { from: 'dakar', to: 'saint-louis' },
    { from: 'dakar', to: 'ziguinchor' },
    { from: 'dakar', to: 'casamance' },
    { from: 'dakar', to: 'thies' },
    { from: 'dakar', to: 'mbour' },
    { from: 'dakar', to: 'cap-skiring' },
  ];

  const routePages = popularRoutes.map(route => ({
    url: `${baseUrl}/flights/from/${route.from}/to/${route.to}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Guides de voyage
  const guidePages = [
    {
      url: `${baseUrl}/guides/voyageur`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/checkin`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/securite`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/bagages`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/visa`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/assurance-voyage`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/voyage-affaires`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides/voyage-famille`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Pages saisonnières
  const seasonalPages = [
    {
      url: `${baseUrl}/offres/ete`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offres/hiver`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offres/printemps`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offres/automne`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offres/vacances-scolaires`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offres/derniere-minute`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    // Pages spécifiques Sénégal
    {
      url: `${baseUrl}/senegal`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/senegal/voyage-organise`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/senegal/circuit-touristique`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/senegal/sejour-balnéaire`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/senegal/culture-tradition`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vols-air-senegal`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide-voyage-senegal`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Combiner toutes les pages
  return [
    ...staticPages,
    ...legalPages,
    ...supportPages,
    ...destinationPages,
    ...routePages,
    ...guidePages,
    ...seasonalPages,
  ];
}