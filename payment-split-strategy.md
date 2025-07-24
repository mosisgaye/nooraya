# Stratégie de Répartition des Paiements - Nooraya Voyages

## Vue d'ensemble

Ce document détaille la stratégie de répartition des paiements entre Nooraya Voyages et les fournisseurs d'API lors des transactions clients.

## 1. Modèles de Répartition

### 1.1 Modèle "Agent" (Recommandé pour débuter)

**Description :** Nooraya reçoit 100% du paiement et reverse la part du fournisseur ultérieurement.

```mermaid
Client (160k FCFA) → Nooraya (100%) → Reverse 150k au Fournisseur
                                    → Garde 10k Commission
```

**Flux détaillé :**
1. Client paie le montant total à Nooraya via PayTech/Intech
2. Nooraya reçoit 100% sur son compte
3. Nooraya garde sa commission (10 000 FCFA)
4. Nooraya reverse le net au fournisseur selon échéancier

**Avantages :**
- ✅ Contrôle total sur les fonds
- ✅ Commission garantie avant reversement
- ✅ Simple à implémenter techniquement
- ✅ Pas de dépendance technique complexe

**Inconvénients :**
- ❌ Besoin de trésorerie pour les reversements
- ❌ Gestion manuelle des reversements (au début)
- ❌ Responsabilité financière complète
- ❌ Risque de litiges si retard de paiement

**Configuration requise :**
```javascript
// Configuration PayTech/Intech
{
  "merchant_account": "NOORAYA_MAIN",
  "payment_mode": "FULL_CAPTURE",
  "settlement": "T+1" // Règlement J+1
}
```

### 1.2 Modèle "Split Payment" (Objectif moyen terme)

**Description :** Le paiement est automatiquement réparti entre les parties.

```mermaid
         ┌→ Fournisseur (150k FCFA) [93.75%]
Client ──┤
         └→ Nooraya (10k FCFA) [6.25%]
```

**Configuration Split Payment :**
```javascript
{
  "split_rules": [
    {
      "recipient": "SUPPLIER_ACCOUNT_ID",
      "type": "PERCENTAGE",
      "value": 93.75,
      "min_amount": 0
    },
    {
      "recipient": "NOORAYA_ACCOUNT_ID",
      "type": "FIXED",
      "value": 10000,
      "currency": "XOF"
    }
  ]
}
```

**Mise en place avec PayTech :**
1. Contacter le support PayTech pour activer le split payment
2. Fournir les informations bancaires du fournisseur
3. Signer un accord tripartite
4. Tester en environnement sandbox

### 1.3 Modèle "Marketplace" (Long terme)

**Technologies suggérées :**
- **International :** Stripe Connect, PayPal Marketplace
- **Afrique :** Flutterwave Store, Paystack Split Payments
- **Local :** Solution custom avec API bancaire

## 2. Implémentation Phase 1 : Modèle Agent

### 2.1 Architecture Technique

```typescript
// Structure de données pour tracking
interface PaymentSplit {
  booking_id: string;
  total_amount: number;
  commission_amount: number;
  supplier_amount: number;
  supplier_paid: boolean;
  supplier_paid_date?: Date;
  payment_reference?: string;
  created_at: Date;
}

// Table Supabase
CREATE TABLE payment_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  total_amount DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  supplier_amount DECIMAL(10,2),
  supplier_paid BOOLEAN DEFAULT FALSE,
  supplier_paid_date TIMESTAMP,
  payment_reference TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2.2 Processus de Reversement

**Fréquence de reversement :**
- **Hebdomadaire** : Tous les vendredis
- **Bi-mensuel** : Le 15 et 30 de chaque mois
- **Mensuel** : Le 5 de chaque mois

**Processus manuel (Phase 1) :**
1. Exporter les transactions de la semaine
2. Calculer le total dû au fournisseur
3. Effectuer le virement bancaire
4. Mettre à jour le statut dans la base
5. Envoyer le relevé au fournisseur

**Automatisation (Phase 1.5) :**
```javascript
// Cron job pour générer les rapports
// Tous les vendredis à 10h00
"0 10 * * 5"

// Exemple de rapport
{
  "period": "2024-01-15 to 2024-01-21",
  "transactions": 45,
  "total_collected": 7200000, // XOF
  "commission_total": 450000, // 45 × 10000
  "supplier_due": 6750000,
  "payment_date": "2024-01-22"
}
```

### 2.3 Tableau de Bord Financier

**Métriques clés :**
- Montant total collecté
- Commissions gagnées
- Montants dus aux fournisseurs
- Statut des reversements
- Cash flow prévisionnel

```typescript
// API endpoint pour dashboard
GET /api/admin/financial-dashboard

Response:
{
  "current_month": {
    "total_collected": 45000000,
    "total_commission": 2800000,
    "supplier_paid": 38500000,
    "supplier_pending": 3700000
  },
  "pending_payments": [
    {
      "supplier": "KiwiAPI",
      "amount": 3700000,
      "transactions": 37,
      "due_date": "2024-01-26"
    }
  ]
}
```

## 3. Aspects Légaux et Contractuels

### 3.1 Contrat avec le Fournisseur

**Clauses essentielles :**
```markdown
1. **Mandat de collecte**
   - Nooraya agit comme agent de recouvrement
   - Autorisation de collecter les paiements

