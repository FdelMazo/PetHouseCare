import TarjetaCuidador from './TarjetaCuidador';
import { Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';

export function ListaCuidadores() {
  const [cuidadores, setCuidadores] = useState([]);
  useEffect(() => {
    const action = async () => {
      setCuidadores(await db.users.where('role').equals(ROLES.CUIDADOR).toArray());
    }
    action();
  }, []);

  return (
  <Box overflow={"auto"} height={"90vh"} className="lista-cuidadores">
      <Navbar title={"List of Caretakers"} />
      <Container maxW='100%' centerContent={true}>
      {cuidadores.map((cuidador) => {
        return <TarjetaCuidador cuidador={cuidador} key={cuidador.username + cuidador.password}/>
      })}
    </Container>
  </Box>)
}
