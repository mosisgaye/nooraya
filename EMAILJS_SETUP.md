# Configuration EmailJS pour Nooraya Voyages

## 🚀 Configuration en 5 minutes

### 1. Créer un compte EmailJS (gratuit)
1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up Free"
3. Créez votre compte

### 2. Ajouter Gmail comme service
1. Dans le dashboard EmailJS, cliquez sur "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez "Gmail"
4. Nommez le service (ex: "Nooraya")
5. Connectez votre compte Gmail
6. **Copiez le Service ID** (ex: service_abc123)

### 3. Créer un template d'email
1. Cliquez sur "Email Templates"
2. Cliquez sur "Create New Template"
3. Configurez le template :

**To Email:** 
```
{{to_email}}
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

## ✅ C'est tout !

Le formulaire enverra maintenant automatiquement les emails à contact@noorayagroup.com

### Limites du plan gratuit :
- 200 emails/mois
- 2 templates
- Largement suffisant pour commencer

### Test :
1. Remplissez le formulaire sur votre site
2. Cliquez sur "Envoyer la demande"
3. Vérifiez votre boîte email contact@noorayagroup.com