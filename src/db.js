import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(3).stores({
  users: '++id,username,role',
  caretakers: 'id',
  homes:'++id,id_user, country, city, typeOfpet, calification'
});

export const ROLES = {
  CUIDADOR: 'cuidador',
  DUEÑO: 'dueño'
};

const FIXTURES = {
  homeowners: [
    {
      username: 'Nelson',
      role: ROLES.DUEÑO
    },
    {
      username: 'Cristian',
      role: ROLES.DUEÑO
    }
  ],
  caretakers: [
    {
      username: 'Sergio',
      role: ROLES.CUIDADOR
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
