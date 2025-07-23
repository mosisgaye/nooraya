7/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN TECH API V2
 Copier le prompt
 Menu principal

Rechercher dans la documentation...
Documentation API Intech V2
28% terminé
Français
Documentation
complète version 1.0.0 - Intégrez facilement les services financiers
et de messagerie dans vos applications avec
l'API REST Intech.


 Collection Postman disponible
Téléchargez la collection Postman complète : Intech API
V2.postman_collection.json
Assistance IA pour l'intégration
Besoin d'aide personnalisée ? Utilisez des assistants IA comme Claude ou ChatGPT pour
vous guider dans l'intégration Intech API.
 Prompt recommandé pour l'IA
Copiez et collez ce prompt dans Claude, ChatGPT ou tout autre assistant IA :
 Astuce
Ce prompt garantit que l'IA utilisera uniquement la documentation officielle
Intech API comme source d'information.
 Copier
Could you please help me implement Intech API integration in my backend
CRITICAL INSTRUCTION: Base ALL your recommendations EXCLUSIVELY on these
https://docs.intech.sn/doc_intech_api.php
1/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
- The official Intech API documentation at https://doc.intech.sn/doc_int
- The Intech API Postman collection at https://doc.intech.sn/Intech%20AP
IN TECH API V2
DO principal
NOT use any other sources of information beyond these two specified r
 Menu

