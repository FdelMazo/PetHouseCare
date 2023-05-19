import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(3).stores({
  users: '++id,username,role',
  caretakers: 'id',
  homes:'++id,id_user, country, city, typeOfpet, calification'
});

const FIXTURES = {
  homeowners: [
    {
      username: 'Nelson',
      rol: 'DUEÑO'
    },
    {
      username: 'Cristian',
      rol: 'DUEÑO'
    }
  ],
  caretakers: [
    {
      username: 'Sergio',
      rol: 'CUIDADOR'
    },
  ],
  homes: [
    {
      id_user: '1',
      country: 'Argentina',
      city: 'Buenos Aires',
      typeOfpet: 'Perros',
      calification: '5 Estrellas'
    },
    {
      id_user: '2',
      country: 'Argentina',
      city: 'Santa Fe',
      typeOfpet: 'Gatos',
      calification: '1 Estrella'
    }
  ]
}

db.on('populate', async () => {
  await db.users.bulkAdd(FIXTURES.homeowners);
  await db.users.bulkAdd(FIXTURES.caretakers);
  await db.homes.bulkAdd(FIXTURES.homes);
});
