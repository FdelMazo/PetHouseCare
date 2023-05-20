import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(4).stores({
  users: '++id,username,role',
});

export const ROLES = {
  CUIDADOR: 'cuidador',
  DUEÑO: 'dueño'
};

const FIXTURES = {
  homeowners: [
    {
      username: 'Nelson',
      role: ROLES.DUEÑO,
      firstName: "Nelson",
      lastName: "M",
      email: "nelson@example.com",
      phone: "135",
      description: "Viajo muy seguido y necesito gente que cuide mi casa y gato",
      "home": { "location": "Argentina", pets: "Cats" }
    },
  ],
  caretakers: [
    {
      username: 'Sergio',
      role: ROLES.CUIDADOR,
      firstName: "Sergio",
      lastName: "C",
      email: "sergio@example.com",
      phone: "123",
      description: "Me encanta cuidar todo tipo de perritos",
      "nextTrip": { "location": "Argentina", "from": "2023-06-23T03:00:00.000Z", "to": "2023-06-27T03:00:00.000Z" }
    },
  ],
}

db.on('populate', async () => {
  await db.users.bulkAdd(FIXTURES.homeowners);
  await db.users.bulkAdd(FIXTURES.caretakers);
});
