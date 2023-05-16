import React from 'react';
import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { JoinOurTeam } from './Components/JoinOurTeam.js';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CaretakerDetail } from './Components/CaretakerDetail';
import { ListaCuidadores } from './Components/ListaCuidadores';
import ListaHogares from './Components/ListaHogares';

const router = createHashRouter([
  {
    path: '/',
    element: <JoinOurTeam />
  },
  {
    path: '/home',
    element: <ListaCuidadores />
  },
  {
    path: '/caretakers/:id',
    element: <CaretakerDetail />
  },
  {
    path: '/listahogares',
    element: <ListaHogares />
  }
])

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh' p={3}>
          <ColorModeSwitcher justifySelf='flex-end' />
          <RouterProvider router={router}/>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
