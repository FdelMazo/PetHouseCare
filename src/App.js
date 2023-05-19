import React, { useContext, useState } from 'react';
import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { JoinOurTeam } from './Components/JoinOurTeam.js';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CaretakerDetail } from './Components/CaretakerDetail';
import { ListaCuidadores } from './Components/ListaCuidadores';
import ListaHogares from './Components/ListaHogares';
import { EditCaretakerProfile } from './Components/EditCaretakerProfile';
import { db } from './db';

export const ROUTES = {
  LOGIN: '/',
  OWNER_HOME: '/owner-home',
  CARETAKER: '/caretakers/:id',
  CARETAKER_HOME: '/caretaker-home',
  CARETAKER_PROFILE: '/caretaker_profile',
}

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

const UserContext = React.createContext(null);

export const useUser = () => {
  const {user, setUser} = useContext(UserContext);
  const save = (user) => {
    db.users.put(user)
  }
  return {user, setUser, save}
}

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
