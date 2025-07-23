#!/usr/bin/env node

const requiredEnvVars = [
  'RAPIDAPI_KEY',
  'KIWI_API_HOST',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'PAYTECH_API_KEY',
  'PAYTECH_SECRET_KEY'
];

console.log('🔍 Vérification des variables d\'environnement...\n');

let hasErrors = false;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const isPublic = varName.startsWith('NEXT_PUBLIC_');
  
  if (!value) {
    console.error(`❌ ${varName} - MANQUANTE`);
    hasErrors = true;
  } else {
    const displayValue = varName.includes('KEY') || varName.includes('SECRET') 
      ? `${value.substring(0, 10)}...` 
      : value;
    console.log(`✅ ${varName} - ${displayValue}`);
  }
});

console.log('\n📝 Variables d\'environnement détectées:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'non défini');
console.log('VERCEL_ENV:', process.env.VERCEL_ENV || 'non défini');

if (hasErrors) {
  console.error('\n⚠️  Des variables d\'environnement sont manquantes!');
  console.log('\n📋 Pour corriger sur Vercel:');
  console.log('1. Allez sur https://vercel.com/dashboard');
  console.log('2. Sélectionnez votre projet');
  console.log('3. Allez dans Settings > Environment Variables');
  console.log('4. Ajoutez les variables manquantes');
  console.log('5. Redéployez votre application');
  process.exit(1);
} else {
  console.log('\n✅ Toutes les variables d\'environnement sont configurées!');
}