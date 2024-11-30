import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Importa Firestore configurado
import { collection, addDoc } from 'firebase/firestore';
import './CSS/CriarAnuncio.css'; // Estilos para este componente

const CriarAnuncio = () => {
  const [form, setForm] = useState({
    nome: '',
    valor: '',
    desc: '',
    ano: '',
    versao: '',
    linkFoto: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const nome = localStorage.getItem('nome');
    if (!email || !nome) {
      console.log('Usuário não autenticado');
      navigate('/'); // Redireciona para login se não autenticado
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, valor, desc, ano, versao, linkFoto } = form;
    const email = localStorage.getItem('email');
    const nomeUsuario = localStorage.getItem('nome');

    // Validação simples antes de enviar
    if (!nome || !valor || !desc || !ano || !versao || !linkFoto) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (ano < 1900 || ano > new Date().getFullYear()) {
      alert('Insira um ano válido!');
      return;
    }

    if (isNaN(valor) || valor <= 0) {
      alert('O valor precisa ser um número válido maior que 0.');
      return;
    }

    try {
      // Referência à coleção "anuncios" no Firestore
      const anunciosRef = collection(db, 'anuncios');

      // Adiciona o anúncio ao Firestore
      await addDoc(anunciosRef, {
        nome,
        valor: parseFloat(valor), // Garante que o valor é numérico
        desc,
        ano: parseInt(ano), // Garante que o ano é numérico
        versao,
        linkFoto,
        email, // Salvando o email do usuário
        nomeUsuario, // Salvando o nome do usuário
        criadoEm: new Date(), // Adiciona timestamp de criação
      });

      console.log('Anúncio criado com sucesso');
      navigate('/menu'); // Redireciona para o menu
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
    }
  };

  return (
    <div className="criar-anuncio-container">
      <h2>Criar Anúncio</h2>
      <form onSubmit={handleSubmit} className="anuncio-form">
        <div className="input-group">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={form.valor}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <textarea
            name="desc"
            placeholder="Descrição"
            value={form.desc}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="ano"
            placeholder="Ano"
            value={form.ano}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear()}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="versao"
            placeholder="Versão"
            value={form.versao}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="url"
            name="linkFoto"
            placeholder="Link da Foto"
            value={form.linkFoto}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">Criar Anúncio</button>
        <Link to="/menu">
          <button className="login-btn">Retornar ao menu</button>
        </Link>
      </form>
    </div>
  );
};

export default CriarAnuncio;
