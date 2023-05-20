import TarjetaHogar from './TarjetaHogar';
import { Container, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css'

export function ListaHogares() {
    const [homeowners, sethomeowners] = useState([]);
  useEffect(() => {
    const action = async () => {
        sethomeowners(await db.users.where('role').equals(ROLES.DUEÑO).toArray());
    }
    action();
  }, []);

  return (
      <>
          <Navbar title={"List of Homes"} />
          <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
              {homeowners.map((homeowner) => {
                  return <TarjetaHogar homeowner={homeowner} key={homeowner.username + homeowner.password} />
              })}
          </Container>
      </>
  )
}
