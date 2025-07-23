# Variables d'Environnement pour Vercel

## Variables Requises pour le Déploiement

Copiez et collez ces variables dans les paramètres de votre projet Vercel :

### API Keys Essentielles

```
RAPIDAPI_KEY=01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5
KIWI_API_HOST=kiwi-com-cheap-flights.p.rapidapi.com
```

### Supabase

```
NEXT_PUBLIC_SUPABASE_URL=https://zwwwvztzcbkptzhfynym.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDM0MTEsImV4cCI6MjA2ODIxOTQxMX0.aKo3fc3fhdg-FRInDbKmSOFHGioR-cx-lFj8THL1GjQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjY0MzQxMSwiZXhwIjoyMDY4MjE5NDExfQ.IDWLh3UffPgk-_6xXizHYtWoCB7e51huxyL9s9o_D1Q
```

### PayTech

```
PAYTECH_API_KEY=0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22
PAYTECH_SECRET_KEY=e4c2aacba023866f0564a934692e1ded0375c1dfc895e9be24f55c339eeb08f8
PAYTECH_API_URL=https://api.intech.sn
PAYTECH_CALLBACK_URL=https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback
```

### URLs de Production

```
NEXT_PUBLIC_APP_URL=https://www.noorayavoyage.com
NEXT_PUBLIC_PAYMENT_SUCCESS_URL=https://www.noorayavoyage.com/payment/success
NEXT_PUBLIC_PAYMENT_ERROR_URL=https://www.noorayavoyage.com/payment/error
```

### Configuration Business

```
COMMISSION_RATE=0.05
ADMIN_EMAIL=contact@noorayagroup.com
```

### Email (Optionnel)

```
GMAIL_USER=contact@noorayagroup.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

## Comment Ajouter ces Variables dans Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Pour chaque variable ci-dessus :
   - Cliquez sur "Add"
   - Entrez le nom de la variable (ex: RAPIDAPI_KEY)
   - Entrez la valeur
   - Sélectionnez "Production", "Preview", et "Development"
   - Cliquez sur "Save"
5. Après avoir ajouté toutes les variables, redéployez votre application

## Variables Critiques

Les variables suivantes sont ABSOLUMENT nécessaires pour que l'application fonctionne :

1. **RAPIDAPI_KEY** - Sans cela, la recherche de vols ne fonctionnera pas
2. **KIWI_API_HOST** - Nécessaire pour l'API de recherche de vols
3. **NEXT_PUBLIC_SUPABASE_URL** - Pour la connexion à la base de données
4. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Pour l'authentification côté client

## Vérification

Après le déploiement, vérifiez que tout fonctionne en testant :
1. La recherche de vols
2. La connexion utilisateur
3. Le processus de réservation