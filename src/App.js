import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Login from './Components/login.js'
import { useDB, DatabaseContext } from './database';

function App() {
  const db = useDB();

  return (
    <ChakraProvider theme={theme}>
      <DatabaseContext.Provider value={db}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Login />
          </Grid>
        </Box>
      </DatabaseContext.Provider>
    </ChakraProvider>
  );
}

export default App;
