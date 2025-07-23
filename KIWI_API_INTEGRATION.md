# Intégration API Kiwi.com - Plan d'adaptation

## Analyse du système de recherche existant

### ✅ Éléments déjà en place
1. **Formulaire de recherche complet** (Hero.tsx)
   - Champs départ/destination avec codes aéroports
   - Sélecteur de dates (aller/retour)
   - Compteur de passagers (adultes, enfants, bébés)
   - Sélection de classe (économique, affaires, première)
   - Type de voyage (aller-retour, aller simple, multi-destinations)

2. **Validation et navigation**
   - Extraction des codes aéroports (ex: Paris (CDG) → CDG)
   - Validation des champs obligatoires
   - Redirection vers /flight-results avec paramètres

3. **Liste d'aéroports** (57 aéroports internationaux)
   - Format : code, nom, ville, pays
   - Recherche par ville, nom, pays ou code

## 🔄 Adaptations nécessaires

### 1. Mapping des paramètres vers Kiwi.com

| Paramètre actuel | Format Kiwi.com | Exemple |
|-----------------|-----------------|---------|
| fromCode | source | "airport:CDG" ou "city:paris_fr" |
| toCode | destination | "airport:JFK" ou "city:new_york_us" |
| departureDate | outbound | "2025-03-15" |
| returnDate | inbound | "2025-03-22" |
| adults | adults | 1 |
| children | children | 0 |
| infants | infants | 0 |
| cabinClass | cabinClass | ECONOMY, BUSINESS, FIRST |
| tripType | - | Géré par endpoints différents |

### 2. Endpoints Kiwi.com à utiliser

```
# Recherche aller-retour
GET /round-trip

# Recherche aller simple
GET /one-way

# Recherche multi-destinations
GET /multi-city

# Autocomplete aéroports/villes (optionnel)
GET /locations/query
```

### 3. Structure de l'intégration

```
src/
├── app/
│   ├── api/
│   │   └── flights/
│   │       ├── search/route.ts     # Endpoint pour appeler Kiwi
│   │       └── locations/route.ts  # Autocomplete (optionnel)
│   └── flight-results/
│       └── FlightResultsClient.tsx # Affichage des résultats
├── lib/
│   └── kiwi/
│       ├── client.ts              # Client API Kiwi
│       └── types.ts               # Types TypeScript
└── services/
    └── flightSearch.ts            # Service de recherche
```

### 4. Paramètres API Kiwi.com

**Headers requis :**
```
x-rapidapi-host: kiwi-com-cheap-flights.p.rapidapi.com
x-rapidapi-key: 01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5
```

**Paramètres de recherche principaux :**
- source : Point de départ
- destination : Point d'arrivée  
- currency : EUR (pour l'Europe/Afrique)
- locale : fr (français)
- sortBy : PRICE ou QUALITY
- limit : 20-50 résultats

### 5. Flux d'intégration

1. **Page d'accueil** : L'utilisateur remplit le formulaire existant
2. **Soumission** : Les paramètres sont formatés pour Kiwi
3. **API Route** : /api/flights/search appelle Kiwi.com
4. **Résultats** : /flight-results affiche les vols trouvés
5. **Réservation** : Redirection vers le lien Kiwi

## 📝 Notes importantes

- **Pas de modification du design** : Le Hero existant reste intact
- **Ajout minimal** : Seulement l'appel API et l'affichage des résultats
- **Codes aéroports** : Utiliser le format "airport:CODE" pour Kiwi
- **Gestion d'erreurs** : Prévoir les cas d'API down ou sans résultats
- **Cache** : Considérer un cache de 5-10 minutes pour les recherches

## 🚀 Prochaines étapes

1. Créer le client API Kiwi.com
2. Adapter la page flight-results pour afficher les vraies données
3. Tester avec différentes recherches
4. Ajouter la gestion d'erreurs
5. Optimiser les performances (cache, pagination)