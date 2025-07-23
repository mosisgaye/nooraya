const crypto = require('crypto');

// Configuration PayTech
const PAYTECH_API_KEY = '0925ac9b911668fe55e8cb86738d5b45b10bb8e3ece0c10cda139af86230ff22';

// Données de test
const transactionId = 'TEST123';
const externalTransactionId = 'NOORAYA_TEST_001';

// Calculer le hash SHA256
const hashString = `${transactionId}|${externalTransactionId}|${PAYTECH_API_KEY}`;
const sha256Hash = crypto.createHash('sha256').update(hashString).digest('hex');

// Payload de test
const testPayload = {
  msg: "Test callback local",
  status: "SUCCESS",
  sha256Hash: sha256Hash,
  transaction: {
    phone: "772457199",
    amount: 50000,
    codeService: "ORANGE_SN_API_CASH_OUT",
    nameService: "Orange Money",
    commission: 500,
    transactionId: transactionId,
    currentBalance: 1000000,
    balanceBeforeTransactionInit: 1050000,
    balanceAfterTransactionInit: 1000000,
    externalTransactionId: externalTransactionId,
    callbackUrl: "https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback"
  }
};

console.log('Payload de test PayTech:');
console.log(JSON.stringify(testPayload, null, 2));
console.log('\nHash calculé:', sha256Hash);
console.log('\nCURL command pour tester:');
console.log(`curl -X POST https://zwwwvztzcbkptzhfynym.supabase.co/functions/v1/paytech-callback \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(testPayload)}'`);