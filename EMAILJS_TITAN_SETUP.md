# Configuration EmailJS avec Titan/Hostinger

## 🚀 Configuration avec votre email professionnel

### 1. Créer un compte EmailJS (gratuit)
1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up Free"
3. Créez votre compte

### 2. Ajouter votre email Titan comme service SMTP

1. Dans le dashboard EmailJS, cliquez sur "Email Services"
2. Cliquez sur "Add New Service"
3. **Choisissez "SMTP" (pas Gmail)**
4. Nommez le service (ex: "Nooraya Titan")
5. Configurez les paramètres SMTP de Titan :

**Configuration SMTP Titan/Hostinger :**
```
Service Name: Nooraya Titan
Host: smtp.titan.email
Port: 587
Username: contact@noorayagroup.com
Password: [Votre mot de passe email Titan]
Secure: TLS (cochez la case)
```

6. Cliquez sur "Add Service"
7. **Copiez le Service ID** (ex: service_abc123)

### 3. Créer un template d'email

1. Cliquez sur "Email Templates"
2. Cliquez sur "Create New Template"
3. Configurez le template :

**From Name:**
```
Nooraya Voyages
```

**From Email:**
```
contact@noorayagroup.com
```

**Reply To:** 
```
{{from_email}}
```

**To Email:** 
```
contact@noorayagroup.com
```

**Subject:**
```
Nouvelle demande Umra - {{from_name}}
```

**Content:**
```
Bonjour,

Vous avez reçu une nouvelle demande de réservation Umra :

Nom : {{from_name}}
Email : {{from_email}}
Téléphone : {{phone}}
Pack souhaité : {{pack}}

Message :
{{message}}

---
Email envoyé depuis le formulaire du site Nooraya Voyages
```

4. Cliquez sur "Save"
5. **Copiez le Template ID** (ex: template_xyz789)

### 4. Récupérer votre Public Key
1. Cliquez sur "Account"
2. Dans l'onglet "General"
3. **Copiez votre Public Key**

### 5. Mettre à jour le code
Dans le fichier `/src/app/umra/page.tsx`, remplacez les valeurs aux lignes 20-22 :

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123'; // Votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Votre Template ID
const EMAILJS_PUBLIC_KEY = 'votre-public-key'; // Votre Public Key
```

## ✅ Avantages d'utiliser votre email Titan

- ✉️ Les emails viennent de **contact@noorayagroup.com**
- 🔒 Plus professionnel et sécurisé
- 📧 Évite les filtres spam
- 🏢 Cohérent avec votre identité d'entreprise

## 📌 Informations SMTP Titan

Si les paramètres ci-dessus ne fonctionnent pas, voici les alternatives :

**SMTP avec SSL :**
```
Host: smtp.titan.email
Port: 465
Security: SSL
```

**SMTP avec STARTTLS :**
```
Host: smtp.titan.email
Port: 587
Security: TLS/STARTTLS
```

## ⚠️ Important

- Utilisez un mot de passe d'application si vous avez activé la 2FA
- Vérifiez que l'envoi SMTP est activé dans votre compte Titan
- Testez d'abord avec un email simple

## 🧪 Test

1. Après configuration, remplissez le formulaire
2. Les emails seront envoyés depuis contact@noorayagroup.com
3. Vérifiez votre boîte de réception