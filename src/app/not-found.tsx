'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Página não encontrada.</p>
      <button style={styles.button} onClick={handleGoBack}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '6rem',
    color: '#0070f3',
    margin: 0,
  },
  message: {
    fontSize: '1.5rem',
    color: '#333',
    margin: '1rem 0',
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default NotFound;
