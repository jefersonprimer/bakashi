import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={styles.container}>
      <svg
        width="80" // Tamanho ajustável do SVG
        height="80"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={styles.svg}
      >
        <style>
          {`.spinner_ajPY { 
              transform-origin: center; 
              animation: spinner_AtaB 0.75s infinite linear; 
            } 
            @keyframes spinner_AtaB { 
              100% { transform: rotate(360deg); } 
            }`}
        </style>
        <path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
        />
        <path
          d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          className="spinner_ajPY"
        />
      </svg>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'transparent', // Fundo completamente transparente
    zIndex: 9999, // Certifique-se de que o loader fique acima de outros elementos
  },
  svg: {
    fill: '#0070f3', // Cor do SVG (ajustável)
  },
};

export default Loading;
