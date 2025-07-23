# Configuration des Variables d'Environnement

## Variables Requises pour RapidAPI (Kiwi.com)

Pour que la recherche de vols fonctionne, vous devez configurer les variables suivantes :

### 1. Obtenir une clé API RapidAPI

1. Créez un compte sur [RapidAPI](https://rapidapi.com/)
2. Allez sur [Kiwi.com Cheap Flights API](https://rapidapi.com/david-astray-david-astray-default/api/kiwi-com-cheap-flights)
3. Cliquez sur "Subscribe to Test" et choisissez le plan gratuit
4. Copiez votre clé API depuis le dashboard

### 2. Configurer les variables d'environnement

Dans votre fichier `.env.local`, ajoutez :

```env
# RapidAPI Configuration
RAPIDAPI_KEY=votre-cle-api-rapidapi
KIWI_API_HOST=kiwi-com-cheap-flights.p.rapidapi.com
```

## Variables pour le Déploiement

Pour le déploiement en production (Vercel, etc.), assurez-vous de configurer ces variables d'environnement :

### Variables Essentielles
- `RAPIDAPI_KEY` - Clé API pour Kiwi.com
- `KIWI_API_HOST` - Host de l'API (garder la valeur par défaut)
- `NEXT_PUBLIC_SUPABASE_URL` - URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé publique Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Clé service Supabase (pour les opérations serveur)
- `PAYTECH_API_KEY` - Clé API PayTech
- `PAYTECH_SECRET_KEY` - Clé secrète PayTech

### Vérification

Pour vérifier que vos variables sont correctement configurées :

1. Lancez l'application : `npm run dev`
2. Faites une recherche de vol
3. Vérifiez la console pour les erreurs

Si vous voyez "RAPIDAPI_KEY not found", vérifiez votre fichier `.env.local`.

## Exemple de fichier .env.local complet

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://zwwwvztzcbkptzhfynym.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# RapidAPI
RAPIDAPI_KEY=01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5
KIWI_API_HOST=kiwi-com-cheap-flights.p.rapidapi.com

# PayTech
PAYTECH_API_KEY=0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22
PAYTECH_SECRET_KEY=e4c2aacba023866f0564a934692e1ded0375c1dfc895e9be24f55c339eeb08f8
PAYTECH_API_URL=https://api.intech.sn
PAYTECH_CALLBACK_URL=https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback
```

## Sécurité

⚠️ **Important** : 
- Ne jamais commiter le fichier `.env.local` dans Git
- Le fichier `.gitignore` doit contenir `.env.local`
- Utilisez des variables d'environnement différentes pour dev/staging/production