// src/app/login/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionamento de rotas

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // Aqui você pode integrar a lógica de autenticação (com Firebase ou API)
    // Exemplo:
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(() => { /* Sucesso! */ })
    //   .catch((error) => { console.error(error); });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          style={{ padding: '10px 20px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Entrar
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>
          No account?{' '}
          <button
            onClick={() => router.push('/register')}
            style={{ background: 'none', color: '#007BFF', border: 'none', cursor: 'pointer' }}
          >
            Create One
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
