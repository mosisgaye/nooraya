# Déploiement de l'Edge Function PayTech

## Instructions pour déployer via le Dashboard Supabase

1. **Accéder au Dashboard Supabase**
   - URL : https://app.supabase.com/project/zwwwvztzcbkptzhfynym
   - Se connecter avec vos identifiants

2. **Aller dans la section Edge Functions**
   - Dans le menu latéral, cliquer sur "Edge Functions"
   - Cliquer sur "New Function"

3. **Créer la fonction paytech-callback**
   - Nom : `paytech-callback`
   - Coller le code du fichier : `supabase/functions/paytech-callback/index.ts`

4. **Configurer les variables d'environnement**
   Dans les settings de la fonction, ajouter :
   ```
   PAYTECH_API_KEY=0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22
   ```

5. **Déployer la fonction**
   - Cliquer sur "Deploy"
   - L'URL de la fonction sera : https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback

## Test de la fonction

Une fois déployée, vous pouvez tester avec :

```bash
node scripts/test-paytech-callback.js
```

Puis exécuter le curl généré pour vérifier que la fonction répond correctement.

## Configuration PayTech

Communiquer cette URL de callback à PayTech :
```
https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback
```

## Notes importantes

- La fonction utilise le service role key de Supabase (déjà dans les variables d'environnement)
- Elle vérifie le hash SHA256 pour la sécurité
- Elle retourne toujours HTTP 200 pour éviter les retry de PayTech
- Les logs sont disponibles dans le dashboard Supabase > Edge Functions > Logs