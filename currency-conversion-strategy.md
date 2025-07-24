# Stratégie de Conversion de Devises - Solution Hybride

## Configuration API

**API Key**: `158aec7444d424b58e6147f5`  
**Base URL**: `https://v6.exchangerate-api.com/v6/158aec7444d424b58e6147f5`

### Endpoints disponibles
- **Taux de change**: `/latest/{currency}`
- **Exemple**: `https://v6.exchangerate-api.com/v6/158aec7444d424b58e6147f5/latest/EUR`

## Architecture de la Solution

### 1. Structure des Données

```typescript
interface ExchangeRates {
  EUR_TO_XOF: number;  // EUR vers FCFA
  USD_TO_XOF: number;  // USD vers FCFA
  lastUpdated: string; // ISO date
}

interface UserCurrencyPreference {
  currency: 'XOF' | 'EUR' | 'USD';
  showSecondaryCurrency: boolean;
}
```

### 2. Implémentation Frontend

#### Context API (CurrencyContext)
```typescript
// src/contexts/CurrencyContext.tsx
- Gestion globale de la devise
- Stockage localStorage
- Conversion automatique
- Détection géographique
```

#### Hook personnalisé
```typescript
// src/hooks/useCurrency.ts
const { 
  currentCurrency,
  convertPrice,
  formatPrice,
  switchCurrency 
} = useCurrency();
```

#### Composant PriceDisplay
```typescript
// src/components/ui/PriceDisplay.tsx
<PriceDisplay 
  amount={500} 
  currency="EUR"
  showSecondary={true}
/>
// Affiche: 327 979 FCFA (500€)
```

### 3. Implémentation Backend

#### Route API pour les taux
```typescript
// src/app/api/exchange-rates/route.ts
- GET: Récupère les taux actuels du cache
- POST: Force la mise à jour (admin only)
```

#### Service de mise à jour
```typescript
// src/lib/services/exchangeRateService.ts
- Appel API ExchangeRate
- Mise en cache Supabase/Redis
- Fallback sur taux fixes
```

#### Cron Job (Vercel)
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/update-exchange-rates",
    "schedule": "0 6 * * *"  // 6h UTC = 6h GMT
  }]
}
```

### 4. Taux de Change par Défaut

```typescript
const DEFAULT_RATES = {
  EUR_TO_XOF: 655.957,  // Taux fixe officiel CFA
  USD_TO_XOF: 615.5,    // Taux approximatif
};
```

### 5. Détection Géographique

Pays avec FCFA par défaut:
- Sénégal (SN)
- Mali (ML)
- Côte d'Ivoire (CI)
- Burkina Faso (BF)
- Bénin (BJ)
- Togo (TG)
- Niger (NE)
- Guinée-Bissau (GW)

### 6. Format d'Affichage

#### FCFA (XOF)
- Format: `325 000 FCFA`
- Séparateur de milliers: espace
- Pas de décimales

#### EUR
- Format: `500,00 €`
- Séparateur de milliers: virgule
- 2 décimales

#### USD
- Format: `$550.00`
- Séparateur de milliers: virgule
- 2 décimales

### 7. Flux de Données

1. **Chargement initial**
   - Vérifier localStorage pour préférence utilisateur
   - Charger taux depuis cache local
   - Si absent, appeler API backend

2. **Mise à jour quotidienne**
   - Cron job à 6h GMT
   - Appel ExchangeRate API
   - Mise à jour cache Supabase
   - Invalidation cache frontend

3. **Changement de devise**
   - Mise à jour Context
   - Sauvegarde localStorage
   - Re-render des prix

### 8. Gestion d'Erreurs

- **API indisponible**: Utiliser taux par défaut
- **Limite dépassée**: Cache pendant 24h minimum
- **Erreur réseau**: Retry avec exponential backoff

### 9. Optimisations Performance

- Cache navigateur: 1 heure
- Cache CDN: 6 heures
- Debounce changements: 300ms
- Lazy loading du sélecteur

### 10. Variables d'Environnement

```env
EXCHANGE_RATE_API_KEY=158aec7444d424b58e6147f5
EXCHANGE_RATE_API_URL=https://v6.exchangerate-api.com/v6
EXCHANGE_RATE_CACHE_TTL=86400  # 24 heures en secondes
DEFAULT_CURRENCY=XOF  # Pour l'Afrique de l'Ouest
```

### 11. Monitoring

- Logger chaque mise à jour de taux
- Alerter si écart > 5% vs taux fixe
- Track les erreurs API
- Analyser les préférences utilisateurs

### 12. Limites API

**ExchangeRate-API (Plan gratuit)**
- 1500 requêtes/mois
- 1 requête/jour = 30 requêtes/mois ✅
- Marge confortable pour les erreurs

### 13. Exemple d'Utilisation

```typescript
// Dans un composant
import { useCurrency } from '@/hooks/useCurrency';

function FlightCard({ priceInEUR }) {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="price">
      {formatPrice(priceInEUR, 'EUR')}
      // Affiche: 327 979 FCFA (500€)
    </div>
  );
}
```

### 14. Roadmap Future

1. **Phase 1** (Immédiat)
   - Taux fixe EUR/FCFA
   - Sélecteur manuel

2. **Phase 2** (1 mois)
   - API integration
   - Cache système
   - Détection géo

3. **Phase 3** (3 mois)
   - Multi-devises (GBP, CAD)
   - Historique des taux
   - Prévisions