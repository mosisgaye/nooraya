# Configuration Complète du Projet Nooraya Voyages

## 🎯 Décisions d'architecture

### Authentification
- **Solution** : Supabase Auth
- **Guest Checkout** : ✅ Activé (réservations sans compte autorisées)
- **Profils utilisateurs** : Stockés dans la table `users`

### Système de paiement
- **Provider** : PayTech/Intech API V2
- **Méthodes acceptées** :
  - Orange Money
  - Wave
  - Carte bancaire (Visa/Mastercard)
- **URL de callback** : https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback
- **URLs de retour** :
  - Success : https://www.noorayavoyage.com/payment/success
  - Error : https://www.noorayavoyage.com/payment/error

### Commission
- **Taux** : 5% sur toutes les réservations
- **Application** : Ajouté au prix final avant paiement
- **Exemple** : Vol à 100 000 CFA → Prix client : 105 000 CFA

### APIs externes
1. **Kiwi.com** (via RapidAPI)
   - Recherche de vols
   - Prix en temps réel
   - Réservation externe

2. **Booking.com** (à implémenter)
   - Recherche d'hôtels
   - Disponibilité et prix

3. **TripAdvisor** (à implémenter)
   - Restaurants
   - Attractions
   - Avis

### Email
- **Adresse admin** : contact@noorayagroup.com
- **Service** : À définir (SendGrid, Resend, ou Supabase Email)
- **Templates** :
  - Confirmation de réservation
  - Reçu de paiement
  - Rappels de voyage

## 📂 Structure des fichiers

```
my-app/
├── .env.local                    # Variables d'environnement
├── PAYTECH_INTEGRATION.md        # Documentation PayTech
├── SUPABASE_CONFIG.md           # Configuration Supabase
├── KIWI_API_INTEGRATION.md      # Plan d'intégration Kiwi
├── PROJECT_CONFIG.md            # Ce fichier
├── supabase/
│   ├── migrations/              # Scripts SQL pour les tables
│   └── functions/
│       └── paytech-callback/    # Edge Function pour PayTech
├── src/
│   ├── lib/
│   │   ├── supabase/           # Client Supabase
│   │   ├── paytech/            # Client PayTech
│   │   └── kiwi/               # Client Kiwi.com
│   ├── app/
│   │   ├── api/
│   │   │   ├── flights/        # API routes vols
│   │   │   └── payments/       # API routes paiements
│   │   ├── (auth)/             # Pages authentification
│   │   └── payment/
│   │       ├── success/        # Page succès paiement
│   │       └── error/          # Page erreur paiement
│   └── components/
│       ├── booking/            # Composants réservation
│       └── payment/            # Composants paiement
```

## 🔐 Sécurité

1. **Clés API** : Jamais exposées côté client
2. **Callbacks PayTech** : Vérification SHA256 obligatoire
3. **RLS Supabase** : Activé sur toutes les tables
4. **CORS** : Configuré pour le domaine de production
5. **HTTPS** : Obligatoire en production

## 🚀 Prochaines étapes

1. Créer les tables Supabase
2. Implémenter l'Edge Function PayTech
3. Intégrer Kiwi.com API
4. Ajouter Supabase Auth
5. Créer le flow de réservation
6. Implémenter le système de paiement
7. Configurer les emails
8. Tests et déploiement

## 📊 Flux de réservation

```
Recherche → Résultats → Sélection → Paiement → Confirmation
    ↓           ↓           ↓           ↓            ↓
  Kiwi       Display    Guest/Auth   PayTech    Email+DB
```

## 🌍 Domaines

- **Production** : https://www.noorayavoyage.com
- **Supabase** : https://zwwwvztzcbkptzhfynym.supabase.co
- **Edge Functions** : https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/