// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = localStorage.getItem('user');
    if (existingUser && JSON.parse(existingUser).email === email) {
      setError('El correo electrónico ya está registrado');
      return;
    }

    // Guardar los datos de usuario en el localStorage
    const newUser = { email, username, password };
    localStorage.setItem('user', JSON.stringify(newUser));

    // Redirigir al login después de registrarse
    setError(''); // Limpiar error antes de redirigir
    navigate('/Login');
    navigate('/');// Esto debería redirigir correctamente
  };

  return (
    <div className="fondo-imagen">
      <div className="login-container">
        <h2>Crear Cuenta</h2>

        {/* Card de Bootstrap */}
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Bienvenido</h5>
            <p className="card-text">Ingresa tus datos para crear una cuenta.</p>

            {/* Formulario de registro */}
            <form onSubmit={handleRegister}>
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                className="form-control mt-2"
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

              <input
                type="password"
                className="form-control mt-2"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="btn btn-primary mt-3">Registrarse</button>
            </form>

            {error && <p className="text-danger">{error}</p>}

            <p className="mt-2">¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
