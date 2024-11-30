import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig'; // Importa Firestore e Auth
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './CSS/Menu.css'; // Certifique-se de ter esse arquivo de estilo CSS

const Menu = () => {
  const [anuncios, setAnuncios] = useState([]); // Armazena todos os anúncios
  const [user, setUser] = useState(null); // Armazena os dados do usuário logado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          nome: currentUser.displayName || 'Usuário',
          email: localStorage.getItem('email'), // Recupera o email do localStorage
        });
        await fetchAnuncios();
      } else {
        console.log('Usuário não autenticado');
        navigate('/'); // Redireciona para login se o usuário não estiver autenticado
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchAnuncios = async () => {
    try {
      const anunciosRef = collection(db, 'anuncios'); // Coleção de anúncios no Firestore
      const q = query(anunciosRef);
      const querySnapshot = await getDocs(q);

      const anunciosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnuncios(anunciosData); // Atualiza a lista de anúncios
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const anuncioRef = doc(db, 'anuncios', id); // Referência ao documento do anúncio
      await deleteDoc(anuncioRef); // Deleta o anúncio
      setAnuncios((prev) => prev.filter((anuncio) => anuncio.id !== id)); // Remove o anúncio da lista localmente
      console.log('Anúncio deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar anúncio:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Faz logout do Firebase Auth
      navigate('/'); // Redireciona para o login
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const goToCriarAnuncio = () => {
    navigate('/criar-anuncio');
  };

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h2>Menu</h2>
        {user && <h3>Bem-vindo, {user.nome}</h3>}
      </header>

      <div className="button-group">
        <button onClick={handleLogout} className="logout-button">Sair</button>
        <button onClick={goToCriarAnuncio} className="create-anuncio-button">Criar Anúncio</button>
      </div>

      <h3>Lista de Anúncios</h3>
      <ul className="anuncios-list">
        {anuncios.map((anuncio) => (
          <li key={anuncio.id} className="anuncio-item">
            <img src={anuncio.linkFoto} alt={anuncio.nome} className="anuncio-img" />
            <div className="anuncio-info">
              <p><strong>{anuncio.nome}</strong> - {anuncio.valor}</p>
              <p>{anuncio.desc}</p>
              <p>{anuncio.ano} - {anuncio.versao}</p>
              <p><em>Proprietário: {anuncio.nomeUsuario + " Contato: " + anuncio.email || 'Desconhecido'}</em></p>
              {user && anuncio.email === user.email && ( // Compara o email do anúncio com o email do usuário logado
                <button onClick={() => handleDelete(anuncio.id)} className="delete-button">Apagar Anúncio</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
