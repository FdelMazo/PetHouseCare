import React, { useState } from 'react';
import { ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { JoinOurTeam } from './Components/JoinOurTeam.js';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CaretakerDetail } from './Components/CaretakerDetail';
import { ListaCuidadores } from './Components/ListaCuidadores';
import { ListaHogares } from './Components/ListaHogares';
import { EditProfile } from './Components/EditProfile';
import { UserContext } from './UserContext';
import { ROUTES } from './routes';

const router = createHashRouter([
  {
    path: ROUTES.LOGIN,
    element: <JoinOurTeam />
  },
  {
    path: ROUTES.CARETAKERS,
    element: <ListaCuidadores />
  },
  {
    path: ROUTES.CARETAKER,
    element: <CaretakerDetail />
  },
  {
    path: ROUTES.HOMEOWNERS,
    element: <ListaHogares />
  },
  {
    path: ROUTES.PROFILE,
    element: <EditProfile />
  }
])

function App() {
  const [user, setUser] = useState(null);
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{user, setUser}}>
        <Grid minH='100vh'>
            <RouterProvider router={router}/>
        </Grid>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
