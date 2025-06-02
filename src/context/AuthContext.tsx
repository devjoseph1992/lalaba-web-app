// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

// Define the shape of our context
interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, name: string) => Promise<any>;
  sendVerificationEmail: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signup: async () => {},
  sendVerificationEmail: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // Send email verification
    await sendEmailVerification(userCredential.user);

    return userCredential;
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    sendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
