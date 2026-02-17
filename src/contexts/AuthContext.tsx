import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const roleDoc = await getDoc(
          doc(db, "user_roles", firebaseUser.uid)
        );
        setIsAdmin(
          roleDoc.exists() && roleDoc.data()?.role === "admin"
        );
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const { user: googleUser } = await signInWithPopup(auth, googleProvider);
    // Create user profile doc if it doesn't exist yet
    const userDoc = await getDoc(doc(db, "users", googleUser.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", googleUser.uid), {
        name: googleUser.displayName || "",
        email: googleUser.email || "",
        phone: googleUser.phoneNumber || null,
        created_at: serverTimestamp(),
      });
    }
  }

  async function register(email: string, password: string, name: string, phone?: string) {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
    await setDoc(doc(db, "users", newUser.uid), {
      name,
      email,
      phone: phone || null,
      created_at: serverTimestamp(),
    });
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
