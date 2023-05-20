import TarjetaCuidador from './TarjetaCuidador';
import { Container, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css'

export function ListaCuidadores() {
  const [cuidadores, setCuidadores] = useState([]);
  useEffect(() => {
    const action = async () => {
      setCuidadores(await db.users.where('role').equals(ROLES.CUIDADOR).toArray());
    }
    action();
  }, []);

  return (
    <>
      <Navbar title={"List of Caretakers"} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
        {cuidadores.map((cuidador) => {
          return <TarjetaCuidador cuidador={cuidador} key={cuidador.username + cuidador.password} />
        })}
      </Container>
    </>
  )
}
