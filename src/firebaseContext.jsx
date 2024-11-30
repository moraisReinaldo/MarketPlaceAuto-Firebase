import React, { createContext, useContext } from 'react';
import { auth, db } from './firebaseConfig'; // Certifique-se de que o firebaseConfig está configurado corretamente

// Criação do contexto
const FirebaseContext = createContext();

// Provedor do Firebase
export const FirebaseProvider = ({ children }) => {
  const firebase = { auth, db }; // Serviços do Firebase
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useFirebase = () => useContext(FirebaseContext);
