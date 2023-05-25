import React from 'react';
import { ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { Login } from './Components/Login.js';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Cuidador } from './Components/Cuidador';
import { ListaCuidadores } from './Components/ListaCuidadores';
import { ListaHogares } from './Components/ListaHogares';
import { MiPerfil } from './Components/MiPerfil';
import { Home } from './Components/Home';
import { ROUTES } from './routes';
import { Hogar } from './Components/Hogar';
import { MisPactos } from './MisPactos';

const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <Home />
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />
  },
  {
    path: ROUTES.CARETAKERS,
    element: <ListaCuidadores />
  },
  {
    path: ROUTES.CARETAKER,
    element: <Cuidador />
  },
  {
    path: ROUTES.HOMEOWNERS,
    element: <ListaHogares />
  },
  {
    path: ROUTES.PROFILE,
    element: <MiPerfil />
  },
  {
    path: ROUTES.HOMEOWNER,
    element: <Hogar />,
  },
  {
    path: ROUTES.MIS_PACTOS,
    element: <MisPactos />,
  },

])

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH='100vh'>
          <RouterProvider router={router}/>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
