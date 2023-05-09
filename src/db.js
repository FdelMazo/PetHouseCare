import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(1).stores({
  users: '++id,username',
  caretakers: 'id',
});
