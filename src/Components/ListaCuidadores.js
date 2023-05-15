import TarjetaCuidador from './TarjetaCuidador';
import { Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db } from '../db';
import { Roles } from './JoinOurTeam';

export function ListaCuidadores() {

  const [cuidadores, setCuidadores] = useState([]);

  useEffect(() => {
    const action = async () => {
      setCuidadores(await db.users.where('role').equals(Roles.CUIDADOR).toArray());
    }
    action();
  }, []);

  return (
  <Box overflow={"auto"} height={"90vh"} className="lista-cuidadores">
    <Container maxW='100%' centerContent={true}>
      {cuidadores.map((cuidador) => {
        return <TarjetaCuidador cuidador={cuidador} key={cuidador.username + cuidador.password}/>
      })}
    </Container>
  </Box>)
}