2. **Modalités de reversement**
   - Fréquence : Hebdomadaire
   - Délai : J+7 maximum
   - Mode : Virement bancaire

3. **Commission**
   - Montant : 10 000 FCFA par transaction
   - Non-remboursable
   - Prélevée avant reversement

4. **Responsabilités**
   - Nooraya : Collecte et reversement
   - Fournisseur : Prestation du service
   - Litiges clients : Responsabilité partagée

5. **Reporting**
   - Relevé hebdomadaire détaillé
   - Accès au dashboard en temps réel
   - Audit annuel possible
```

### 3.2 CGV Client

**Mentions obligatoires :**
```markdown
Article X - Prix et Paiement

1. Les prix affichés incluent :
   - Le prix du service (vol, hôtel, etc.)
   - Les frais de service Nooraya Voyages
   - Les taxes applicables

2. Nooraya Voyages agit en qualité d'intermédiaire
   entre le client et les prestataires de services.

3. Le paiement est effectué en totalité à Nooraya Voyages
   qui se charge du règlement aux prestataires.
```

### 3.3 Facturation

**Circuit de facturation :**
```
1. Client → Nooraya : Facture globale TTC
2. Nooraya → Client : Facture commission TTC
3. Fournisseur → Nooraya : Facture prestation HT
4. Nooraya → Fournisseur : Note de reversement
```

## 4. Gestion des Risques

### 4.1 Risques Financiers

**Mitigation :**
- **Compte séquestre** : Pour montants > 10M FCFA
- **Assurance RC Pro** : Couverture défaillance
- **Limite d'encours** : Max 1 semaine de CA
- **Reversement rapide** : Réduire l'exposition

### 4.2 Risques Opérationnels

**Procédures :**
```javascript
// Système d'alertes
const alerts = {
  "payment_received": "SMS + Email au finance",
  "large_amount": "Validation manuelle si > 5M FCFA",
  "reversal_due": "Rappel J-2, J-1, Jour J",
  "payment_failed": "Escalade immédiate"
};
```

### 4.3 Plan de Continuité

**Scénarios :**
1. **PayTech down** : Bascule sur virement bancaire
2. **Compte bloqué** : Compte de secours pré-configuré
3. **Litige client** : Gel du reversement jusqu'à résolution

## 5. Roadmap d'Évolution

### Phase 1 : Agent Manuel (Mois 1-3)
- ✅ Collecte 100% des paiements
- ✅ Reversement manuel hebdomadaire
- ✅ Tracking Excel/Google Sheets
- ✅ Commission fixe 10 000 FCFA

### Phase 2 : Agent Semi-Auto (Mois 4-6)
- 📋 Dashboard de suivi interne
- 📋 Export automatique des dus
- 📋 Intégration API bancaire (consultation)
- 📋 Alertes automatiques

### Phase 3 : Split Payment (Mois 7-12)
- 📋 Migration vers split payment PayTech
- 📋 Portail fournisseur
- 📋 Reconciliation automatique
- 📋 Multi-devises

### Phase 4 : Marketplace (Année 2)
- 📋 Onboarding fournisseurs self-service
- 📋 Multi-fournisseurs par réservation
- 📋 Règles de commission dynamiques
- 📋 Facturation automatisée

## 6. KPIs et Monitoring

### Indicateurs Clés
```typescript
interface FinancialKPIs {
  // Volumes
  total_transactions: number;
  total_gmv: number; // Gross Merchandise Value
  
  // Commissions
  commission_rate: number; // %
  total_commission: number;
  average_commission: number;
  
  // Trésorerie
  cash_in_hand: number;
  pending_payouts: number;
  days_to_payout: number;
  
  // Performance
  payment_success_rate: number;
  reversal_on_time_rate: number;
  dispute_rate: number;
}
```

### Dashboard Temps Réel
- **Grafana** : Monitoring technique
- **Metabase** : Analytics business
- **Custom** : Dashboard React intégré

## 7. FAQ Opérationnelle

**Q : Que faire si un client demande un remboursement ?**
R : 
1. Vérifier si le fournisseur a été payé
2. Si non : Remboursement total, annuler le reversement
3. Si oui : Négocier avec le fournisseur, commission non-remboursable

**Q : Comment gérer les devises multiples ?**
R : 
1. Toujours facturer en FCFA au Sénégal
2. Compte multi-devises pour fournisseurs internationaux
3. Taux de change fixé à J-1 de la transaction

**Q : Délai maximum de reversement ?**
R : 7 jours ouvrés, idéalement 3-5 jours

**Q : Comment tracker les paiements manuellement ?**
R : Template Google Sheets avec :
- Date transaction
- Référence PayTech
- Montant total
- Commission
- Net fournisseur
- Statut reversement
- Référence virement

## 8. Contacts et Support

### Équipe Finance
- **Responsable** : À définir
- **Email** : finance@noorayavoyages.com
- **Urgences** : +221 XX XXX XX XX

### Support Technique
- **PayTech** : support@paytech.sn
- **Intech** : support@intech.sn
- **Banque** : Conseiller dédié

### Escalade
1. Niveau 1 : Opérations (J+0)
2. Niveau 2 : Finance Manager (H+4)
3. Niveau 3 : Direction (H+24)

---

*Document mis à jour le : 2024-01-25*
*Version : 1.0*
*Prochaine révision : 2024-04-25*