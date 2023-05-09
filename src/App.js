import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { JoinOurTeam } from './Components/JoinOurTeam.js'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Login } from './Components/Login';
import { CaretakerDetail } from './Components/CaretakerDetail';

const router = createHashRouter([
  {
    path: '/',
    element: <JoinOurTeam />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/caretakers/:id',
    element: <CaretakerDetail />
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
