import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC737nbYIKErLw71K1kcMioB6x60d9oNsc",
  authDomain: "x-plainer-63d76.firebaseapp.com",
  projectId: "x-plainer-63d76",
  storageBucket: "x-plainer-63d76.appspot.com",
  messagingSenderId: "577189006239",
  appId: "1:577189006239:web:930de6eacc74e8550b0baa",
  measurementId: "G-GB41N337TL"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
