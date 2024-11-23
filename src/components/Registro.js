// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import axios from 'axios';

function Register() {
  const [correo, setEmail] = useState('');
  const [nombreUsuario, setUsername] = useState('');
  const [contrasena, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (contrasena !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(correo)) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = localStorage.getItem('user');
    if (existingUser && JSON.parse(existingUser).email === correo) {
      setError('El correo electrónico ya está registrado');
      return;
    }

    // Guardar los datos de usuario en el localStorage
    const newUser = { nombreUsuario, contrasena, correo};
    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios', {
        method: 'POST',
        mode: 'no-cors',
        accept: 'application/json',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
      });

      console.log(newUser);

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      // Limpiar los errores y redirigir al login después de registrarse
      setError('');
      navigate('/login');git 
    } catch (err) {
      setError('Hubo un problema con el registro: ' + err.message);
    }
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
            <form onSubmit={handleRegister}  method="POST">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                className="form-control mt-2"
                placeholder="Contraseña"
                value={contrasena}
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
