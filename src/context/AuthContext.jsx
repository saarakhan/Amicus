import { createContext, useContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

//1. create a context
const AuthContext = createContext();

//2. hook to access auth context
export const UseAuth = () => useContext(AuthContext);

//3. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const login = async verifyUser => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("No account found, please register first!");
      return false;
    }

    const userData = JSON.parse(storedUser);
    if (userData.email !== verifyUser.email) {
      toast.error("Wrong credentials");
      return false;
    }

    const isPass = await bcrypt.compare(verifyUser.password, userData.password);
    if (!isPass) {
      toast.error("Incorrect password");
      return false;
    }

    const fakeToken = Math.random().toString(36).substring(2);
    const user = { ...userData, token: fakeToken };

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Logged in successfully!");
    return true;
  };

  const logout = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      delete storedUser.token;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }
    setUser(null);
  };

  const isAuthenticated = user?.token ? true : false;
  const signup = async newUser => {
    try {
      // hash the password
      const hashedPass = await bcrypt.hash(newUser.password, 10);
      //check in localstorage if user exists or not
      const userWithPass = {
        ...newUser,
        password: hashedPass,
      };
      setUser(userWithPass);
      localStorage.setItem("user", JSON.stringify(userWithPass));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};
