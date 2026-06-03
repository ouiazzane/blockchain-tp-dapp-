export default function BlockchainInfo({ web3, account, networkId, blockInfo, refresh }) {
  return (
    <section className="blockchain-info">
      <h2>Informations Blockchain</h2>
      {web3 ? (
        <div className="info-grid">
          <div>
            <strong>Compte connecté</strong>
            <p>{account || 'Aucun compte connecté'}</p>
          </div>
          <div>
            <strong>Réseau</strong>
            <p>{networkId ? `ID ${networkId}` : 'Indisponible'}</p>
          </div>
          <div>
            <strong>Dernier bloc</strong>
            <p>{blockInfo ? blockInfo.number : 'Indisponible'}</p>
          </div>
          <div>
            <strong>Hash du bloc</strong>
            <p>{blockInfo ? blockInfo.hash : 'Indisponible'}</p>
          </div>
          <div className="refresh-button">
            <button type="button" onClick={refresh}>
              Actualiser
            </button>
          </div>
        </div>
      ) : (
        <p>Veuillez connecter votre wallet Ethereum pour afficher l’état de la blockchain.</p>
      )}
    </section>
  );
}
