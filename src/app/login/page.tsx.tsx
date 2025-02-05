// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionamento de rotas
import './styles.css'; // Estilos do seu componente

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // Lógica de login (Firebase ou API)
  };

  return (
    <div className="container">
      <h1 className='title'>Login</h1>
      <div className="login-box">
        <div className='form-container'>
          <form>
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
              <label htmlFor="email" className={`input-label ${email ? 'filled' : ''}`}>Email or Phone Number</label>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="Password"
              />
            </div>
          </form>
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default Login;
