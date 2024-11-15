import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'; // Asegúrate de que App.css esté correctamente importado

function Home() {
  const navigate = useNavigate();

  // Función para redirigir a Login
  const goToLogin = () => {
    navigate('/login');
  };

  // Función para redirigir a Register
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="welcome-container">
      <h2>Bienvenidos a Empanadas Emanuel</h2>
      <p>¡Por favor, inicia sesión o regístrate para comenzar!</p>

      {/* Botones para iniciar sesión o registrarse */}
      <button className="btn btn-primary" onClick={goToLogin}>
        Iniciar sesión
      </button>
      <button className="btn btn-secondary" onClick={goToRegister}>
        Registrarse
      </button>
    </div>
  );
}

export default Home;
