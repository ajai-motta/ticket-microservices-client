'use client';
 
import { createContext, useContext, useState } from "react";
 
const AuthContext = createContext(undefined);
 
export default function AuthProvider({user, children}) {
  const [jwt, setJwt] = useState(user);
  return (
    <AuthContext.Provider value={{jwt, setJwt}}> 
      {children} 
    </AuthContext.Provider>
  )
}
 
export function useAuth() {
  const context = useContext(AuthContext);
  return context ? context : null; 
}