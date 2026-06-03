const fs = require('fs');
const path = require('path');

const buildContractsDir = path.resolve(__dirname, '../build/contracts');
const clientContractsDir = path.resolve(__dirname, '../client/src/contracts');

if (!fs.existsSync(buildContractsDir)) {
  console.error('Le dossier build/contracts est introuvable. Compilez d’abord avec `npm run truffle-compile`.');
  process.exit(1);
}

fs.mkdirSync(clientContractsDir, { recursive: true });

const files = fs.readdirSync(buildContractsDir).filter((name) => name.endsWith('.json'));
files.forEach((name) => {
  const source = path.join(buildContractsDir, name);
  const destination = path.join(clientContractsDir, name);
  fs.copyFileSync(source, destination);
});
console.log(`Synchronisation termine: ${files.length} artefacts copies dans client/src/contracts`);
