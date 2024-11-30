import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Importa o Firebase Auth
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Métodos para cadastro e atualização do perfil
import '../index.css'; // Importando o CSS fornecido

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Criar o usuário com email e senha no Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

      // Atualizar o perfil do usuário com o nome fornecido
      await updateProfile(userCredential.user, {
        displayName: nome,
      });

      setSuccess('Cadastro realizado com sucesso!');
      
      // Após cadastro, redireciona para a tela de login
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Erro ao criar usuário: ' + err.message);
      console.error('Erro ao criar usuário:', err);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
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
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  );
};

export default Register;
