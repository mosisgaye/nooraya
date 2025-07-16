-- Update function to handle OAuth providers metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url)
  VALUES (
    new.id, 
    new.email,
    COALESCE(
      new.raw_user_meta_data->>'first_name', 
      new.raw_user_meta_data->>'given_name',
      new.raw_user_meta_data->>'full_name',
      ''
    ),
    COALESCE(
      new.raw_user_meta_data->>'last_name', 
      new.raw_user_meta_data->>'family_name',
      ''
    ),
    COALESCE(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'picture',
      ''
    )
  )
  ON CONFLICT (id) DO UPDATE
  SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = TIMEZONE('utc', NOW());
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;