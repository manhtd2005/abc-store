import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("accountList") || "[]");
    setUsers(storedUsers);
  }, []);

  const addUser = (user) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem("accountList", JSON.stringify(newUsers));
  };

  const deleteUser = (id) => {
    const newUsers = users.filter(u => u.id !== id);
    setUsers(newUsers);
    localStorage.setItem("accountList", JSON.stringify(newUsers));
  };

  const updateUser = (updatedUser) => {
    const newUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(newUsers);
    localStorage.setItem("accountList", JSON.stringify(newUsers));
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
