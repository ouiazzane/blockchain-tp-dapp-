import { useEffect, useState } from 'react';

function formatResult(result) {
  if (result === undefined || result === null) return 'Aucun résultat';
  if (typeof result === 'object') return JSON.stringify(result, null, 2);
  return String(result);
}

export default function ContractInterface({ config, web3, account, setTxInfo }) {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadContract() {
      if (!web3 || !config?.artifact) {
        setContract(null);
        setStatus('Web3 ou contrat manquant.');
        return;
      }

      try {
        const networkId = await web3.eth.net.getId();
        const networkData = config.artifact.networks[networkId];

        if (!networkData) {
          setContract(null);
          setAddress('');
          setStatus('Contrat non déployé sur le réseau actuel.');
          return;
        }

        const instance = new web3.eth.Contract(config.artifact.abi, networkData.address);
        setContract(instance);
        setAddress(networkData.address);
        setStatus('Contrat prêt à l’emploi.');
      } catch (error) {
        setContract(null);
        setStatus(error.message || 'Impossible de charger le contrat.');
      }
    }

    loadContract();
  }, [web3, config?.artifact]);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = async (action) => {
    if (!contract) {
      setStatus('Le contrat n’est pas disponible.');
      return;
    }

    if (!account) {
      setStatus('Veuillez connecter votre wallet.');
      return;
    }

    try {
      setStatus('Transaction en cours...');
      const args = action.inputs.map((input) => form[input.name] || '');
      let result;

      if (action.send) {
        const txOptions = { from: account };
        if (action.valueField) {
          const value = form[action.valueField] || '0';
          txOptions.value = web3.utils.toWei(value.toString(), 'ether');
        }

        const receipt = await contract.methods[action.method](...args).send(txOptions);
        setTxInfo({
          hash: receipt.transactionHash,
          gasUsed: receipt.gasUsed,
          status: receipt.status,
        });
        result = receipt.transactionHash;
      } else {
        result = await contract.methods[action.method](...args).call({ from: account });
      }

      const newRow = {
        label: action.resultText || action.label,
        value: formatResult(result),
      };
      setResults((prev) => [newRow, ...prev].slice(0, 8));
      setStatus('Opération réussie.');
    } catch (error) {
      setStatus(error.message || 'Erreur lors de l’opération.');
    }
  };

  return (
    <section className="contract-interface">
      <div className="contract-header">
        <div>
          <h2>{config.title}</h2>
          <p>{config.description}</p>
        </div>
        <div>
          <p>
            <strong>Adresse :</strong> {address || 'Non disponible'}
          </p>
          <p>
            <strong>Statut :</strong> {status}
          </p>
        </div>
      </div>

      {config.actions.map((action) => (
        <div className="action-card" key={action.method}>
          <h3>{action.label}</h3>
          <div className="action-inputs">
            {action.inputs.map((input) => (
              <label key={input.name}>
                {input.label}
                <input
                  type={input.type}
                  value={form[input.name] || ''}
                  placeholder={input.placeholder || ''}
                  onChange={(e) => updateField(input.name, e.target.value)}
                />
              </label>
            ))}
          </div>
          <button type="button" onClick={() => handleAction(action)}>
            {action.label}
          </button>
        </div>
      ))}

      <div className="contract-results">
        <h3>Résultats récents</h3>
        {results.length === 0 ? (
          <p>Aucune action encore exécutée.</p>
        ) : (
          <ul>
            {results.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <strong>{item.label} :</strong>
                <pre>{item.value}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
