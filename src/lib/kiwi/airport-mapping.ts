// Mapping des codes aéroports vers les identifiants Kiwi
export const airportToKiwiLocation: Record<string, string> = {
  // France
  'CDG': 'City:paris_fr',
  'ORY': 'City:paris_fr',
  'NCE': 'City:nice_fr',
  'LYS': 'City:lyon_fr',
  'MRS': 'City:marseille_fr',
  
  // USA
  'JFK': 'City:new_york_us',
  'LGA': 'City:new_york_us',
  'EWR': 'City:new_york_us',
  'LAX': 'City:los_angeles_us',
  'SFO': 'City:san_francisco_us',
  'ORD': 'City:chicago_us',
  'MIA': 'City:miami_us',
  'BOS': 'City:boston_us',
  
  // UK
  'LHR': 'City:london_gb',
  'LGW': 'City:london_gb',
  'STN': 'City:london_gb',
  'LCY': 'City:london_gb',
  'MAN': 'City:manchester_gb',
  
  // Espagne
  'MAD': 'City:madrid_es',
  'BCN': 'City:barcelona_es',
  'AGP': 'City:malaga_es',
  
  // Italie
  'FCO': 'City:rome_it',
  'CIA': 'City:rome_it',
  'MXP': 'City:milan_it',
  'LIN': 'City:milan_it',
  'VCE': 'City:venice_it',
  
  // Allemagne
  'FRA': 'City:frankfurt_de',
  'MUC': 'City:munich_de',
  'BER': 'City:berlin_de',
  'HAM': 'City:hamburg_de',
  
  // Pays-Bas
  'AMS': 'City:amsterdam_nl',
  
  // Belgique
  'BRU': 'City:brussels_be',
  
  // Suisse
  'ZRH': 'City:zurich_ch',
  'GVA': 'City:geneva_ch',
  
  // Autriche
  'VIE': 'City:vienna_at',
  
  // Portugal
  'LIS': 'City:lisbon_pt',
  'OPO': 'City:porto_pt',
  
  // Canada
  'YYZ': 'City:toronto_ca',
  'YUL': 'City:montreal_ca',
  'YVR': 'City:vancouver_ca',
  
  // Asie
  'NRT': 'City:tokyo_jp',
  'HND': 'City:tokyo_jp',
  'ICN': 'City:seoul_kr',
  'PEK': 'City:beijing_cn',
  'PVG': 'City:shanghai_cn',
  'HKG': 'City:hong_kong_hk',
  'SIN': 'City:singapore_sg',
  'BKK': 'City:bangkok_th',
  'DXB': 'City:dubai_ae',
  'DOH': 'City:doha_qa',
  
  // Afrique
  'CMN': 'City:casablanca_ma',
  'CAI': 'City:cairo_eg',
  'JNB': 'City:johannesburg_za',
  'CPT': 'City:cape_town_za',
  'NBO': 'City:nairobi_ke',
  'ADD': 'City:addis_ababa_et',
  'LOS': 'City:lagos_ng',
  'ACC': 'City:accra_gh',
  
  // Sénégal
  'DSS': 'City:dakar_sn',
  'DKR': 'City:dakar_sn',
  
  // Océanie
  'SYD': 'City:sydney_au',
  'MEL': 'City:melbourne_au',
  'BNE': 'City:brisbane_au',
  'AKL': 'City:auckland_nz',
  
  // Amérique du Sud
  'GRU': 'City:sao_paulo_br',
  'GIG': 'City:rio_de_janeiro_br',
  'EZE': 'City:buenos_aires_ar',
  'SCL': 'City:santiago_cl',
  'BOG': 'City:bogota_co',
  'LIM': 'City:lima_pe',
  'MEX': 'City:mexico_city_mx',
};

// Fonction pour obtenir le code Kiwi à partir du code aéroport
export function getKiwiLocation(airportCode: string): string {
  const uppercaseCode = airportCode.toUpperCase();
  return airportToKiwiLocation[uppercaseCode] || `airport:${uppercaseCode}`;
}