// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCh4o-kTFRUziWHggoUPQ5GNVMDhVwEcYw",
    authDomain: "marketplaceauto-2024.firebaseapp.com",
    projectId: "marketplaceauto-2024",
    storageBucket: "marketplaceauto-2024.firebasestorage.app",
    messagingSenderId: "934009426810",
    appId: "1:934009426810:web:60e1035d44558af38a3cc3"
  };
  

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que você precisa
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
