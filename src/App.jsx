import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './firebaseContext'; // Importa o contexto do Firebase
import Login from './components/Login';
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import CriarAnuncio from './components/CriarAnuncio';
import Register from './components/Register';

const App = () => {
  return (
    <FirebaseProvider> {/* Envolvendo o app com o provedor do Firebase */}
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/criar-anuncio" element={<CriarAnuncio />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
};

export default App;
