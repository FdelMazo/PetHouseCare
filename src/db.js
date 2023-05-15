import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(2).stores({
  users: '++id,username,role',
  caretakers: 'id',
});
