import { createContext, useState } from "react";

const AuthContext = createContext({
  user: null,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;
