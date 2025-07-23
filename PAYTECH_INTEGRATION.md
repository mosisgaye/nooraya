# PayTech/Intech API V2 - Notes d'intégration

## Informations de connexion

- **URL de base** : https://api.intech.sn
- **Clé API** : 0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22
- **Clé secrète** : e4c2aacba023866f0564a934692e1ded0375c1dfc895e9be24f55c339eeb08f8

## Services à intégrer pour Nooraya Voyages

### Moyens de paiement acceptés
- **Orange Money** (cash in/out)
- **Wave** (cash in/out)
- **Carte bancaire** (Visa, Mastercard)
- **WhatsApp** (pour les notifications)

### Services NON utilisés
- ❌ Virement bancaire

## Points techniques importants

### Authentification
- **GET** : Header `Secretkey: votre_cle_api`
- **POST** : Dans le body `"apiKey": "votre_cle_api"`

### Configuration requise
- **Timeout HTTP** : minimum 60 secondes
- **Format téléphone** : 
  - Local : 772457199
  - International : +221772457199 (pour cartes bancaires et WhatsApp)

### Callbacks
- URL de callback obligatoire
- Doit retourner **HTTP 200**
- Vérification avec hash SHA256
- Formule : `SHA256(transactionId|externalTransactionId|apiKey)`

### Codes de service principaux
- `ORANGE_SN_API_CASH_IN` : Orange Money Cash In
- `ORANGE_SN_API_CASH_OUT` : Orange Money Cash Out
- `WAVE_SN_API_CASH_IN` : Wave Cash In
- `WAVE_SN_API_CASH_OUT` : Wave Cash Out
- `BANK_CARD_API_CASH_OUT` : Paiement par carte bancaire
- `WHATSAPP_MESSAGING` : Envoi WhatsApp

## Flux de paiement

1. **Initiation** : POST vers `/api-services/operation`
2. **Attente callback** : PayTech envoie le statut final
3. **Vérification** : Contrôler le hash SHA256
4. **Confirmation** : Mettre à jour la réservation

## Exemple de transaction

```json
{
  "phone": "772457199",
  "amount": 50000,
  "codeService": "ORANGE_SN_API_CASH_OUT",
  "externalTransactionId": "NOORAYA_VOL_2025_001",
  "callbackUrl": "https://nooraya-voyages.com/api/paytech/callback",
  "apiKey": "{{api_key}}"
}
```

## URL de Callback
- **URL de callback configurée** : https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback

## Support
- Discord : Rejoindre le serveur PayTech
- WhatsApp : +221 77 245 71 99
- Documentation : https://docs.intech.sn/doc_intech_api.php