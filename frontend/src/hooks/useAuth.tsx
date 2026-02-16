import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email?: string;
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false); // Set to false for now

  // TODO: Implement actual auth with backend
  useEffect(() => {
    // Check for stored session or fetch from backend
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Sign in with", email, password);
    // Mock login
    const mockUser = { id: "mock-id", email };
    setUser(mockUser);
    setSession({ user: mockUser, access_token: "mock-token" });
    setIsAdmin(true);
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    console.log("Sign up with", email, password);
    // Placeholder
    return { error: null };
  };

  const signOut = async () => {
    console.log("Sign out");
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
