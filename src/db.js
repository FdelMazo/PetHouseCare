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
      id:1_1,
      username: 'tizzianamazza',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Tizziana",
      lastName: "Mazza",
      email: "tizziana@gmail.com",
      phone: "+549112345678565",
      description: "Viajo muy seguido y necesito gente que cuide mi casa y gato, pelusa.",
      "home": { "location": "Argentina, Buenos Aires", pets: "Cats" }
    },
    {

      id:1_2,
      username: 'lu_laguna',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Lucia",
      lastName: "Laguna",
      email: "lulilaguna@gmail.com",
      phone: "+549112345678569",
      description: "Viajo en septiembre, tengo una gata muy autosuficiente pero necesita que al alimenten.",
      "home": { "location": "Argentina, Mendoza", pets: "Cats" }
    },
    {
      id:1_3,
      username: 'camila_mosteiro',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Camila",
      lastName: "Mosteiro",
      email: "camilamosteiro@gmail.com",
      phone: "+549112345678566",
      description: "Tengo que viajar por trabajo 2 meses, tengo un golden muy tranquilo.",
      "home": { "location": "Argentina, Buenos Aires", pets: "Dogs" }
    },
    {
      id:1_4,
      username: 'mariano_perez',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Mariano",
      lastName: "Perez",
      email: "marianoperez@gmail.com",
      phone: "+549112345678545",
      description: "Tengo programado un viaje de una semana en julio, tengo 3 perros chiquitos.",
      "home": { "location": "Uruguay, Colonia", pets: "Dogs" }
    },
    {
      id:1_5,
      username: 'oscar_carmelo',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Oscar",
      lastName: "Carmelo",
      email: "oscarcarmelo@gmail.com",
      phone: "+549112345678356",
      description: "Viajo todos los veranos con mi familia, y necesitamos quien cuide de nuestros perros. Tenemos un dalmata y dos doggos",
      "home": { "location": "Argentina, Bariloche", pets: "Dogs" }
    },
    {
      id:1_6,
      username: 'olga_marino',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Olga",
      lastName: "Marino",
      email: "olgamarino@gmail.com",
      phone: "+549112345678358",
      description: "Tengo un viaje con mis amigos, los jubilados, esta primavera. Tengo una casa grande, en el centro de Entre Rios, cerca de las termas. Tengo 4 gatitos y dos loros",
      "home": { "location": "Argentina, Entre Rios", pets: "Cats and parrots" }
    },
    {
      id:1_7,
      username: 'martita123',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Marta",
      lastName: "Murillo",
      email: "martamurillo@gmail.com",
      phone: "+549112345678312",
      description: "Me voy varias veces al año. Estoy cerca de las Cataratas del Iguazú. Soy dueña de una tortuga y un beagle. Muy amigables ambos!! ",
      "home": { "location": "Argentina, Misiones", pets: "Dogs and tortoise" }
    },
    {
      id:1_8,
      username: 'patricio_moore',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Patricio",
      lastName: "Moore",
      email: "patriciomoore@gmail.com",
      phone: "+549112345678333",
      description: "Me voy dos semanas de viaje, necesito ayuda de alguien con experiencia para cuidar a mi pato y mis conejos. Tengo un campito.",
      "home": { "location": "Argentina, Buenos Aires", pets: "Ducks and rabbits" }
    },
    {
      id:1_9,
      username: 'marialaura',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Maria Laura",
      lastName: "Reta",
      email: "lauritareta@gmail.com",
      phone: "+549112345678313",
      description: "Hola! Tengo un viaje programado para agosto, acompaño a mi hijo de viaje de egresados, y mi perro y mi gato quedan sin cuidado alguno.",
      "home": { "location": "Argentina, Salta", pets: "Dogs and cats" }
    },
    {
      id:1_10,
      username: 'sol_s',
      password: '1234',
      role: ROLES.DUEÑO,
      firstName: "Sol",
      lastName: "Strash",
      email: "sol_s@gmail.com",
      phone: "+549112345444313",
      description: "Necesito cuidador/a para mi gata. Tiempo: 2 semanas, en noviembre",
      "home": { "location": "Argentina, Bariloche", pets: "Cats" }
    },
  ],
  caretakers: [
      //Viaje a futuro
    {
      id: 2_1,
      username: 'sergio',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Sergio",
      lastName: "Caballero",
      email: "sergio@mail.com",
      phone: "+54911234544223",
      description: "Me encanta cuidar todo tipo de perritos.",
      "nextTrip": { "location": "Argentina, Bariloche", "from": new Date("2024-01-15T03:00:00.000Z"), "to": new Date("2024-02-01T03:00:00.000Z") }
    },
      //Viaje en curso 1
    {
      id: 2_2,
      username: 'facundo',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Facundo",
      lastName: "Armano",
      email: "facundoarmano@mail.com",
      phone: "+549114212345",
      description: "Soy veterinario, y me estoy tomando unos meses para recorrer la argentina. Estoy apto para el cuidado de todo tipo de mascota!",
      "nextTrip": { "location": "Argentina, Entre Rios", "from": new Date("2023-09-20T03:00:00.000Z"), "to": new Date("2023-10-05T03:00:00.000Z") }
    },
    // Viaje a futuro
    {
      id: 2_3,
      username: 'mica_g',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Micaela",
      lastName: "Gonzalez",
      email: "micagonzalez@mail.com",
      phone: "+549114212355",
      description: "Soy una chica de 20 años, con ganas de viajar y conocer. Creci rodeada de muchos animales.",
      "nextTrip": { "location": "Argentina, Cataratas del Iguazú", "from": new Date("2023-05-05T03:00:00.000Z"), "to": new Date("2023-07-27T03:00:00.000Z") }
    },
      //Viaje a futuro
    {
      id: 2_4,
      username: 'yanina',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Yanina",
      lastName: "Hornos",
      email: "yaninahornos@mail.com",
      phone: "+549114212322",
      description: "Tengo 30 años y viajo siempre con dos amigas. Las tres trabajamos home office, por lo que estariamos mucho tiempo dentro, " +
          "cuidando a sus mascotas.",
      "nextTrip": { "location": "Argentina, Buenos Aires", "from": new Date("2023-08-23T03:00:00.000Z"), "to": new Date("2023-09-06T03:00:00.000Z") }
    },
      // Viaje a futuro
    {
      id: 2_5,
      username: 'nicolas',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Nicolas",
      lastName: "Menendez",
      email: "nicolasmenendez@mail.com",
      phone: "+549114212311",
      description: "Viajamos por el pais con mi novia y nuestro perrito, un Border Collie, mas que amigable. Ya hemos viajado infinidad de veces con él, " +
          "por lo que sabe comportarse en otros lugares que no son su casa, y siempre viajamos con amigos y sus mascotas, asi que se lleva bien con" +
          "otros animales.",
      "nextTrip": { "location": "Argentina, Mendoza", "from": new Date("2023-08-23T03:00:00.000Z"), "to": new Date("2023-09-25T03:00:00.000Z") }
    },
      // Viaje en curso 2
    {
      id: 2_6,
      username: 'pedro',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Pedro",
      lastName: "Calco",
      email: "pedrocalco@mail.com",
      phone: "+549114212331",
      description: "Viajo solo, un mes, para Buenos Aires, por trabajo. Tengo experiencia cuidando gatos, ya que crecí con ellos.",
      "nextTrip": { "location": "Argentina, Mendoza", "from": new Date("2023-05-28T03:00:00.000Z"), "to": new Date("2023-06-28T03:00:00.000Z") }
    },
      //Viaje a futuro
    {
      id: 2_7,
      username: 'sofia',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Sofia",
      lastName: "Paula",
      email: "sofiapaula@mail.com",
      phone: "+549111112331",
      description: "Viajo a la costa Argentina el fin de semana largo de octubre. Me gusta cuidar gatos y perros, pero puedo cuidar cualquier mascota.",
      "nextTrip": { "location": "Argentina, Buenos Aires, costa atlantica", "from": new Date("2023-10-13T03:00:00.000Z"), "to": new Date("2023-10-16T03:00:00.000Z") }
    },
    //Viaje a futuro
    {
      id: 2_8,
      username: 'Ana',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Ana",
      lastName: "Coluccio",
      email: "anacoluccio@mail.com",
      phone: "+549111112222",
      description: "Hola! Viajo para Salta en agosto. Sólo tengo experiencia cuidando gatos y perros.",
      "nextTrip": { "location": "Argentina, Salta", "from": new Date("2023-08-13T03:00:00.000Z"), "to": new Date("2023-08-24T03:00:00.000Z") }
    },
    //Viaje a futuro
    {
      id: 2_9,
      username: 'pancho',
      password: '1234',
      role: ROLES.CUIDADOR,
      firstName: "Pancho",
      lastName: "Pan",
      email: "panchopan@mail.com",
      phone: "+54911133222",
      description: "Cuido todos los animales que existen, porque los amo. Los viajes en los que puedo cuidar animales me alegran el alma.",
      "nextTrip": { "location": "Argentina, Jujuy", "from": new Date("2023-12-20T03:00:00.000Z"), "to": new Date("2024-01-02T03:00:00.000Z") }
    },
  ],
  // no puede haber mas de un pacto actual para un usuario
  pakts: [
      // Pactos Historicos
    {
      accepted: true,
      homeownerId:1_8,
      caretakerId: 2_2,
      endDate: new Date("2022-05-27T03:00:00.000Z"),
      startDate: new Date("2022-05-23T03:00:00.000Z")
    },
    {
      accepted: true,
      homeownerId:1_2,
      caretakerId: 2_6,
      endDate: new Date("2022-09-27T03:00:00.000Z"),
      startDate: new Date("2022-10-10T03:00:00.000Z")
    },
    {
      accepted: true,
      homeownerId:1_10,
      caretakerId: 2_6,
      endDate: new Date("2023-01-01T03:00:00.000Z"),
      startDate: new Date("2023-01-25T03:00:00.000Z")
    },
    // Pactos actuales aceptados
    {
      accepted: true,
      homeownerId:1_1,
      caretakerId: 2_6,
      startDate: new Date("2023-05-28T03:00:00.000Z"),
      endDate: new Date("2023-06-28T03:00:00.000Z")
    },
    {
      accepted: true,
      homeownerId:1_5,
      caretakerId: 2_1,
      startDate: new Date("2024-01-15T03:00:00.000Z"),
      endDate: new Date("2024-02-01T03:00:00.000Z")
    },
    {
      accepted: true,
      homeownerId:1_2,
      caretakerId: 2_5,
      startDate: new Date("2023-08-23T03:00:00.000Z"),
      endDate: new Date("2023-09-25T03:00:00.000Z")
    },
    {
      accepted: true,
      homeownerId:1_6,
      caretakerId: 2_2,
      startDate: new Date("2023-09-23T03:00:00.000Z"),
      endDate: new Date("2023-10-05T03:00:00.000Z")
    },
    {

      accepted: true,
      homeownerId:1_7,
      caretakerId: 2_3,
      startDate: new Date("2023-05-05T03:00:00.000Z"),
      endDate: new Date("2023-07-27T03:00:00.000Z")
    },
      // Pactos por aceptar
    {
      accepted: false,
      homeownerId:1_8,
      caretakerId: 2_4,
      startDate: new Date("2023-08-23T03:00:00.000Z"),
      endDate: new Date("2023-09-06T03:00:00.000Z")
    },
  ],

  // RATE
  homeownersRating: [
    {
      homeownerId: 1_8,
      caretakerId: 2_2,
      rating: 3.5
    },
    {
      homeownerId: 1_2,
      caretakerId: 2_6,
      rating: 5
    },

  ],
  caretakerRating: [
    {
      caretakerId: 2_2,
      homeownerId: 1_8,
      rating: 3
    },
    {
      caretakerId: 2_6,
      homeownerId: 1_2,
      rating: 4.5
    },
    {
      caretakerId: 2_6,
      homeownerId: 1_10,
      rating: 4
    },
  ]
}

db.on('populate', async () => {
  await db.users.bulkAdd(FIXTURES.homeowners);
  await db.users.bulkAdd(FIXTURES.caretakers);
  await db.pakts.bulkAdd(FIXTURES.pakts);
  await db.caretakerRatings.bulkAdd(FIXTURES.caretakerRating);
  await db.homeownerRatings.bulkAdd(FIXTURES.homeownersRating);
});
