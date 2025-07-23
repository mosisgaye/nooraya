# Configuration Vercel - Variables d'Environnement

## Variables OBLIGATOIRES pour la recherche de vols

Ajoutez ces variables dans Vercel Dashboard → Settings → Environment Variables :

### 1. RAPIDAPI_KEY (OBLIGATOIRE)
```
Name: RAPIDAPI_KEY
Value: 01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5
```

### 2. KIWI_API_HOST (OBLIGATOIRE)
```
Name: KIWI_API_HOST
Value: kiwi-com-cheap-flights.p.rapidapi.com
```

## Toutes les variables d'environnement

```env
# API Keys (OBLIGATOIRE pour la recherche)
RAPIDAPI_KEY=01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5
KIWI_API_HOST=kiwi-com-cheap-flights.p.rapidapi.com

# Supabase (OBLIGATOIRE)
NEXT_PUBLIC_SUPABASE_URL=https://zwwwvztzcbkptzhfynym.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDM0MTEsImV4cCI6MjA2ODIxOTQxMX0.aKo3fc3fhdg-FRInDbKmSOFHGioR-cx-lFj8THL1GjQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjY0MzQxMSwiZXhwIjoyMDY4MjE5NDExfQ.IDWLh3UffPgk-_6xXizHYtWoCB7e51huxyL9s9o_D1Q

# PayTech (pour les paiements)
PAYTECH_API_KEY=0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22
PAYTECH_SECRET_KEY=e4c2aacba023866f0564a934692e1ded0375c1dfc895e9be24f55c339eeb08f8
PAYTECH_API_URL=https://api.intech.sn
PAYTECH_CALLBACK_URL=https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback

# URLs de production
NEXT_PUBLIC_APP_URL=https://www.noorayavoyage.com
NEXT_PUBLIC_PAYMENT_SUCCESS_URL=https://www.noorayavoyage.com/payment/success
NEXT_PUBLIC_PAYMENT_ERROR_URL=https://www.noorayavoyage.com/payment/error

# Configuration Business
COMMISSION_RATE=0.05
ADMIN_EMAIL=contact@noorayagroup.com
```

## Comment ajouter les variables

1. Connectez-vous à [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Cliquez sur "Settings" en haut
4. Dans le menu de gauche, cliquez sur "Environment Variables"
5. Pour chaque variable :
   - Cliquez sur "Add New"
   - Entrez le nom (ex: RAPIDAPI_KEY)
   - Entrez la valeur
   - Cochez : ✅ Production ✅ Preview ✅ Development
   - Cliquez sur "Save"

## Vérification après déploiement

1. Visitez : https://www.noorayavoyage.com/api/health
2. Vous devriez voir `"rapidapi": { "configured": true }`

## Test de la recherche

Après configuration, testez : https://www.noorayavoyage.com/flight-results?from=CDG&to=LHR&departureDate=2025-08-02&adults=1