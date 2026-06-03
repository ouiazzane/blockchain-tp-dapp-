import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log the error to an external service here
    // console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Une erreur d'exécution est survenue dans l'interface.</h2>
          <p>Message : {String(this.state.error?.message || this.state.error)}</p>
          <p>
            Essayez de recharger la page et assurez-vous que MetaMask est connecté à Ganache
            (RPC http://127.0.0.1:7545, Chain ID 1337 / Net 5777).
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
