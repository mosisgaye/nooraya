Effectuer une transaction
/api-services/operation

Exemple GET
curl -X GET "https://api.intech.sn/api-services/services" \
  -H "Secretkey: xxxxxx"
Exemple POST
{
  "apiKey": "xxxxxx",
  "phone": "772457199",
  "amount": 1000,
  "codeService": "WAVE_SN_API_CASH_IN"
}

URL de base
https://api.intech.sn

Notes importantes
Note 1 : API SMS
Cette API fournit uniquement l'API WhatsApp pour la messagerie (avec support des pièces jointes média : mp4, mp3, images...).
Si vous avez besoin de l'API SMS, utilisez notre plateforme SMS dédiée :
• Documentation : SMS API Documentation
• Plateforme : https://intechsms.sn/login
Note 2 : Timeout HTTP
Configurez le timeout de votre client HTTP à minimum 60 secondes.
Note 3 : Codes de réponse
Pour toutes les requêtes, l'API retourne un code HTTP 200 ou 201 avec des données JSON décrivant le résultat de la requête.
Note 4 : URL de callback
Votre URL de callback doit retourner un code de statut 200. Tout autre statut est considéré comme un échec et le callback sera renvoyé.

Exemple de calcul en JavaScript/Node.js
const crypto = require('crypto');

function calculateHMACSignature(httpMethod, timestamp, requestBody, hmacSecretKey) {
    // Convertir le body en JSON string
    const bodyString = JSON.stringify(requestBody);
    
    // Construire la chaîne à signer
    const hmacData = `${httpMethod}:${timestamp}:${bodyString}`;
    
    // Calculer la signature HMAC-SHA256
    const hmacSignature = crypto
        .createHmac('sha256', hmacSecretKey)
        .update(hmacData)
        .digest('hex');
    
    return hmacSignature;
}

// Exemple d'utilisation
const httpMethod = 'POST';
const timestamp = Date.now().toString();
const requestBody = {
    apiKey: 'votre_cle_api',
    phone: '221777777777',
    amount: 1000,
    codeService: 'FREE_SN_WALLET_CASH_IN'
};
const hmacSecretKey = 'votre_cle_hmac_secrete';

const signature = calculateHMACSignature(httpMethod, timestamp, requestBody, hmacSecretKey);

console.log('HMAC Signature:', signature);

Exemple de requête avec signature HMAC
curl -X POST "https://api.intech.sn/api-services/operation" \
  -H "Content-Type: application/json" \
  -H "Hmac-Signature: abc123def456789..." \
  -H "Timestamp: 1699548600000" \
  -d '{
    "apiKey": "votre_cle_api",
    "phone": "221777777777",
    "amount": 1000,
    "codeService": "FREE_SN_WALLET_CASH_IN",
    "externalTransactionId": "TXN_001",
    "urlIpn": "https://votre-site.com/callback"
  }'
  
  
  Validation des callbacks avec HMAC (si activé)
// Exemple de validation d'un callback reçu
function validateCallbackHMAC(receivedSignature, timestamp, callbackBody, hmacSecretKey) {
    // Vérifier que le timestamp n'est pas expiré (5 minutes par défaut)
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    const maxAge = 5 * 60 * 1000; // 5 minutes en millisecondes
    
    if (now - requestTime > maxAge) {
        throw new Error('Timestamp expired');
    }
    
    // Calculer la signature attendue
    const httpMethod = 'POST';
    const bodyString = JSON.stringify(callbackBody);
    const hmacData = `${httpMethod}:${timestamp}:${bodyString}`;
    
    const expectedSignature = crypto
        .createHmac('sha256', hmacSecretKey)
        .update(hmacData)
        .digest('hex');
    
    // Comparaison sécurisée
    if (expectedSignature !== receivedSignature) {
        throw new Error('Invalid HMAC signature');
    }
    
    return true;
}
Important - Gestion du timestamp
Les signatures HMAC incluent une validation temporelle. Par défaut, une requête est considérée comme expirée après 5 minutes. Assurez-vous que l'horloge de votre serveur est synchronisée.

