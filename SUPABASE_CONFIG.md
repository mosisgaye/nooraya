# Configuration Supabase - Nooraya Voyages

## Informations de connexion

- **URL du projet** : https://zwwwvztzcbkptzhfynym.supabase.co

- **Clé publique (anon)** : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDM0MTEsImV4cCI6MjA2ODIxOTQxMX0.aKo3fc3fhdg-FRInDbKmSOFHGioR-cx-lFj8THL1GjQ

## Structure de base de données proposée

### 1. Table `users` (profils utilisateurs)
```sql
- id (uuid, PK, default: uuid_generate_v4())
- email (text, unique, not null)
- first_name (text)
- last_name (text)
- phone (text)
- avatar_url (text)
- created_at (timestamp with timezone, default: now())
- updated_at (timestamp with timezone)
```

### 2. Table `flight_searches` (historique des recherches)
```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id, nullable)
- from_airport (text)
- to_airport (text)
- departure_date (date)
- return_date (date, nullable)
- adults (integer, default: 1)
- children (integer, default: 0)
- infants (integer, default: 0)
- cabin_class (text)
- trip_type (text)
- created_at (timestamp with timezone, default: now())
```

### 3. Table `bookings` (réservations)
```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id, nullable)
- booking_type (text) -- 'flight', 'hotel', 'package'
- external_booking_id (text) -- ID Kiwi, Booking.com, etc.
- status (text) -- 'pending', 'confirmed', 'cancelled'
- total_amount (decimal)
- currency (text, default: 'EUR')
- passenger_details (jsonb)
- flight_details (jsonb)
- created_at (timestamp with timezone, default: now())
- updated_at (timestamp with timezone)
```

### 4. Table `payments` (paiements)
```sql
- id (uuid, PK)
- booking_id (uuid, FK → bookings.id)
- user_id (uuid, FK → users.id, nullable)
- amount (decimal)
- currency (text)
- payment_method (text) -- 'orange_money', 'wave', 'card'
- paytech_transaction_id (text)
- paytech_external_id (text)
- status (text) -- 'pending', 'success', 'failed'
- error_message (text, nullable)
- callback_data (jsonb)
- created_at (timestamp with timezone, default: now())
- updated_at (timestamp with timezone)
```

### 5. Table `favorites` (destinations favorites)
```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- type (text) -- 'flight_route', 'destination'
- data (jsonb) -- Détails de la route ou destination
- created_at (timestamp with timezone, default: now())
```

### 6. Table `price_alerts` (alertes de prix)
```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- from_airport (text)
- to_airport (text)
- target_price (decimal)
- current_price (decimal, nullable)
- is_active (boolean, default: true)
- created_at (timestamp with timezone, default: now())
- updated_at (timestamp with timezone)
```

## Politiques de sécurité (RLS)

### Users
- Lecture : Utilisateurs peuvent voir leur propre profil
- Mise à jour : Utilisateurs peuvent modifier leur propre profil

### Bookings
- Lecture : Utilisateurs voient leurs propres réservations
- Création : Authentifiés peuvent créer
- Mise à jour : Propriétaire peut modifier (certains champs)

### Payments
- Lecture : Utilisateurs voient leurs propres paiements
- Création : Système uniquement (via service role)
- Pas de mise à jour directe

## Variables d'environnement à ajouter

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://zwwwvztzcbkptzhfynym.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDM0MTEsImV4cCI6MjA2ODIxOTQxMX0.aKo3fc3fhdg-FRInDbKmSOFHGioR-cx-lFj8THL1GjQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3d2enR6Y2JrcHR6aGZ5bnltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjY0MzQxMSwiZXhwIjoyMDY4MjE5NDExfQ.IDWLh3UffPgk-_6xXizHYtWoCB7e51huxyL9s9o_D1Q

# URLs de production
NEXT_PUBLIC_APP_URL=https://www.noorayavoyage.com
PAYTECH_CALLBACK_URL=https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback

# Email
ADMIN_EMAIL=contact@noorayagroup.com

# Commission
COMMISSION_RATE=0.05 # 5% de commission
```

## Notes
- Toutes les tables utilisent UUID pour les clés primaires
- Les timestamps sont en UTC
- JSONB pour les données flexibles (détails passagers, etc.)
- RLS (Row Level Security) activé sur toutes les tables