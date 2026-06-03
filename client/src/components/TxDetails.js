export default function TxDetails({ txInfo }) {
  if (!txInfo) {
    return (
      <section className="tx-details">
        <h2>Détails de la dernière transaction</h2>
        <p>Aucune transaction enregistrée pour l’instant.</p>
      </section>
    );
  }

  return (
    <section className="tx-details">
      <h2>Détails de la dernière transaction</h2>
      <ul>
        <li>
          <strong>Hash :</strong> {txInfo.hash}
        </li>
        <li>
          <strong>Gas utilisé :</strong> {txInfo.gasUsed}
        </li>
        <li>
          <strong>Statut :</strong> {txInfo.status ? 'Succès' : 'Échec'}
        </li>
      </ul>
    </section>
  );
}
