import React from "react";
import Loki from "lokijs";

export const DatabaseContext = React.createContext(null);
export const useDB = () => {
  const db = new Loki('pethousecare', {
    autosave: true,
    autoload: true,
    verbose: true,
  })
  db.addCollection('users');
  return db
};
