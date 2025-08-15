import { createContext, useContext, useState } from "react";
import { profileData } from "../profileData";
// 1. create context
const UserContext = createContext();

//2.use
export const UseUser = () => useContext(UserContext);

//3. provide
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(profileData);

  const editUser = newUser => {
    const { name, username, avatar, bio } = newUser;
    setUser(prevUser => ({
      ...prevUser,
      name: name,
      bio: bio,
      avatarUrl: avatar,
      username: username,
    }));
  };
  return (
    <>
      <UserContext.Provider value={{ user, setUser, editUser }}>{children}</UserContext.Provider>
    </>
  );
};
