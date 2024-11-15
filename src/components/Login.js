// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulando validación simple
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.username === username && parsedUser.password === password) {
        navigate('/dashboard'); // Redirigir al dashboard o página principal
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } else {
      setError('Usuario no encontrado');
    }
  };

  return (
    <div className="fondo-imagen">
      <div className="login-container">
        <h2>Iniciar sesión</h2>

        {/* Card de Bootstrap */}
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Bienvenido</h5>
            <p className="card-text">Ingresa tus datos para acceder.</p>

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mt-3">Iniciar sesión</button>
            </form>

            {error && <p className="text-danger">{error}</p>}

            {/* Enlace para redirigir al formulario de registro */}
            <p className="mt-2">¿No tienes una cuenta? <a href="/register">Crear cuenta</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
