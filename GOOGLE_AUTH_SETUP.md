# Configuration de Google OAuth avec Supabase

## Étapes pour configurer Google Auth

### 1. Dans Google Cloud Console

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet ou sélectionner un projet existant
3. Activer l'API Google+ (APIs & Services → Enable APIs)
4. Créer des identifiants OAuth 2.0 :
   - APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Type d'application : Web application
   - Nom : Nooraya Voyages (Production)
   - Origines JavaScript autorisées : 
     - `https://zwwwvztzcbkptzhfynym.supabase.co`
     - `http://localhost:3000` (pour le développement)
   - URIs de redirection autorisées :
     - `https://zwwwvztzcbkptzhfynym.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (pour le développement)

5. Copier le Client ID et Client Secret

### 2. Dans Supabase Dashboard

1. Aller sur [Supabase Dashboard](https://supabase.com/dashboard/project/zwwwvztzcbkptzhfynym/auth/providers)
2. Aller dans Authentication → Providers
3. Activer Google
4. Remplir :
   - Client ID : [Coller le Client ID de Google]
   - Client Secret : [Coller le Client Secret de Google]
   - Authorized Client IDs : [Laisser vide ou ajouter le Client ID]

### 3. Configuration des URLs de redirection

Ajouter dans votre application :

```typescript
// Dans AuthProvider.tsx - loginWithGoogle()
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
    scopes: 'profile email'
  }
});
```

### 4. Vérifier les permissions

Dans Supabase :
- Authentication → Settings
- Vérifier que "Enable Email Confirmations" est désactivé si vous voulez une connexion immédiate
- Vérifier que les domaines autorisés incluent votre domaine de production

### 5. Variables d'environnement (optionnel)

Si vous voulez stocker les IDs Google (pas nécessaire avec Supabase) :

```env
# Google OAuth (optionnel - configuré dans Supabase)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

## Test de la configuration

1. Tester en local :
   - Cliquer sur "Se connecter avec Google"
   - Vérifier la redirection vers Google
   - Autoriser l'application
   - Vérifier le retour sur `/auth/callback`

2. Vérifier dans les logs Supabase :
   - Dashboard → Logs → Auth
   - Chercher les erreurs de connexion Google

## Erreurs courantes

1. **"Invalid redirect URI"** : Vérifier que l'URI dans Google Console correspond exactement
2. **"Access blocked"** : L'app Google doit être vérifiée pour la production
3. **"User not found"** : Vérifier que le trigger de création de profil fonctionne

## Notes importantes

- Google OAuth fonctionne automatiquement avec Supabase une fois configuré
- Les utilisateurs Google sont créés automatiquement dans auth.users
- Le trigger SQL crée automatiquement le profil dans public.profiles
- Les métadonnées Google (nom, avatar) sont disponibles dans user_metadata