Please help me with:
1. Setting up the Intech API in my backend (including required packages,
2. Sample code for handling cash-in, cash-out, bill payments, and WhatsA
28% terminé
3. Implementation of callbacks/webhooks with SHA256 verification in my b
4. Frontend integration for transaction status checking and user interfa
5. Best practices for secure API integration and error handling
6. Specific code examples for different service types (CASHIN, CASHOUT,
Please first ask me about my backend and frontend technology stack to pr
If any information is not available in the specified documentation sourc
 Avantages de l'assistance
IA
Code personnalisé pour votre stack
technologique
Explications détaillées étape par étape
Résolution de problèmes spécifiques
Meilleures pratiques de sécurité
Aide pour les callbacks/webhooks
 Services supportés
Cash-in / Cash-out
Paiement de factures
Crédit téléphonique
WhatsApp Messaging
Services MoneyGram
Callbacks sécurisés SHA256
Canaux d'intégration
Rejoignez notre communauté pour obtenir de l'aide et des mises à jour :
https://docs.intech.sn/doc_intech_api.php
2/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN TECH API V2
 Discord Server
 Menu principal
Canal principal de support
 WhatsApp
Support direct via WhatsApp

Rejoindre Discord
+221 77 245 71 99
28% terminé
Prérequis
1. Avoir un compte développeur Intech valide sur le portail développeur
2. Générer une clé API depuis votre tableau de bord
3. La clé API doit être envoyée avec chaque appel API
Authentification
L'authentification varie selon le type de requête :
Type de requêteMéthode d'authentificationParamètre/Header
GETHeaderSecretkey: votre_cle_api
POSTBody"apiKey": "votre_cle_api"
Exemple GET
 Copier
curl -X GET "https://api.intech.sn/api-services/services" \
-H "Secretkey: xxxxxx"
https://docs.intech.sn/doc_intech_api.php
3/567/22/25, 9:19 PM
Exemple POST
IN TECH API V2
Intech API V2 - Documentation Complète
 Menu principal
 Copier
{
"apiKey": "xxxxxx",
"phone": "772457199",
"amount": 1000,
"codeService": "WAVE_SN_API_CASH_IN"

28% terminé
}
URL de base
 Copier
https://api.intech.sn
Notes importantes
 Note 1 : API SMS
Cette API fournit uniquement l'API WhatsApp pour la messagerie (avec support
des pièces jointes média : mp4, mp3, images...).
Si vous avez besoin de l'API SMS, utilisez notre plateforme SMS dédiée :
• Documentation : SMS API Documentation
• Plateforme : https://intechsms.sn/login
 Note 2 : Timeout HTTP
Configurez le timeout de votre client HTTP à minimum 60 secondes.
 Note 3 : Codes de réponse
Pour toutes les requêtes, l'API retourne un code HTTP 200 ou 201 avec des
https://docs.intech.sn/doc_intech_api.php
4/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
données JSON décrivant le résultat de la requête.
IN TECH API V2
 Menu principal
 Note 4 : URL de callback

Votre URL de callback doit retourner un code de statut 200. Tout autre statut est
considéré comme un échec et le callback sera renvoyé.
28% terminé
Variables d'environnement
VariableValeurDescription
base_urlhttps://api.intech.snURL de base de l'API
api_keyVotre clé APIClé d'authentification
Sécurité Avancée (Optionnelle)
En plus de l'authentification par clé API et du hash SHA256 par défaut, Intech API propose
des fonctionnalités de sécurité avancées optionnelles pour les partenaires qui nécessitent un
niveau de sécurité renforcé.
 Sécurité par défaut vs. avancée
Par défaut, Intech API utilise un hash SHA256 pour vérifier l'intégrité des callbacks
(voir section Callbacks/Webhooks). Les fonctionnalités décrites ci-dessous
(HMAC + SSL Pinning) sont optionnelles et peuvent être activées à la demande du
client si leur niveau de sécurité l'exige.
 Signature HMAC
La signature HMAC (Hash-based Message Authentication Code) est une fonctionnalité
optionnelle qui permet de garantir l'intégrité et l'authenticité des requêtes échangées
https://docs.intech.sn/doc_intech_api.php
5/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
entre votre application et l'API Intech. Elle vient en complément du hash SHA256 par
INdéfaut.
TECH API V2
Principe de fonctionnement
 Menu principal
Clé HMAC partagée : Une clé secrète est partagée de manière sécurisée entre Intech
et votre application
28% terminé
Signatures bidirectionnelles :
Vos requêtes vers l'API Intech doivent inclure une signature HMAC
Les callbacks de l'API vers votre application incluent également une signature HMAC
Validation temporelle : Les signatures incluent un timestamp pour éviter les attaques
de replay

Configuration des headers pour vos requêtes
Lorsque la signature HMAC est activée, vos requêtes POST doivent inclure les headers
suivants :
HeaderDescriptionExemple
Hmac-SignatureSignature HMAC-SHA256 calculéeabc123def456...
TimestampTimestamp Unix en millisecondes1699548600000
apiKeyVotre clé API (dans le body de la requête)xxxxxx
Calcul de la signature HMAC
La signature HMAC est calculée selon cette formule :
 Copier
hmacData = httpMethod + ":" + timestamp + ":" + jsonBody
hmacSignature = HMAC-SHA256(hmacData, hmacSecretKey)
Exemple de calcul en JavaScript/Node.js
https://docs.intech.sn/doc_intech_api.php
6/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN TECH
API=V2
const crypto
require('crypto');
 Copier
 Menu principal

function calculateHMACSignature(httpMethod, timestamp, requestBody, hmac
// Convertir le body en JSON string
const bodyString = JSON.stringify(requestBody);
// Construire la chaîne à signer
const hmacData = `${httpMethod}:${timestamp}:${bodyString}`;
28% terminé
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
const signature = calculateHMACSignature(httpMethod, timestamp, requestB
console.log('HMAC Signature:', signature);
Exemple de requête avec signature HMAC
 Copier
curl -X POST "https://api.intech.sn/api-services/operation" \
-H "Content-Type: application/json" \
-H "Hmac-Signature: abc123def456789..." \
https://docs.intech.sn/doc_intech_api.php
7/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
-H "Timestamp: 1699548600000" \
-d '{
"apiKey": "votre_cle_api",
"phone": "221777777777",
 Menu principal
"amount": 1000,
"codeService": "FREE_SN_WALLET_CASH_IN",

"externalTransactionId": "TXN_001",
"urlIpn": "https://votre-site.com/callback"
}'
IN TECH API V2
28% terminé
Validation des callbacks avec HMAC (si activé)
Important : Par défaut, les callbacks Intech utilisent uniquement un hash SHA256 pour
la sécurité (voir section Callbacks/Webhooks). La signature HMAC pour les callbacks
est une fonctionnalité optionnelle qui doit être activée sur demande.
Si la signature HMAC est activée pour votre compte, les callbacks incluront une
signature HMAC que vous devez valider :
 Copier
// Exemple de validation d'un callback reçu
function validateCallbackHMAC(receivedSignature, timestamp, callbackBody
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
https://docs.intech.sn/doc_intech_api.php
8/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
// Comparaison sécurisée
if (expectedSignature !== receivedSignature) {
throw new Error('Invalid HMAC signature');
}
 Menu principal
IN TECH API V2

return true;
}
28% terminé
 Important - Gestion du timestamp
Les signatures HMAC incluent une validation temporelle. Par défaut, une
requête est considérée comme expirée après 5 minutes. Assurez-vous que
l'horloge de votre serveur est synchronisée.
 SSL Certificate Pinning
Le SSL Certificate Pinning (épinglage de certificat SSL) ajoute une couche de sécurité
supplémentaire pour les callbacks en vérifiant l'empreinte de la clé publique du
certificat SSL de votre serveur.
Principe de fonctionnement
Empreinte de clé publique : Intech stocke l'empreinte SHA256 de la clé publique de
votre certificat SSL
Vérification lors des callbacks : Chaque callback vérifie que le certificat SSL
correspond à l'empreinte stockée
Protection contre l'interception : Empêche les attaques man-in-the-middle même
avec des certificats SSL valides
Configuration
Pour activer le SSL Certificate Pinning :
1. Fournissez l'empreinte SHA256 de la clé publique de votre certificat SSL
https://docs.intech.sn/doc_intech_api.php
9/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
2. L'équipe technique Intech configure cette empreinte pour votre compte
3. Tous
les callbacks
IN
TECH
APIfuturs
V2 vérifieront automatiquement cette empreinte
Comment obtenir l'empreinte de votre certificat
 Menu principal

 Copier
# Méthode 1: En ligne de commande avec OpenSSL
28% terminé
openssl s_client -servername votre-domaine.com -connect votre-domaine.co
openssl x509 -pubkey -noout | \
openssl rsa -pubin -outform der 2>/dev/null | \
openssl dgst -sha256 -binary | \
openssl enc -base64
# Méthode 2: Depuis un fichier de certificat
openssl x509 -pubkey -noout -in certificat.pem | \
openssl rsa -pubin -outform der 2>/dev/null | \
openssl dgst -sha256 -binary | \
openssl enc -base64
Exemple en Node.js pour obtenir l'empreinte
 Copier
const https = require('https');
const crypto = require('crypto');
function getCertificateFingerprint(hostname, port = 443) {
return new Promise((resolve, reject) => {
const options = {
hostname: hostname,
port: port,
method: 'GET',
rejectUnauthorized: false
};
const req = https.request(options, (res) => {
const cert = res.socket.getPeerCertificate();
if (cert && cert.pubkey) {
const fingerprint = crypto
.createHash('sha256')
https://docs.intech.sn/doc_intech_api.php
10/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
.update(cert.pubkey)
.digest('base64');
resolve(fingerprint);
} else {
reject(new Error('Unable to get certificate'));
}
IN TECH API V2
 Menu principal

});
req.on('error', reject);
req.end();
28% terminé
});
}
// Utilisation
getCertificateFingerprint('votre-domaine.com')
.then(fingerprint => {
console.log('Empreinte SHA256:', fingerprint);
})
.catch(console.error);
 Renouvellement de certificat
Lors du renouvellement de votre certificat SSL, n'oubliez pas de
communiquer la nouvelle empreinte à l'équipe Intech pour éviter l'échec des
callbacks.
 Exemple complet avec sécurité renforcée
Voici un exemple d'intégration complète utilisant à la fois la signature HMAC et le SSL
Certificate Pinning :
 Copier
const express = require('express');
const crypto = require('crypto');
const app = express();
https://docs.intech.sn/doc_intech_api.php
11/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
app.use(express.json());
IN TECH
API V2
// principal
Configuration
 Menu

const HMAC_SECRET_KEY = 'votre_cle_hmac_secrete';
const EXPECTED_SSL_FINGERPRINT = 'votre_empreinte_ssl_base64';
// Middleware de validation HMAC pour les callbacks
function validateHMACSignature(req, res, next) {
const receivedSignature = req.headers['hmac-signature'];
const timestamp = req.headers['timestamp'];
28% terminé
if (!receivedSignature || !timestamp) {
return res.status(400).json({ error: 'Missing HMAC signature or
}
// Vérifier que le timestamp n'est pas expiré
const now = Date.now();
const requestTime = parseInt(timestamp);
const maxAge = 5 * 60 * 1000; // 5 minutes
if (now - requestTime > maxAge) {
return res.status(400).json({ error: 'Timestamp expired' });
}
// Calculer la signature attendue
const httpMethod = req.method;
const bodyString = JSON.stringify(req.body);
const hmacData = `${httpMethod}:${timestamp}:${bodyString}`;
const expectedSignature = crypto
.createHmac('sha256', HMAC_SECRET_KEY)
.update(hmacData)
.digest('hex');
if (expectedSignature !== receivedSignature) {
return res.status(403).json({ error: 'Invalid HMAC signature' })
}
next();
}
// Endpoint de callback sécurisé
https://docs.intech.sn/doc_intech_api.php
12/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
app.post('/intech-callback', validateHMACSignature, (req, res) => {
console.log('Callback reçu et validé:', req.body);
IN TECH API V2
// Traiter le callback...
 Menu principal
// Retourner un statut 200 pour confirmer la réception
res.status(200).json({ success: true });

});
28% terminé
// Fonction pour envoyer une requête avec signature HMAC
async function sendSecureRequest(endpoint, data) {
const httpMethod = 'POST';
const timestamp = Date.now().toString();
const bodyString = JSON.stringify(data);
const hmacData = `${httpMethod}:${timestamp}:${bodyString}`;
const hmacSignature = crypto
.createHmac('sha256', HMAC_SECRET_KEY)
.update(hmacData)
.digest('hex');
const response = await fetch(`https://api.intech.sn${endpoint}`, {
method: httpMethod,
headers: {
'Content-Type': 'application/json',
'Hmac-Signature': hmacSignature,
'Timestamp': timestamp
},
body: bodyString
});
return response.json();
}
app.listen(3000, () => {
console.log('Serveur démarré sur le port 3000');
});
https://docs.intech.sn/doc_intech_api.php
13/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Activation des fonctionnalités de sécurité
INTECH
API V2
Pour activer la signature HMAC et/ou le SSL Certificate Pinning sur votre compte,
contactez
principalle support technique Intech avec les informations suivantes :
 Menu

Votre ID de compte développeur
L'empreinte SHA256 de votre certificat SSL (si SSL Pinning souhaité)
Confirmation que vous avez implémenté la validation HMAC côté serveur
28% terminé
Lister tous les services (Route publique)
Liste tous les services disponibles sur l'API. Chaque service doit être activé pour le compte
développeur pour pouvoir l'utiliser.
GET
/api-services/services
Headers requis
HeaderValeurDescription
SecretkeyxxxxxxLa clé API secrète
Exemple de requête
 Copier
curl -X GET "https://api.intech.sn/api-services/services" \
-H "Secretkey: xxxxxx"
Exemple de réponse
https://docs.intech.sn/doc_intech_api.php
14/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN {TECH API V2
 Copier
"success": true,
"services": [
{
"name": "CashIn Free Money",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/free_sn.png"
28% terminé
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
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/free_sn.png"
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
 Menu principal

https://docs.intech.sn/doc_intech_api.php
15/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"typeOperation": "DEBIT",
"typeService": "CREDIT_TELEPHONIQUE"
IN TECH}, API V2
{
 Menu principal
"name": "Achat credit Expresso",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/expresso.png
"codeService": "EXPRESSO_SN_AIRTIME_CREDIT_TELEPHONIQUE",
"typeOperation": "DEBIT",
28% terminé
"typeService": "CREDIT_TELEPHONIQUE"

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
https://docs.intech.sn/doc_intech_api.php
16/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"typeService": "CASHOUT"
IN TECH},
API V2
{
 Menu principal"name": "CashOut Carte Bancaire",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/CB.png",
"codeService": "BANK_CARD_API_CASH_OUT",
"typeOperation": "CREDIT",
"typeService": "CASHOUT"

28% terminé
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
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/logo_woyofal
"codeService": "WOYOFAL_SN_BILL_RELOAD",
"typeOperation": "DEBIT",
"typeService": "BILL_BUY_RELOAD"
},
{
"name": "Sénélec",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/logo_senelec
"codeService": "SENELEC_SN_BILL_PAY",
"typeOperation": "DEBIT",
"typeService": "BILL_PAY"
},
{
"name": "SenEau",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/logo_sen_eau
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
https://docs.intech.sn/doc_intech_api.php
17/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
},
{
IN TECH API
V2
"name": "Oolu Solar",
 Menu principal"icon": "https://intech-apiv2.s3.amazonaws.com/icons/oolusoloar.p
"codeService": "OOLUSOLAR_SN_BILL_RELOAD",
"typeOperation": "DEBIT",
"typeService": "BILL_BUY_RELOAD"

},
{
28% terminé
"name": "Baobab Plus",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/baobapplus.p
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
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/aquatech.jpg
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
https://docs.intech.sn/doc_intech_api.php
18/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
{
"name": "WhatsApp Message",
IN TECH API
V2
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/WhatsApp.svg
 Menu principal"codeService": "WHATSAPP_MESSAGING",

"typeOperation": "DEBIT",
"typeService": "MESSENGING_SMS"
},
{
"name": "Virement Bancaire Sénégal",
"icon": "https://change.sn/assets/images/virement.png",
"codeService": "BANK_TRANSFER_SN_API_CASH_IN",
"typeOperation": "DEBIT",
"typeService": "CASHIN"
28% terminé
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
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/orange_ci_ai
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
https://docs.intech.sn/doc_intech_api.php
19/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"name": "CashOut Mtn Money CI",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci.png"
"codeService": "MTN_CI_API_CASH_OUT",
 Menu principal"typeOperation": "CREDIT",
"typeService": "CASHOUT"
},

{
"name": "Airtime Mtn CI",
28% terminé
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/mtn_ci_airti
"codeService": "MTN_CI_AIRTIME_CREDIT_TELEPHONIQUE",
"typeOperation": "DEBIT",
"typeService": "CREDIT_TELEPHONIQUE"
},
{
"name": "CashIn Moov Money CI",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci.png"
"codeService": "MOOV_CI_API_CASH_IN",
"typeOperation": "DEBIT",
"typeService": "CASHIN"
},
{
"name": "CashOut Moov Money CI",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci.png"
"codeService": "MOOV_CI_API_CASH_OUT",
"typeOperation": "CREDIT",
"typeService": "CASHOUT"
},
{
"name": "Airtime Moov CI",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/moov_ci_airt
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
IN TECH API V2
https://docs.intech.sn/doc_intech_api.php
20/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/mtn_ci.jpg",
"codeService": "MTN_CI_API_CASH_IN_2",
"typeOperation": "DEBIT",
 Menu principal"typeService": "CASHIN"
},
{

"name": "CashIn Wave Money CI",
"icon": "https://intech-apiv2.s3.amazonaws.com/icons/wave.png",
28% terminé
"codeService": "WAVE_CI_API_CASH_IN",
"typeOperation": "DEBIT",
"typeService": "CASHIN"
}
]
}
IN TECH API V2
Lister toutes les erreurs (Route publique)
Liste tous les codes d'erreur disponibles sur l'API avec leurs messages.
GET
/api-services/errors
Headers requis
HeaderValeurDescription
SecretkeyxxxxxxLa clé API secrète
Exemple de requête
 Copier
curl -X GET "https://api.intech.sn/api-services/errors" \
-H "Secretkey: xxxxxx"
https://docs.intech.sn/doc_intech_api.php
21/567/22/25, 9:19 PM
Exemple de réponse
IN TECH API V2
 Menu principal
Intech API V2 - Documentation Complète
 Copier
{

"success": true,
"services": [
{
28% terminé
"id": null,
"code": "unknown_error",
"message": "Votre opération n'a pas pu être traitée pour le momen
},
{
"id": 1,
"code": "invalid_phone_number",
"message": "Le numéro WAVE que vous avez saisie est incorrect"
},
{
"id": 2,
"code": "insufficient_balance",
"message": "Le solde de votre compte Orange Money ne vous permet
},
{
"id": 3,
"code": "logged-out-user-session",
"message": ""
},
{
"id": 4,
"code": "payment-timeout",
"message": "Le client n'a pas validé le paiement après 15 minutes
},
{
"id": 5,
"code": "no_om_account",
"message": "Le destinataire n'est pas un client Orange Money"
},
{
"id": 6,
"code": "exceeds-limit-time",
"message": "Vous venez d'envoyer le même montant au même destinat
},
{
https://docs.intech.sn/doc_intech_api.php
22/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"id": 11,
"code": "user_account_suspended",
"message": "Le compte Orange Money du client est suspendu"
IN TECH API V2
},
 Menu principal
{
"id": 12,
"code": "whatsapp_user_not_found",
"message": "Ce numéro n'a pas de compte WhatsApp"

},
{
28% terminé
"id": 14,
"code": "om_number_not_allowed",
"message": "Ce numéro n'est pas autorisé a fair des transaction O
},
{
"id": 15,
"code": "bad_amount_50",
"message": "Le montant pour ce service doit êre un multiple de 50
},
{
"id": 16,
"code": "bad_amount_100",
"message": "Le montant pour ce service doit êre un multiple de 10
},
{
"id": 17,
"code": "om_operator_internal_error",
"message": "L'opérateur Orange Money a eu une erreur interne. veu
},
{
"id": 18,
"code": "monthly_max_amount_cumul_reached",
"message": "Le bénéficiaire a atteint le montant maximum autorisé
},
{
"id": 19,
"code": "connexion_error",
"message": "Problème lors de la connexion au reseaux"
},
{
"id": 23,
"code": "no_om_account",
"message": "Le numero Orange Money est introuvable"
https://docs.intech.sn/doc_intech_api.php
23/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
},
{
IN TECH API
V2
"id": 24,
 Menu principal"code": "interval_max_amount_cumul_reached",
"message": "Le bénéficiaire a atteint le montant maximum autorisé

},
{
"id": 26,
28% terminé
"code": "insufficient_balance",
"message": "Le solde de votre compte ne vous permet pas d'effectu
},
{
"id": 28,
"code": "operator_down_time",
"message": "L'opérateur est momentanément indisponible"
},
{
"id": 29,
"code": "execution_error",
"message": "Erreur lors de l'execution de la requete"
},
{
"id": 37,
"code": "balance_check_failed",
"message": "Désolé, votre transaction n a pas aboutie. Prière vér
},
{
"id": 38,
"code": "bad_amount_5",
"message": "Le montant pour ce service doit êre un multiple de 5
},
{
"id": 39,
"code": "no_mtn_account",
"message": "Le destinataire n'est pas un client Mtn Money"
},
{
"id": 43,
"code": "pos_already_connected",
"message": "Problème lors de la connexion au reseaux"
}
https://docs.intech.sn/doc_intech_api.php
24/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
]
IN }TECH API V2
 Menu principal

Tous les codes d'erreur (43 codes)
28% terminé
IDCodeMessage
nullunknown_errorVotre opération n'a pas pu être traitée
pour le moment, réessayez plus tard.
1invalid_phone_numberLe numéro WAVE que vous avez saisie est
incorrect
2insufficient_balanceLe solde de votre compte Orange Money
ne vous permet pas d'effectuer un
paiement de __amount__ CFA
3logged-out-user-session4payment-timeoutLe client n'a pas validé le paiement après
15 minutes
5no_om_accountLe destinataire n'est pas un client Orange
Money
exceeds-limit-timeVous venez d'envoyer le même montant
au même destinataire. Si vous souhaitez
répéter la transaction, veuillez patienter
quelques minutes.
9, 23no_om_accountLe destinataire n'est pas un client Orange
Money / Le numero Orange Money est
introuvable
11user_account_suspendedLe compte Orange Money du client est
suspendu
6, 7, 8,
20, 21
https://docs.intech.sn/doc_intech_api.php
25/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IDCodeMessage
12whatsapp_user_not_foundCe numéro n'a pas de compte WhatsApp
14om_number_not_allowedCe numéro n'est pas autorisé a fair des
transaction Orange Money
15bad_amount_5028% terminé
Le montant pour ce service doit êre
un
multiple de 50 CFA
16bad_amount_100Le montant pour ce service doit êre un
multiple de 100 CFA
17om_operator_internal_errorL'opérateur Orange Money a eu une
erreur interne. veuillez ressayez
18, 22,
27, 36,
40, 42monthly_max_amount_cumul_reachedLe bénéficiaire a atteint le montant
maximum autorisé par mois.
IN TECH API V2
 Menu principal

19, 43
24, 25,
41
connexion_error /
pos_already_connected
Problème lors de la connexion au reseaux
interval_max_amount_cumul_reachedLe bénéficiaire a atteint le montant
maximum autorisé
26insufficient_balanceLe solde de votre compte ne vous permet
pas d'effectuer un paiement de
__amount__ CFA
28operator_down_timeL'opérateur est momentanément
indisponible
29-35execution_errorErreur lors de l'execution de la requete
37balance_check_failedDésolé, votre transaction n a pas aboutie.
Prière vérifier votre solde puis réessayer.
38bad_amount_5Le montant pour ce service doit êre un
multiple de 5 CFA
https://docs.intech.sn/doc_intech_api.php
26/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
ID
Code
Message
IN TECH API V2
Le destinataire n'est pas un client Mtn
Money
39
no_mtn_account
 Menu principal

Vérifier le solde
28% terminé
Obtenir le solde du compte développeur.
GET
/api-services/balance
Headers requis
HeaderValeurDescription
Secretkey{{api_key}}La clé API secrète
Exemple de requête
 Copier
curl -X GET "https://api.intech.sn/api-services/balance" \
-H "Secretkey: {{api_key}}"
Exemple de réponse
 Copier
{
"code": 2000,
"msg": "Successfully operation",
"error": false,
"data": {
"currency": "XOF",
https://docs.intech.sn/doc_intech_api.php
27/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"balance": 9938
}
IN }TECH
API V2
 Menu principal

Lister les factures impayées
28% terminé
Liste les factures impayées pour un numéro de compte donné. Le accountNumber est
l'identifiant de l'entité dont on veut payer la facture.
POST
/api-services/list-pending-bills
Description détaillée
Pour tous les services avec un code contenant le suffixe _BILL_PAY, vous devez appeler
cette ressource avant d'effectuer toute transaction.
Le développeur doit lister toutes les factures impayées au client. Une fois que le client choisit
la facture qu'il veut payer, alors api-services/operation peut être appelé avec les
champs billReference qui est la référence de la facture choisie de la liste des factures
impayées, et accountNumber qui a été donné à l'étape 1.
Signification de accountNumber selon le service
ServiceCode ServiceaccountNumber représente
SenelecSENELEC_SN_BILL_PAYNuméro de contrat client
SenEauSENEAU_SN_BILL_PAYRéférence client
UCADUCAD_SN_BILL_PAYNuméro de carte étudiant UCAD
UVSUVS_SN_BILL_PAYNuméro de carte étudiant UVS
AquatechAQUATECH_SN_BILL_PAYRéférence client sur la facture
https://docs.intech.sn/doc_intech_api.php
28/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Corps de la requête
IN TECH API V2
Paramètre
 Menu principalTypeObligatoireDescription
apiKey
stringOuiVotre clé API
codeServicestringOuiCode du service de facturation
billAccountNumberstringOuiNuméro de compte/contrat/référence
28% terminé
Exemple de requête - SENELEC
 Copier
{
"apiKey": "{{api_key}}",
"codeService": "SENELEC_SN_BILL_PAY",
"billAccountNumber": "21050176023"
}
Exemple de requête - SENEAU
 Copier
{
"apiKey": "{{api_key}}",
"codeService": "SENEAU_SN_BILL_PAY",
"billAccountNumber": "106032682913"
}
Exemple de réponse - Succès
 Copier
{
"code": 2000,
"msg": "1 en attente(s) non payée pour cette facture",
https://docs.intech.sn/doc_intech_api.php
29/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"error": false,
"data": {
"status": "SUCCESS",
"pendingBills": {
 Menu principal
"success": true,
"pendingBills": [

{
"amount": 27684,
"billReference": "1062208013069",
"infos": [
{
"label": "Nom client",
"value": "KOKOU M DELA RDC EZI"
},
{
"label": "Date d'échéance",
"value": "29/08/22"
}
]
}
]
}
}
}
IN TECH API V2
28% terminé
Exemple de réponse - Échec
 Copier
{
"code": 4000,
"msg": "Désolé, vous ne pouvez pas payer cette facture , vous avez une fa
"error": false,
"data": {
"status": "FAILLED",
"pendingBills": []
}
}
https://docs.intech.sn/doc_intech_api.php
30/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Effectuer
une transaction
IN TECH API V2
Initier une transaction pour différents services (voir Liste tous les services).
 Menu principal

POST
/api-services/operation
28% terminé
Champs obligatoires pour toutes les transactions
 Copier
{
"phone": "772457199",
"amount": 100,
"codeService": "RAPIDO_SN_BILL_RELOAD",
"externalTransactionId": "C898soe.d09ksssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": "{}" // (OPTIONNEL, Doit être une chaîne JSON sérialisée qui sera i
}
 Format international du téléphone
Certains services comme BANK_CARD_API_CASH_OUT ou WHATSAPP_MESSAGING
nécessitent que phone soit au format international (doit inclure le code d'appel de
la zone) par exemple +221772457199
Champs personnalisés par service
Chaque service peut avoir ses champs requis personnalisés. Tous les services qui
nécessitent des champs personnalisés ont un exemple attaché dans la section exemple de
cette ressource.
Services nécessitant accountNumber
Pour les services nécessitant accountNumber, accountNumber représente les valeurs
suivantes :
https://docs.intech.sn/doc_intech_api.php
31/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
ServiceaccountNumber représente
SENEAU
 Menu principalRéférence client présente sur la facture
SENELECNuméro de contrat présent sur la facture
UCADNuméro de carte étudiant Ucad
UVSNuméro de carte étudiant UVS
AQUATECHRéférence client sur la facture
XEWEULNuméro de carte Xeweul
RAPIDONuméro de carte Rapido
WOYOFALNuméro de compteur Woyofal
BAOBAB PLUSNuméro d'unité client Baobab plus
DER/FJNuméro de carte d'identité du client
OOLU SOLARNuméro de compte OoluSolar
IN TECH API V2

28% terminé
Réponse de succès (code === 2000)
Si la transaction a été initiée avec succès, l'API retourne json avec le champ code === 2000
 Copier
{
"code": 2000,
"msg": "Votre opération s'est effectuée sans erreur, Vous allez recevoir
"error": false,
"data": {
"phone": "221772457199",
"amount": 1000,
"codeService": "BANK_CARD_API_CASH_OUT",
"transactionId": "7091659672946",
"status": "PENDING",
"externalTransactionId": "C898.09S9sdszssssd8sd",
https://docs.intech.sn/doc_intech_api.php
32/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"callbackUrl": "https://secure-3ds.intech.sn/ping"
}
IN }TECH
API V2
 Menu principal

 Important
28% terminé
À ce stade, vous devez écouter l'appel de callback URL pour être informé du
statut final de la transaction.
Champs supplémentaires dans la réponse
Certains services peuvent retourner des champs supplémentaires dans le champ data
nécessaires pour réaliser la transaction.
Exemple pour BANK_CARD_API_CASH_OUT
L'URL de la page d'authentification 3DSECURE du client est retournée :
 Copier
{
"code": 2000,
"msg": "Votre opération s'est effectuée sans erreur, Vous allez recevoir
"error": false,
"data": {
"phone": "221772457199",
"amount": 1000,
"codeService": "BANK_CARD_API_CASH_OUT",
"transactionId": "7091659672946",
"status": "PENDING",
"externalTransactionId": "C898.09S9sdszssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"notificationMessage": "Bonjour, cliquez sur le lien suivant pour val
"authLinkUrl": "http://localhost:6050/deep/7091659672946",
"orderId": "INTECHV2-BK-7091659672946"
}
}
https://docs.intech.sn/doc_intech_api.php
33/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Exemple pour WAVE_SN_API_CASH_OUT
IN
TECH API V2
Une URL de lien profond est retournée que le développeur devrait afficher à l'utilisateur :
 Menu principal
 Copier

{
"code": 2000,
28% terminé
"msg": "Votre opération s'est effectuée sans erreur, Vous allez recevoir
"error": false,
"data": {
"phone": "772457199",
"amount": 1000,
"codeService": "WAVE_SN_API_CASH_OUT",
"transactionId": "139663910423",
"status": "PENDING",
"externalTransactionId": "C898.09S9sszsssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"notificationMessage": "Bonjour, cliquez sur le lien suivant pour val
"deepLinkUrl": "https://api.intech.sn/deep/139663910423"
}
}
Réponse d'erreur (code !== 2000)
Tous les code !== 2000 signifient que l'initiation de la transaction a échoué. Selon si la
transaction a été créée en interne, le développeur peut recevoir un appel de callback
avec le statut FAILLED
 Copier
{
"code": 4000,
"msg": "Le solde de votre compte Orange Money ne vous permet pas d'effect
"error": true,
"data": {
"phone": "772457199",
"amount": 200000,
"codeService": "ORANGE_SN_API_CASH_OUT",
"transactionId": "5650516153453",
"status": "FAILLED",
https://docs.intech.sn/doc_intech_api.php
34/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"externalTransactionId": "Cx8SSsdssddekjhsdsseeGsdsedssssjsdk9sksd8.8
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"errorType": {
 Menu principal"id": 2,
"codeService": "ORANGE_SN_API_CASH_OUT",
"code": "insufficient_balance",

"message": "Le solde de votre compte Orange Money ne vous permet
}
28% terminé
}
}
IN TECH API V2
Exemples de transactions - Cash In
WAVE_SN_API_CASH_IN
 Copier
{
"phone": "772457199",
"amount": 5,
"codeService": "WAVE_SN_API_CASH_IN",
"externalTransactionId": "C898l.s09dS9dddd.dddkdskddh.hhssdsd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {}
}
ORANGE_SN_API_CASH_IN
 Copier
{
"phone": "772450000",
"amount": 350,
"codeService": "ORANGE_SN_API_CASH_IN",
"externalTransactionId": "C898.09S9ssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
https://docs.intech.sn/doc_intech_api.php
35/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"apiKey": "{{api_key}}",
"data": {}
IN }TECH API V2
 Menu principal

BANK_TRANSFER_SN_API_CASH_IN
28% terminé
 Copier
{
"phone": "221772450000",
"amount": 1351,
"codeService": "BANK_TRANSFER_SN_API_CASH_IN",
"externalTransactionId": "C898.09S9s8d",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {},
"customerFirstName": "Moussa",
"customerLastName": "Ndour",
"customerEmail": null,
"rib": "SN000 00000 000000000000 00",
"operationDescription": "Achat MacBook Air sur CouchTech"
}
WIZALL_SN_API_CASH_IN
 Copier
{
"phone": "772450000",
"amount": 1350,
"codeService": "WIZALL_SN_API_CASH_IN",
"externalTransactionId": "C898.09S9sd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {}
}
https://docs.intech.sn/doc_intech_api.php
36/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Exemples
de transactions - Cash Out
IN TECH API V2
 Menu principal
WAVE_SN_API_CASH_OUT

 Copier
{
28% terminé
"phone": "772457199",
"amount": 1350,
"codeService": "WAVE_SN_API_CASH_OUT",
"externalTransactionId": "C898.09S9sd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"sender": "CouTech",
"successRedirectUrl": "https://paytech.sn/wave_redirect_success",
"errorRedirectUrl": "https://paytech.sn/wave_redirect_error"
}
ORANGE_SN_API_CASH_OUT
 Copier
{
"phone": "772450000",
"amount": 150,
"codeService": "ORANGE_SN_API_CASH_OUT",
"externalTransactionId": "C898.09S9ssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {},
"useOMQrCode": true,
"sender": "CouTech",
"successRedirectUrl": "https://paytech.sn/orange_redirect_success",
"errorRedirectUrl": "https://paytech.sn/orange_redirect_error"
}
BANK_CARD_API_CASH_OUT
https://docs.intech.sn/doc_intech_api.php
37/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN {TECH API V2
"phone": "221772450000",
"amount": 1351,
"codeService": "BANK_CARD_API_CASH_OUT",
"externalTransactionId": "C898.09S9s8d",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {},
"bankAuthRedirectUrl": "https://secure-3ds.intech.sn/ping",
"customerFirstName": "Moussa",
"customerLastName": "Ndour",
"customerEmail": null,
"cardNumber": "599735xx9xx130",
"cardExpireMonth": "09",
"cardExpireYear": "22",
"cardCVC": "920",
"cardType": "MASTERCARD",
"merchantName": "CouchTech",
"operationDescription": "Achat MacBook Air sur CouchTech",
"successRedirectUrl": "https://domaine.sn/bank_redirect_success",
"errorRedirectUrl": "https://domaine.sn/bank_redirect_error"
 Copier
 Menu principal

28% terminé
}
WIZALL_SN_API_CASH_OUT
 Copier
{
"phone": "772450000",
"amount": 1350,
"codeService": "WIZALL_SN_API_CASH_OUT",
"externalTransactionId": "C898.09S9sd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {}
}
https://docs.intech.sn/doc_intech_api.php
38/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Exemples
de transactions - WhatsApp
IN TECH API V2
Messaging
Menu principal

WHATSAPP_MESSAGING

28% terminé
 Copier
{
"phone": "+221772450000",
"codeService": "WHATSAPP_MESSAGING",
"externalTransactionId": "C89s8.09S9ssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"apiKey": "{{api_key}}",
"data": {},
"message": "Hello Word from Postman",
"attachedMediaExtension": ".png",
"attachedMediaName": "Document Name",
"attachedMedia": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAA..."
}
Réponse WhatsApp
 Copier
{
"code": 2000,
"msg": "Le message a bien été envoyé a 221772450000@c.us (+221772450000)"
"error": false,
"data": {
"phone": "+221772450000",
"amount": 1150,
"codeService": "WHATSAPP_MESSAGING",
"transactionId": "7291680498244",
"status": "PENDING",
"externalTransactionId": "C898sosezdlsk.ld0s9ksssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"errorType": null
https://docs.intech.sn/doc_intech_api.php
39/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
}
IN }TECH API V2
 Menu principal

Obtenir le statut d'une transaction
(Ressource limitée - lire la note)
28% terminé
 ATTENTION IMPORTANTE
Appeler cette ressource plus de 3 fois par minute pour la même transaction peut
entraîner la mise sur liste noire de votre adresse IP. Ne spammez pas !
POST
/api-services/get-transaction-status
Valeurs de statut possibles
 Copier
FAILLED|SUCCESS|PENDING|REFUNDED|PROCESSING|CANCELED
Corps de la requête
 Copier
{
"externalTransactionId": "C89sdjz8zvslljzsse0eek1sfm9lkmdsddkssklkkkjllde
}
Exemple de réponse - Transaction échouée
https://docs.intech.sn/doc_intech_api.php
40/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN {TECH API V2
 Copier
"code": 2000,
"msg": "Successfully operation",
"error": false,
"data": {
"transactionId": 205818,
28% terminé
"createdAt": "2022-10-17T18:07:58.000Z",
"updatedAt": "2022-10-17T18:08:55.000Z",
"externalTransactionId": "C89sdjz8zvslljzsse0eek1sfm9lkmdsddkssklkkkj
"status": "FAILLED",
"errorType": {
"code": "invalid_phone_number",
"message": "Service momentanement indisponible, veuillez reessaye
}
}
 Menu principal

}
Exemple de réponse - Transaction réussie
 Copier
{
"code": 2000,
"msg": "Successfully operation",
"error": false,
"data": {
"transactionId": 197872,
"createdAt": "2022-10-04T12:21:18.000Z",
"updatedAt": "2022-10-04T12:21:57.000Z",
"externalTransactionId": "C89sdjz8zvslljzezr0eeksfm9lskmdlsdddkfklekk
"status": "SUCCESS",
"errorType": null
}
}
https://docs.intech.sn/doc_intech_api.php
41/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Créer
une réclamation
IN TECH API V2
Créer une réclamation pour une transaction via l'API.
 Menu principal

POST
/api-services/new-claim
28% terminé
Corps de la requête
 Copier
{
"subject": "Subject Here",
"message": "Hi customer...",
"transactionId": "T560863528274",
"apiKey": "{{api_key}}"
}
Exemple de réponse
 Copier
{
"code": 2000,
"msg": "Successfully operation",
"error": false,
"data": {
"claim": {
"statut": "OPENED",
"subject": "Subject Here",
"message": "Hi customer...",
"transactionId": 102453,
"openedAt": "2022-09-15T15:03:27.339Z",
"createdAt": "2022-09-15T15:03:27.339Z",
"partenersId": 1,
"claimRef": "C98662712961324",
"comment": null,
"callbackUrl": null,
"userIdOpen": null,
https://docs.intech.sn/doc_intech_api.php
42/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"userIdClose": null,
"userIdComment": null,
"updatedAt": null,
 Menu principal"closeAt": null,
"id": 1,
"state": "ACTIVED"

}
}
}
IN TECH API V2
28% terminé
Remboursement/Annulation de transaction
POST
/api-services/transaction/refund-cancel
Corps de la requête
 Copier
{
"apiKey": "{{api_key}}",
"transactionId": "T98010948524802"
}
Exemple de réponse
 Copier
{
"message": "Le transaction Kpay de 50 CFA a bien été remboursé",
"statutTreatment": "SUCCESS"
}
https://docs.intech.sn/doc_intech_api.php
43/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Vérifier
le numéro de référence MoneyGram
IN TECH API V2
 Menu principal
POST
/api-services/moneygram-reception-info

Corps de la requête
28% terminé
 Copier
{
"apiKey": "{{api_key}}",
"codeService": "MONEYGRAM_SN_API_CASH_OUT",
"referenceNumber": "89163605"
}
Exemple de réponse
 Copier
{
"code": 2000,
"msg": "OK",
"error": false,
"data": {
"status": "SUCCESS",
"referenceNumberResponse": {
"doCheckIn": false,
"timeStamp": "2025-03-11T04:12:51.780Z",
"flags": 1,
"mgiTransactionSessionID": "4381702711E1741666579406",
"senderFirstName": "MOUSSA",
"senderLastName": "NDOUR",
"senderHomePhone": "772457199",
"receiverFirstName": "AICHA",
"receiverLastName": "DIALLO",
"agentCheckNumber": "0000000000",
"agentCheckAmount": "10000.000",
"agentCheckAuthorizationNumber": "00000",
"customerCheckNumber": "0000000000",
https://docs.intech.sn/doc_intech_api.php
44/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"customerCheckAmount": "0.000",
"okForAgent": false,
"deliveryOption": "WILL_CALL",
 Menu principal"transactionStatus": "AVAIL",
"dateTimeSent": "2025-03-11T03:43:43.583Z",
"receiveCurrency": "XOF",

"receiveAmount": "10000",
"referenceNumber": "89163605",
"originatingCountry": "SEN",
"validIndicator": false,
"indicativeReceiveAmount": "0",
"indicativeExchangeRate": "0.000000",
"expectedDateOfDelivery": "2025-03-11T00:00:00.000Z",
"originalSendAmount": "10000.000",
"originalSendCurrency": "XOF",
"originalSendFee": "300.000",
"originalExchangeRate": "1.000000",
"redirectIndicator": false,
"okForPickup": true,
"notOkForPickupReasonCode": 0,
"minutesUntilOkForPickup": "0",
"sendPurposeOfTransaction": "GIFT"
}
}
}
IN TECH API V2
28% terminé
Vérifier les informations MoneyGram et
obtenir les frais
POST
/api-services/moneygram-send-info
Corps de la requête
 Copier
{
"apiKey": "{{api_key}}",
https://docs.intech.sn/doc_intech_api.php
45/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
"codeService": "MONEYGRAM_SN_API_CASH_IN",
"amount": 3000,
"moneygramSendData": {
"senderDetails": {
 Menu principal
"senderFirstName": "Moussa",
"senderLastName": "Ndour",

"senderAddress": "123 Main Street",
"senderCity": "Dakar",
"senderHomePhone": "772457199",
"senderCountry": "SEN",
"senderPhoneNumber": "772457199",
"sendCurrency": "XOF",
"senderCitizenshipCountry": "SEN",
"sendPurposeOfTransaction": "GIFT",
"senderPhotoIdNumber": "1672282828282",
"senderPhotoIdCountry": "SEN",
"senderBirthCountry": "SEN",
"senderDOB": "1993-05-15",
"senderHomePhoneCountryCode": "221",
"senderPhotoIdType": "GOV",
"senderGender": "MALE",
"deliveryOption": "WILL_CALL",
"agentConsumerID": "USER1234",
"agentTransactionId": "TYTATTATATA"
},
"receiverDetails": {
"receiverFirstName": "Aicha",
"receiverLastName": "Diallo",
"receiverPhoneNumber": "772457199",
"receiverPhoneCountryCode": "221",
"receiveCountry": "SEN",
"receiveCurrency": "XOF",
"receiverAddress": "Almadies",
"receiverCity": "Dakar"
}
}
}
IN TECH API V2
28% terminé
Exemple de réponse
https://docs.intech.sn/doc_intech_api.php
46/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN {TECH API V2
 Copier
"code": 2000,
"msg": "OK",
"error": false,
"data": {
"status": "SUCCESS",
28% terminé
"success": true,
"sendValidationResponse": {
"doCheckIn": false,
"timeStamp": "2025-03-17T23:14:28.621Z",
"flags": 1,
"mgiTransactionSessionID": "30138511E174225326301529360345NN",
"readyForCommit": true,
"receiveAgentAddress": null,
"sendAmounts": {
"sendAmount": "3000",
"sendCurrency": "XOF",
"totalSendFees": "90",
"totalDiscountAmount": "0",
"totalSendTaxes": "0",
"totalAmountToCollect": "3090",
"detailSendAmounts": [
{
"amountType": "nonMgiSendTax",
"amount": "0",
"amountCurrency": "XOF"
},
{
"amountType": "nonMgiSendFee",
"amount": "0",
"amountCurrency": "XOF"
},
{
"amountType": "mgiNonDiscountedSendFee",
"amount": "90",
"amountCurrency": "XOF"
},
{
"amountType": "totalNonDiscountedFees",
"amount": "90",
"amountCurrency": "XOF"
},
 Menu principal

https://docs.intech.sn/doc_intech_api.php
47/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
{
IN TECH API V2
 Menu principal
"amountType": "discountedMgiSendFee",
"amount": "90",
"amountCurrency": "XOF"
},
{

"amountType": "mgiSendTax",
"amount": "0",
"amountCurrency": "XOF"
28% terminé
},
{
"amountType": "totalMgiCollectedFeesAndTaxes",
"amount": "90",
"amountCurrency": "XOF"
},
{
"amountType": "totalAmountToMgi",
"amount": "3090",
"amountCurrency": "XOF"
},
{
"amountType": "totalSendFeesAndTaxes",
"amount": "90",
"amountCurrency": "XOF"
},
{
"amountType": "totalNonMgiSendFeesAndTaxes",
"amount": "0",
"amountCurrency": "XOF"
}
]
},
"receiveAmounts": {
"receiveAmount": "3000",
"receiveCurrency": "XOF",
"validCurrencyIndicator": true,
"payoutCurrency": "XOF",
"totalReceiveFees": "0",
"totalReceiveTaxes": "0",
"totalReceiveAmount": "3000",
"receiveFeesAreEstimated": false,
"receiveTaxesAreEstimated": false,
"detailReceiveAmounts": [
https://docs.intech.sn/doc_intech_api.php
48/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
{
IN TECH API V2
 Menu principal
"amountType": "mgiReceiveFee",
"amount": "0",
"amountCurrency": "XOF"
},
{

"amountType": "nonMgiReceiveFee",
"amount": "0",
"amountCurrency": "XOF"
28% terminé
},
{
"amountType": "mgiReceiveTax",
"amount": "0",
"amountCurrency": "XOF"
},
{
"amountType": "nonMgiReceiveTax",
"amount": "0",
"amountCurrency": "XOF"
}
]
},
"exchangeRateApplied": "1.000000",
"receiveFeeDisclosureText": false,
"receiveTaxDisclosureText": false
},
"errorMessage": null
}
}
Appel de callback
Lorsqu'une transaction est créée et que son statut change, nos serveurs envoient un
Callback en appelant une URL de notification située sur vos serveurs.
 Important
Le développeur doit créer une callback url dans son backend qui est soumise
https://docs.intech.sn/doc_intech_api.php
49/567/22/25, 9:19 PM
IN
Intech API V2 - Documentation Complète
lors de l'initiation d'une nouvelle transaction, puis cette URL sera appelée chaque
fois qu'uneAPI
transaction
TECH
V2 a été traitée.
 Menu principal
 Note

Le callback peut être reçu avant la réponse initiale de la transaction, donc le
développeur doit utiliser externalTransactionId pour faire correspondre l'appel
determiné
28%
callback à sa transaction interne.
Spécifications du callback
Doit être une ressource POST
Les données suivantes seront postées au callback
Exemple de callback - Transaction réussie
 Copier
{
"msg": "Opération de DEBIT par Recharge Rapido Wave",
"status": "SUCCESS",
"sha256Hash": "d0dc6fcc72aff93c3f7c6d6ec09752730f3640526ab51c4872968974d317
"transaction": {
"phone": "772457199",
"amount": 100,
"codeService": "RAPIDO_SN_BILL_RELOAD",
"nameService": "Recharge Rapido",
"commission": 0,
"transactionId": "2313499724668",
"sousServiceTransactionId": "CI220912.2324.A84033",
"currentBalance": 2332.0625,
"balanceBeforeTransactionInit": 2534.5625,
"balanceAfterTransactionInit": 2332.0625,
"externalTransactionId": "C898soe.09ksssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"errorType": null,
"data": {
"my_custom_field_posted_when_initaing_transaction1": "some_value"
}
https://docs.intech.sn/doc_intech_api.php
50/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
}
IN }TECH API V2
 Menu principal
Exemple
de callback - Transaction échouée

28% terminé
 Copier
{
"msg": "Opération de DEBIT par Recharge Rapido Wave",
"status": "FAILLED",
"sha256Hash": "d0dc6fcc72aff93c3f7c6d6ec09752730f3640526ab51c4872968974d317
"transaction": {
"phone": "772457199",
"amount": 100,
"codeService": "RAPIDO_SN_BILL_RELOAD",
"nameService": "Recharge Rapido",
"commission": 0,
"transactionId": "6584079423914",
"sousServiceTransactionId": "T_ND2CME73XA",
"currentBalance": 2332.0625,
"balanceBeforeTransactionInit": 2534.5625,
"balanceAfterTransactionInit": 2332.0625,
"externalTransactionId": "C898soe.d09ksssssd8sd",
"callbackUrl": "https://secure-3ds.intech.sn/ping",
"errorType": {
"message": "Message Description Here",
"code": "error_code",
"codeService": "",
"id": 0
},
"data": {
"my_custom_field_posted_when_initaing_transaction1": "some_value"
}
}
}
Vérification du callback
Le développeur doit vérifier le champ status. Il peut avoir deux valeurs :
https://docs.intech.sn/doc_intech_api.php
51/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
SUCCESS - signifie que la transaction a été traitée avec succès
FAILLED
(avec 2 API
L) - signifie
IN
TECH
V2 que la transaction a échoué
 Menu principal
 NB (IMPORTANT)

• Le champ data est automatiquement analysé en objet JSON, pas besoin
d'appeler json_decode ou JSON.parse dessus
• Votre URL de callback doit retourner le CODE HTTP 200. Tout autre code !=28%
determiné
HTTP 200 est considéré comme une erreur, l'appel de callback est appelé à
nouveau (retry). Le retry est effectué après 1 minute de délai
• Même si le callback n'est normalement appelé qu'une seule fois, le développeur
devrait ignorer tous les appels de callback ultérieurs pour éviter de traiter une
transaction deux fois sur son backend.
Vérification de l'authenticité du callback
Le développeur doit vérifier que l'appel de callback provient d'Intech APIs.
Pour vérifier qu'INTECH a envoyé les données à votre serveur, vous devez comparer la
réponse sha256Hash avec le hash que vous allez construire.
 Sécurité avancée disponible
En plus de cette vérification SHA256 par défaut, des fonctionnalités de sécurité
avancées sont disponibles (signatures HMAC + SSL Certificate Pinning). Consultez
la section Sécurité Avancée pour plus de détails.
🔒
Formule du hash
 Copier
Hash = SHA256(transactionId|externalTransactionId|appKey)
Exemple JavaScript
https://docs.intech.sn/doc_intech_api.php
52/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN const
TECH
API V2
sha256Hash
= sha256(
 Copier
`${transactionId}|${externalTransactionId}|${appKey}`,
 Menu principal
)

Où :
28% terminé
transactionId est retourné de l'appel d'initiation de transaction
externalTransactionId est soumis lors de la création de la transaction par le développeur
appKey est l'appKey utilisée lors de la création de la transaction
Exemple de contrôleur
 Copier
// exemple de pseudo-code
class TransactionController {
callback(request, response) {
const postData = request.all(); // json POST DATA
const apiKey = process.env.INTECH_API_KEY;
const sha256Hash = sha256(`${postData?.transaction?.transactionId}|${
if (sha256Hash && sha256Hash === postData.sha256Hash)) {
//from INTECH
const myTransaction = DB.getRepository(Transaction).find({
intechTransactionId: postData?.transaction?.transactionId
});
if (postData.status === 'SUCCESS') {
// Transaction SUCCESS
} else if (postData.status === 'FAILLED') {
// Transaction FAILLED
}
res.end('OK');
}
else {
return response.send('Not from Intech')
}
}
}
https://docs.intech.sn/doc_intech_api.php
53/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
IN TECH API V2
Testez directement les endpoints de l'API Intech depuis cette interface.
 Menu principal

Interface de test interactive
28% terminé
Choisir un endpoint :
GET /api-services/services
Clé API :
Entrez votre clé API
 Tester l'API
Services Cash In disponibles
FREE_SN_WALLET_CASH_IN
EXPRESSO_SN_WALLET_CASH_IN
WAVE_SN_API_CASH_INWIZALL_SN_API_CASH_IN
ORANGE_CI_API_CASH_INMTN_CI_API_CASH_IN
ORANGE_SN_API_CASH_IN
BANK_TRANSFER_SN_API_CASH_IN
MOOV_CI_API_CASH_IN
MTN_CI_API_CASH_IN_2
WAVE_CI_API_CASH_IN
Services Cash Out disponibles
FREE_SN_WALLET_CASH_OUT
EXPRESSO_SN_WALLET_CASH_OUT
WAVE_SN_API_CASH_OUTWIZALL_SN_API_CASH_OUT
ORANGE_CI_API_CASH_OUTMTN_CI_API_CASH_OUT
https://docs.intech.sn/doc_intech_api.php
ORANGE_SN_API_CASH_OUT
BANK_CARD_API_CASH_OUT
MOOV_CI_API_CASH_OUT
MTN_CI_API_CASH_OUT_2
54/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Services
de crédit téléphonique
IN TECH API V2
ORANGE_SN_AIRTIME_CREDIT_TELEPHONIQUE
FREE_SN_AIRTIME_CREDIT_TELEPHONIQUE
 Menu principal
EXPRESSO_SN_AIRTIME_CREDIT_TELEPHONIQUE
ORANGE_CI_AIRTIME_CREDIT_TELEPHONIQUE

MTN_CI_AIRTIME_CREDIT_TELEPHONIQUE
MOOV_CI_AIRTIME_CREDIT_TELEPHONIQUE
28% terminé
Services de paiement de factures
SENELEC_SN_BILL_PAY
SENEAU_SN_BILL_PAY
AQUATECH_SN_BILL_PAY
UVS_SN_BILL_PAY
UCAD_SN_BILL_PAY
Services de recharge prépayés
RAPIDO_SN_BILL_RELOAD
WOYOFAL_SN_BILL_RELOAD
OOLUSOLAR_SN_BILL_RELOAD
XEWEUL_SN_BILL_RELOAD
BAOBAP_PLUS_SN_BILL_RELOAD
DER_FJ_SN_BILL_RELOAD
Service de messagerie
WHATSAPP_MESSAGING
Support et communauté
 Discord WhatsApp
Rejoignez notre serveur Discord pour
obtenir de l'aide en temps réelSupport direct via WhatsApp
+221 77 245 71 99
https://docs.intech.sn/doc_intech_api.php
55/567/22/25, 9:19 PM
Intech API V2 - Documentation Complète
Rejoindre Discord
IN TECH API V2
 Menu principal

 Collection Postman
28% terminé
Téléchargez la collection complète
pour tester l'API
Télécharger
https://docs.intech.sn/doc_intech_api.php
56/56