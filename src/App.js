import React, { useState } from 'react';
import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { JoinOurTeam } from './Components/JoinOurTeam.js';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CaretakerDetail } from './Components/CaretakerDetail';
import { ListaCuidadores } from './Components/ListaCuidadores';
import ListaHogares from './Components/ListaHogares';
import { EditCaretakerProfile } from './Components/EditCaretakerProfile';
import { UserContext } from './UserContext';
import { ROUTES } from './routes';

const router = createHashRouter([
  {
    path: ROUTES.LOGIN,
    element: <JoinOurTeam />
  },
  {
    path: ROUTES.OWNER_HOME,
    element: <ListaCuidadores />
  },
  {
    path: ROUTES.CARETAKER,
    element: <CaretakerDetail />
  },
  {
    path: ROUTES.CARETAKER_HOME,
    element: <ListaHogares />
  },
  {
    path: ROUTES.CARETAKER_PROFILE,
    element: <EditCaretakerProfile />
  }
])

function App() {
  const [user, setUser] = useState(null);
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{user, setUser}}>
        <Box textAlign='center' fontSize='xl'>
          <Grid minH='100vh' p={3}>
            <ColorModeSwitcher justifySelf='flex-end' />
            <RouterProvider router={router}/>
          </Grid>
        </Box>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
