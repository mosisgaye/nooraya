# Corriger la Recherche de Vols en Production

## Problème
La recherche de vols fonctionne en local mais pas en production sur https://www.noorayavoyage.com

## Cause
Les variables d'environnement ne sont pas configurées sur Vercel.

## Solution Rapide

### Étape 1 : Connectez-vous à Vercel
1. Allez sur https://vercel.com/dashboard
2. Connectez-vous avec votre compte

### Étape 2 : Accédez aux Variables d'Environnement
1. Cliquez sur votre projet "nooraya" ou "my-app"
2. Cliquez sur l'onglet "Settings" en haut
3. Dans le menu de gauche, cliquez sur "Environment Variables"

### Étape 3 : Ajoutez les Variables Essentielles

Copiez et collez ces variables une par une :

#### 1. RAPIDAPI_KEY
- Name: `RAPIDAPI_KEY`
- Value: `01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5`
- Environment: ✓ Production, ✓ Preview, ✓ Development

#### 2. KIWI_API_HOST  
- Name: `KIWI_API_HOST`
- Value: `kiwi-com-cheap-flights.p.rapidapi.com`
- Environment: ✓ Production, ✓ Preview, ✓ Development

### Étape 4 : Redéployez
1. Après avoir ajouté les variables, allez dans l'onglet "Deployments"
2. Cliquez sur les 3 points (...) à côté du dernier déploiement
3. Cliquez sur "Redeploy"
4. Confirmez le redéploiement

## Vérification

### 1. Vérifiez l'API Health
Après le déploiement, visitez :
https://www.noorayavoyage.com/api/health

Vous devriez voir :
```json
{
  "status": "ok",
  "services": {
    "rapidapi": {
      "configured": true,
      "keyLength": 50
    }
  }
}
```

### 2. Testez la Recherche
Visitez : https://www.noorayavoyage.com/flight-results?from=CDG&to=LHR&departureDate=2025-08-02&returnDate=2025-08-20&adults=1

## Toutes les Variables d'Environnement

Pour une configuration complète, ajoutez aussi :

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://zwwwvztzcbkptzhfynym.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDM0MTEsImV4cCI6MjA2ODIxOTQxMX0.aKo3fc3fhdg-FRInDbKmSOFHGioR-cx-lFj8THL1GjQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjY0MzQxMSwiZXhwIjoyMDY4MjE5NDExfQ.IDWLh3UffPgk-_6xXizHYtWoCB7e51huxyL9s9o_D1Q

# PayTech
PAYTECH_API_KEY=0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22
PAYTECH_SECRET_KEY=e4c2aacba023866f0564a934692e1ded0375c1dfc895e9be24f55c339eeb08f8
PAYTECH_API_URL=https://api.intech.sn
PAYTECH_CALLBACK_URL=https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback

# URLs
NEXT_PUBLIC_APP_URL=https://www.noorayavoyage.com
NEXT_PUBLIC_PAYMENT_SUCCESS_URL=https://www.noorayavoyage.com/payment/success
NEXT_PUBLIC_PAYMENT_ERROR_URL=https://www.noorayavoyage.com/payment/error

# Business
COMMISSION_RATE=0.05
ADMIN_EMAIL=contact@noorayagroup.com
```

## Besoin d'Aide ?

Si la recherche ne fonctionne toujours pas :
1. Vérifiez les logs dans Vercel (Functions tab)
2. Contactez le support technique
3. Vérifiez que la clé RapidAPI est toujours valide