'use client'

// src/app/register/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionamento de rotas

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Register:', { email, password });
    // Aqui você pode integrar a lógica de registro (com Firebase ou API)
    // Exemplo:
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then(() => { /* Sucesso! */ })
    //   .catch((error) => { console.error(error); });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro</h2>
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
        <div>
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
        </div>
        <button
          type="button"
          onClick={handleRegister}
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Cadastrar
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            style={{ background: 'none', color: '#007BFF', border: 'none', cursor: 'pointer' }}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
