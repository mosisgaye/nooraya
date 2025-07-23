# Instructions de déploiement

## 1. Créer les tables dans Supabase

1. Connectez-vous à votre dashboard Supabase : https://app.supabase.com/project/zwwwvztzcbkptzhfynym

2. Allez dans l'éditeur SQL et exécutez les migrations dans l'ordre :
   - D'abord : `supabase/migrations/001_initial_schema.sql`
   - Ensuite : `supabase/migrations/002_enable_rls.sql`

## 2. Déployer l'Edge Function PayTech

1. Installez Supabase CLI si ce n'est pas déjà fait :
   ```bash
   npm install -g supabase
   ```

2. Connectez-vous à Supabase :
   ```bash
   supabase login
   ```

3. Liez votre projet :
   ```bash
   supabase link --project-ref zwwwvztzcbkptzhfynym
   ```

4. Déployez la fonction :
   ```bash
   cd /home/mosis/Documents/nooragroup/projet/voyage/my-app
   supabase functions deploy paytech-callback --no-verify-jwt
   ```

## 3. Configurer les variables d'environnement

Assurez-vous que toutes les variables dans `.env.local` sont correctement définies.

## 4. Tester l'intégration

### Test de l'API Kiwi :
```bash
curl -X POST http://localhost:3000/api/flights/search \
  -H "Content-Type: application/json" \
  -d '{
    "from": "CDG",
    "to": "DSS",
    "departureDate": "2025-02-15",
    "returnDate": "2025-02-22",
    "adults": 1,
    "children": 0,
    "infants": 0,
    "cabinClass": "economy",
    "tripType": "round-trip"
  }'
```

### Test du callback PayTech (avec hash valide) :
```bash
curl -X POST https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback \
  -H "Content-Type: application/json" \
  -d '{
    "msg": "Test callback",
    "status": "SUCCESS",
    "sha256Hash": "HASH_A_CALCULER",
    "transaction": {
      "transactionId": "TEST123",
      "externalTransactionId": "EXT123",
      "amount": 50000
    }
  }'
```

## 5. Prochaines étapes

1. Modifier le composant Hero pour appeler l'API `/api/flights/search`
2. Créer la page de résultats pour afficher les vols
3. Implémenter le flow de réservation et paiement
4. Ajouter l'authentification Supabase




