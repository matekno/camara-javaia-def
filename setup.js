const { execSync } = require('child_process');

console.log('🚀 Iniciando configuración de Cámara Javaia...\n');

const steps = [
  {
    name: 'Instalar dependencias',
    command: 'npm install',
  },
  {
    name: 'Generar cliente de Prisma',
    command: 'npx prisma generate',
  },
  {
    name: 'Sincronizar base de datos',
    command: 'npx prisma db push --skip-generate',
  },
  {
    name: 'Poblar base de datos con datos iniciales',
    command: 'npm run db:seed',
  },
];

let currentStep = 0;

for (const step of steps) {
  currentStep++;
  console.log(`\n[$${currentStep}/${steps.length}] ${step.name}...`);
  console.log(`Ejecutando: ${step.command}\n`);
  
  try {
    execSync(step.command, { stdio: 'inherit' });
    console.log(`✅ ${step.name} completado\n`);
  } catch (error) {
    console.error(`❌ Error en: ${step.name}`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log('\n🎉 ¡Configuración completada exitosamente!\n');
console.log('Para iniciar la aplicación, ejecutar:');
console.log('  npm run dev\n');
console.log('La aplicación estará disponible en: http://localhost:3000\n');
console.log('Identidades disponibles:');
console.log('  - Puro instinto');
console.log('  - Repetir patrones');
console.log('  - Una cicatriz');
console.log('  - ¿Qué ves cuando te ves?');
console.log('  - ¿Imitar o copiar?\n');

