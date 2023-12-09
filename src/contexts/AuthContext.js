import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    // if (token) {
    //   const decodedJwt = JSON.parse(atob(token.split(".")[1]));
    //   if (decodedJwt.exp * 1000 < Date.now()) {
    //     user = null;
    //   }
    // }
    setUser(user);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;
