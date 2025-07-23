-- Script pour corriger l'erreur de trigger dupliqué
-- ERROR: 42710: trigger "on_auth_user_created" for relation "users" already exists

-- Supprimer le trigger existant s'il existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Supprimer la fonction existante si elle existe
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recréer la fonction
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at, updated_at)
  VALUES (new.id, new.email, now(), now())
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Message de confirmation
DO $$ 
BEGIN 
  RAISE NOTICE 'Trigger on_auth_user_created a été recréé avec succès';
END $$;