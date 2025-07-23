-- Script pour mettre à jour le mot de passe d'un utilisateur existant
-- Ce script définit le mot de passe à 'Test123!' pour l'utilisateur spécifié

-- Remplacez l'email ci-dessous par celui que vous voulez utiliser
UPDATE auth.users 
SET 
  encrypted_password = crypt('Test123!', gen_salt('bf')),
  updated_at = now()
WHERE email = 'mosisg7@gmail.com';

-- Vérifier que la mise à jour a fonctionné
SELECT id, email, updated_at FROM auth.users WHERE email = 'mosisg7@gmail.com';