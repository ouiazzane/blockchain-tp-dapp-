import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import exercises from './data/exercises';
import contractArtifacts from './contracts';
import BlockchainInfo from './components/BlockchainInfo';
import TxDetails from './components/TxDetails';
import ContractInterface from './components/ContractInterface';
import './App.css';

function HomePage() {
  return (
    <section className="home-page">
      <h2>Sommaire des exercices</h2>
      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <article key={exercise.id} className="exercise-card">
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
            <Link to={exercise.path}>Accéder</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExercisePage({ config, web3, account, setTxInfo }) {
  return (
    <section className="exercise-page">
      <Link to="/" className="back-link">
        ← Retour au sommaire
      </Link>
      <ContractInterface config={config} web3={web3} account={account} setTxInfo={setTxInfo} />
    </section>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <h2>Page introuvable</h2>
      <p>Retournez au sommaire pour sélectionner un exercice.</p>
      <Link to="/">Retour au sommaire</Link>
    </section>
  );
}

const GANACHE_NETWORK_IDS = [1337, 5777];
const GANACHE_NETWORK_LABEL = GANACHE_NETWORK_IDS.join(' / ');

const contractKeyMap = {
  exercice1: 'Exercise1_SimpleStorage',
  exercice2: 'Exercise2_Counter',
  exercice3: 'Exercise3_Bank',
  exercice4: 'Exercise4_Voting',
  exercice5: 'Exercise5_SimpleToken',
  exercice6: 'Exercise6_TodoList',
  exercice7: 'Exercise7_Whitelist',
  exercice8: 'Exercise8_EventLogger',
};

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState(null);
  const [blockInfo, setBlockInfo] = useState(null);
  const [txInfo, setTxInfo] = useState(null);
  const [status, setStatus] = useState('Aucune connexion Ethereum en cours.');
  const routerFuture = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  };

  useEffect(() => {
    const contracts = {};

    if (web3 && networkId) {
      const isGanacheNetwork = GANACHE_NETWORK_IDS.includes(networkId);

      if (!isGanacheNetwork) {
        setStatus(`Connectez MetaMask au réseau local Ganache (${GANACHE_NETWORK_LABEL}), pas au réseau ${networkId}.`);
      } else {
        Object.entries(contractKeyMap).forEach(([key, artifactName]) => {
          const artifact = contractArtifacts[artifactName];
          const networkData =
            artifact?.networks?.[networkId] ||
            artifact?.networks?.[GANACHE_NETWORK_IDS[0]] ||
            artifact?.networks?.[GANACHE_NETWORK_IDS[1]];

          if (artifact && networkData?.address) {
            contracts[key] = new web3.eth.Contract(artifact.abi, networkData.address);
          } else {
            console.warn(
              `Contract ${artifactName} is not deployed on network ${networkId}.`,
              { artifactName, networkId, availableNetworks: Object.keys(artifact?.networks || {}) }
            );
          }
        });
      }
    }

    window.dapp = {
      web3,
      account,
      networkId,
      contracts,
      contractArtifacts,
    };
    window.contracts = contracts;
    window.account = account;
  }, [web3, account, networkId]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      // Prevent Web3 ENS lookups from throwing on private Ganache networks.
      // Provide a minimal stub for `eth.ens` so Web3 won't attempt real ENS resolution.
      try {
        if (web3Instance && web3Instance.eth) {
          web3Instance.eth.ens = {
            getAddress: async () => Promise.reject(new Error('ENS unsupported on private network')),
            getName: async () => null,
            lookup: async () => null,
            checkNetwork: async () => null,
          };
        }
      } catch (e) {
        // ignore
      }
      setWeb3(web3Instance);
      setStatus('Wallet détecté. Connectez-vous pour démarrer.');

      async function loadAccount() {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setStatus('Wallet connecté.');
          }
          const id = await web3Instance.eth.net.getId();
          setNetworkId(id);
        } catch (error) {
          setStatus('Impossible de récupérer le compte Ethereum.');
        }
      }

      loadAccount();

      const handleAccountsChanged = (accounts) => {
        setAccount(accounts.length > 0 ? accounts[0] : '');
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    } else {
      setStatus('MetaMask non détecté. Installez MetaMask pour utiliser la dApp.');
    }
  }, []);

  useEffect(() => {
    async function refreshBlock() {
      if (!web3) {
        return;
      }
      try {
        const latestBlock = await web3.eth.getBlock('latest');
        setBlockInfo(latestBlock);
        const id = await web3.eth.net.getId();
        setNetworkId(id);
      } catch (error) {
        console.error(error);
      }
    }
    refreshBlock();
  }, [web3, account]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus('MetaMask non détecté.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setStatus('Wallet connecté avec succès.');
    } catch (error) {
      setStatus('Connexion MetaMask annulée ou échouée.');
    }
  };

  const refreshBlockInfo = async () => {
    if (!web3) return;
    try {
      const latestBlock = await web3.eth.getBlock('latest');
      setBlockInfo(latestBlock);
      const id = await web3.eth.net.getId();
      setNetworkId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router future={routerFuture}>
      <div className="App">
        <header className="App-header">
          <div>
            <h1>TP3 dApp Blockchain</h1>
            <p>Interface React pour interagir avec 8 contrats Solidity via Truffle et Ganache.</p>
          </div>
          <div className="wallet-status">
            <button type="button" onClick={connectWallet}>
              Connecter MetaMask
            </button>
            <div className="wallet-info">
              <p>
                <strong>Compte :</strong> {account || 'Non connecté'}
              </p>
              <p>
                <strong>Réseau :</strong> {networkId || 'Indisponible'}
              </p>
            </div>
          </div>
        </header>

        <main className="App-main">
          <div className="App-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {exercises.map((exercise) => (
                <Route
                  key={exercise.id}
                  path={exercise.path}
                  element={<ExercisePage config={exercise} web3={web3} account={account} setTxInfo={setTxInfo} />}
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <aside className="App-sidebar">
            <BlockchainInfo web3={web3} account={account} networkId={networkId} blockInfo={blockInfo} refresh={refreshBlockInfo} />
            <TxDetails txInfo={txInfo} />
            <section className="instructions">
              <h2>Instructions</h2>
              <ul>
                <li>Ouvrez Ganache et déployez les contrats avec Truffle.</li>
                <li>Connectez MetaMask au réseau local.</li>
                <li>Utilisez le sommaire pour accéder aux exercices.</li>
              </ul>
            </section>
          </aside>
        </main>

        <footer className="App-footer">
          <p>Projet TP3 Blockchain et Web3 — React + Truffle</p>
          <p>{status}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