Comment obtenir l'empreinte de votre certificat
# Méthode 1: En ligne de commande avec OpenSSL
openssl s_client -servername votre-domaine.com -connect votre-domaine.com:443 < /dev/null 2>/dev/null | \
openssl x509 -pubkey -noout | \
openssl rsa -pubin -outform der 2>/dev/null | \
openssl dgst -sha256 -binary | \
openssl enc -base64

# Méthode 2: Depuis un fichier de certificat
openssl x509 -pubkey -noout -in certificat.pem | \
openssl rsa -pubin -outform der 2>/dev/null | \
openssl dgst -sha256 -binary | \
openssl enc -base64

/api-services/services
curl -X GET "https://api.intech.sn/api-services/services" \
  -H "Secretkey: xxxxxx"
  {
    "success": true,
    "services": [
        {
            "name": "CashIn Free Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/free_sn.png",
            "codeService": "FREE_SN_WALLET_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashIn E Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/emoney.png",
            "codeService": "EXPRESSO_SN_WALLET_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashOut Free Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/free_sn.png",
            "codeService": "FREE_SN_WALLET_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "CashOut E Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/emoney.png",
            "codeService": "EXPRESSO_SN_WALLET_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "Achat credit Orange",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/seddo.jpg",
            "codeService": "ORANGE_SN_AIRTIME_CREDIT_TELEPHONIQUE",
            "typeOperation": "DEBIT",
            "typeService": "CREDIT_TELEPHONIQUE"
        },
        {
            "name": "Achat credit Free",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/izi.jpg",
            "codeService": "FREE_SN_AIRTIME_CREDIT_TELEPHONIQUE",
            "typeOperation": "DEBIT",
            "typeService": "CREDIT_TELEPHONIQUE"
        },
        {
            "name": "Achat credit Expresso",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/expresso.png",
            "codeService": "EXPRESSO_SN_AIRTIME_CREDIT_TELEPHONIQUE",
            "typeOperation": "DEBIT",
            "typeService": "CREDIT_TELEPHONIQUE"
        },
        {
            "name": "CashIn Orange Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/om_sn.png",
            "codeService": "ORANGE_SN_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashOut Orange Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/om_sn.png",
            "codeService": "ORANGE_SN_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "CashIn Wave Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/wave.png",
            "codeService": "WAVE_SN_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashOut Wave Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/wave.png",
            "codeService": "WAVE_SN_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "CashOut Wizall Money",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/wizall.jpg",
            "codeService": "WIZALL_SN_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "CashOut Carte Bancaire",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/CB.png",
            "codeService": "BANK_CARD_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "Recharge Rapido",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/rapido.png",
            "codeService": "RAPIDO_SN_BILL_RELOAD",
            "typeOperation": "DEBIT",
            "typeService": "BILL_BUY_RELOAD"
        },
        {
            "name": "Recharge Woyofal",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/logo_woyofal.png",
            "codeService": "WOYOFAL_SN_BILL_RELOAD",
            "typeOperation": "DEBIT",
            "typeService": "BILL_BUY_RELOAD"
        },
        {
            "name": "Sénélec",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/logo_senelec.png",
            "codeService": "SENELEC_SN_BILL_PAY",
            "typeOperation": "DEBIT",
            "typeService": "BILL_PAY"
        },
        {
            "name": "SenEau",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/logo_sen_eau.png",
            "codeService": "SENEAU_SN_BILL_PAY",
            "typeOperation": "DEBIT",
            "typeService": "BILL_PAY"
        },
        {
            "name": "Recharge Xeweul",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/xeweul.png",
            "codeService": "XEWEUL_SN_BILL_RELOAD",
            "typeOperation": "DEBIT",
            "typeService": "BILL_BUY_RELOAD"
        },
        {
            "name": "Oolu Solar",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/oolusoloar.png",
            "codeService": "OOLUSOLAR_SN_BILL_RELOAD",
            "typeOperation": "DEBIT",
            "typeService": "BILL_BUY_RELOAD"
        },
        {
            "name": "Baobab Plus",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/baobapplus.png",
            "codeService": "BAOBAP_PLUS_SN_BILL_RELOAD",
            "typeOperation": "DEBIT",
            "typeService": "BILL_BUY_RELOAD"
        },
        {
            "name": "Der/Fj",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/derfj.jpg",
            "codeService": "DER_FJ_SN_BILL_RELOAD",
            "typeOperation": "DEBIT",
            "typeService": "BILL_BUY_RELOAD"
        },
        {
            "name": "Aquatech",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/aquatech.jpg",
            "codeService": "AQUATECH_SN_BILL_PAY",
            "typeOperation": "DEBIT",
            "typeService": "BILL_PAY"
        },
        {
            "name": "UVS",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/uvs.png",
            "codeService": "UVS_SN_BILL_PAY",
            "typeOperation": "DEBIT",
            "typeService": "BILL_PAY"
        },
        {
            "name": "UCAD",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/ucad.png",
            "codeService": "UCAD_SN_BILL_PAY",
            "typeOperation": "DEBIT",
            "typeService": "BILL_PAY"
        },
        {
            "name": "WhatsApp Message",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/WhatsApp.svg.png",
            "codeService": "WHATSAPP_MESSAGING",
            "typeOperation": "DEBIT",
            "typeService": "MESSENGING_SMS"
        },
        {
            "name": "Virement Bancaire Sénégal",
            "icon": "https://change.sn/assets/images/virement.png",
            "codeService": "BANK_TRANSFER_SN_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashIn Orange Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/om_ci.png",
            "codeService": "ORANGE_CI_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "Cashout Orange Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/om_ci.png",
            "codeService": "ORANGE_CI_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "Airtime Orange Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/orange_ci_airtime.png",
            "codeService": "ORANGE_CI_AIRTIME_CREDIT_TELEPHONIQUE",
            "typeOperation": "DEBIT",
            "typeService": "CREDIT_TELEPHONIQUE"
        },
        {
            "name": "CashIn Mtn Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/mtn_ci.png",
            "codeService": "MTN_CI_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashOut Mtn Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci.png",
            "codeService": "MTN_CI_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "Airtime Mtn CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/mtn_ci_airtime.png",
            "codeService": "MTN_CI_AIRTIME_CREDIT_TELEPHONIQUE",
            "typeOperation": "DEBIT",
            "typeService": "CREDIT_TELEPHONIQUE"
        },
        {
            "name": "CashIn Moov Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci.png",
            "codeService": "MOOV_CI_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashOut Moov Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci.png",
            "codeService": "MOOV_CI_API_CASH_OUT",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "Airtime Moov CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci_airtime.png",
            "codeService": "MOOV_CI_AIRTIME_CREDIT_TELEPHONIQUE",
            "typeOperation": "DEBIT",
            "typeService": "CREDIT_TELEPHONIQUE"
        },
        {
            "name": "CashOut Mtn Money CI 2",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/wizall.jpg",
            "codeService": "MTN_CI_API_CASH_OUT_2",
            "typeOperation": "CREDIT",
            "typeService": "CASHOUT"
        },
        {
            "name": "CashIn Mtn Money CI 2",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/mtn_ci.jpg",
            "codeService": "MTN_CI_API_CASH_IN_2",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        },
        {
            "name": "CashIn Wave Money CI",
            "icon": "https://intech-apiv2.s3.amazonaws.com/icons/wave.png",
            "codeService": "WAVE_CI_API_CASH_IN",
            "typeOperation": "DEBIT",
            "typeService": "CASHIN"
        }
    ]
}