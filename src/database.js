import React from "react";
import Loki from "lokijs";

export const DatabaseContext = React.createContext(null);
export const useDB = () => {
  const db = new Loki('pethousecare', {
    autosave: true,
    autoload: true,
    verbose: true,
  })
  const users = db.addCollection('users')
  users.insert({ name: 'user', password: 'password' })
  return db
};
