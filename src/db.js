import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(3).stores({
  users: '++id,username,role',
  caretakers: 'id',
  homes:'++id,id_user, country, city, typeOfpet, calification'
});
