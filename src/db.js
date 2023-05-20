import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(3).stores({
  users: '++id,username,role',
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
      role: ROLES.CUIDADOR,
      firstName: "Sergio",
      lastName: "M",
      email: "sergio@example.com",
      phone: "123",
      description: "Me encanta cuidar todo tipo de perritos",
      petsCared: "Cuide a charly y a sheen",
      "nextTrip": { "location": "Argentina", "from": "2023-06-23T03: 00: 00.000Z", "to": "2023-06-27T03: 00: 00.000Z" }
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
