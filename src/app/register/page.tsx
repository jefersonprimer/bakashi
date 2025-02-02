'use client'

// src/app/register/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionamento de rotas
import './styles.css';

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
    <div className="container">
      <h1 className='title'>Create Account</h1>
      <div className="register-box">
        <div className='form-container'>
          <h2 className='title-form'>
            Welcome to the home of anime fandom! <br/>
            Let's start by creating an account.
          </h2>
          <form>
          <div>
            <div className="input-container">
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
          </div>

            {/* <div>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div> */}
            {/* <div>
              <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
              />
            </div> */}
            <div>
              <label tabIndex="0" className="checkbox-label">
                <input className="checkbox-input" type="checkbox" />
                <span className="checkbox-checkmark">
                  <svg className="checkbox-svg" viewBox="2 2 16 16">
                    <path className="checkbox-path" d="M6,10 C7.93333333,12 8.93333333,13 9,13 C9.06666667,13 10.7333333,11 14,7" strokeWidth="2"></path>
                  </svg>
                </span>
                <span className="checkbox-text">
                  I want all the latest Crunchyroll info, offers, and news. All communications are subject to our
                  <a className="privacy-link" href="https://www.crunchyroll.com/privacy"><span className='privacy-policy'> Privacy Policy</span></a>.
                  Opt out anytime.
                </span>
              </label>
            </div>
          </form>
        </div>
        <button type="button" onClick={handleRegister} className="register-button">
          <span className='next'>NEXT</span>
        </button>
        <div className="login-link">
          <p>
            Already have an account?{' '}
            <button onClick={() => router.push('/login')} className="login-button">
              LOG IN
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
