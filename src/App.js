import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Register from './Components/register.js'
import { useDB, DatabaseContext } from './database';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
], {basename: "/PetHouseCare"})

function App() {
  const db = useDB();

  return (
    <ChakraProvider theme={theme}>
      <DatabaseContext.Provider value={db}>
        <Box textAlign='center' fontSize='xl'>
          <Grid minH='100vh' p={3}>
            <ColorModeSwitcher justifySelf='flex-end' />
            <RouterProvider router={router}/>
          </Grid>
        </Box>
      </DatabaseContext.Provider>
    </ChakraProvider>
  );
}

export default App;
