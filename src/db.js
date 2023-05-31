import Dexie from 'dexie';

export const db = new Dexie('pethousecare');
window.__db = db;
db.version(10).stores({
  users: '++id,username,role',
  session: 'userId',
  caretakerRatings: '[caretakerId+homeownerId],rating',
  homeownerRatings: '[homeownerId+caretakerId],rating',
  pakts: '[caretakerId+homeownerId]'
}).upgrade((trans) => {
  trans.table("homeownerRatings").toCollection().modify(homeOwnerRating => {
  })
});

export const ROLES = {
  CUIDADOR: 'cuidador',
  DUEÑO: 'dueño'
};

const FIXTURES = {
  homeowners: [
    {
      username: 'nelson',
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
      username: 'sergio',
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
