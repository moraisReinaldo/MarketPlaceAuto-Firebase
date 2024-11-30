import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Importa o Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa o método de login
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); // Substituído por email
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Tenta logar o usuário com email e senha no Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      
      // Armazena o UID, email e nome do usuário no localStorage
      localStorage.setItem('uid', userCredential.user.uid);
      localStorage.setItem('email', userCredential.user.email); // Armazena o email
      localStorage.setItem('nome', userCredential.user.displayName || 'Usuário'); // Armazena o nome (se disponível)

      // Redireciona para a página de menu
      navigate('/menu');
    } catch (err) {
      // Mostra mensagem de erro ao usuário
      setError('Usuário ou senha inválidos');
      console.error('Erro de login:', err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Entrar</button>

      {/* Link para a página de Cadastro */}
      <p>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
