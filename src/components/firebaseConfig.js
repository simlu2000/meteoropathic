// Importa le funzioni necessarie dall'SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// La tua configurazione Firebase per la tua web app
const firebaseConfig = {
  apiKey: "AIzaSyDBvHMedO6EZYR3ZF13Psbx2g6rP4zlOJ8",
  authDomain: "meteoropathic.firebaseapp.com",
  projectId: "meteoropathic",
  storageBucket: "meteoropathic.appspot.com",
  messagingSenderId: "14718987119",
  appId: "1:14718987119:web:bb61b30f801b68cbc0969a",
  measurementId: "G-SJB3X4SPC7"
};

// Inizializza Firebase con la tua configurazione
const app = initializeApp(firebaseConfig);

// Ottieni l'oggetto auth per l'autenticazione
const auth = getAuth(app);

// Esporta l'oggetto auth in modo che possa essere utilizzato altrove nel tuo progetto
export { auth,createUserWithEmailAndPassword };
