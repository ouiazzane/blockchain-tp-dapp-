# TP3 dApp Blockchain et Web3

Ce projet est une application décentralisée complète pour le TP 3, développée avec :

- **Solidity** pour 8 contrats intelligents
- **Truffle** pour la compilation et le déploiement
- **Ganache** pour le réseau Ethereum local
- **React** pour l’interface utilisateur
- **Web3.js** pour l’interaction avec les contrats

## Structure du projet

- `contracts/` : 8 contrats Solidity pour les exercices TP3
- `migrations/` : migration Truffle pour déployer tous les contrats
- `client/` : frontend React
- `client/src/contracts/` : artefacts ABI synchronisés depuis Truffle
- `truffle-config.js` : configuration réseau pour Ganache

## Installation

1. Ouvrir un terminal à la racine du projet :

```bash
cd c:\Users\surface\Desktop\blockchain-tp-dapp
npm install
```

2. Installer les dépendances du frontend :

```bash
cd client
npm install
```

## Déploiement

1. Démarrer Ganache localement sur `127.0.0.1:7545` avec `Network ID = 5777`.
2. Si votre Ganache écoute sur le port `7545` :

```bash
cd c:\Users\surface\Desktop\blockchain-tp-dapp
npm run deploy
```

3. Si vous utilisez Ganache sur `8545` :

```bash
cd c:\Users\surface\Desktop\blockchain-tp-dapp
npx truffle migrate --reset --network ganache
node scripts/sync-contracts.js
```

## Lancement du frontend

```bash
cd c:\Users\surface\Desktop\blockchain-tp-dapp\client
npm start
```

Ensuite, ouvrez `http://localhost:3000`.

## Notes importantes

- Le frontend est prêt et compile sans erreur.
- La compilation des contrats s’est bien déroulée.
- La migration nécessite Ganache lancé sur `7545` ou `8545`.
- Si Ganache n’est pas accessible, le frontend affichera un message indiquant que le contrat n’est pas déployé.

## Pages d’exercices

Le frontend propose un sommaire pour accéder à 8 écrans :

1. Stockage simple
2. Compteur
3. Banque
4. Vote
5. Token
6. Todo
7. Whitelist
8. Journal d’événements

Chaque page inclut :

- un formulaire pour interagir avec le contrat
- le résultat de l’appel ou de la transaction
- les informations blockchain
- les détails de la dernière transaction
