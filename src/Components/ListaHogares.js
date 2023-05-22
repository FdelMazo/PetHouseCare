import TarjetaHogar from './TarjetaHogar';
import { Input, Container, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css'
import { ROUTES } from '../routes';

export function ListaHogares() {
    const [homeowners, sethomeowners] = useState([]);
    const [search, setSearch] = useState("");

  useEffect(() => {
    const action = async () => {
        sethomeowners(await db.users.where('role').equals(ROLES.DUEÑO).toArray());
    }
    action();
  }, []);

  let result = [];
  if (!search){
    result = homeowners;
  } else {
    result = homeowners.filter ( (homeowner) => 
                homeowner.home.location.toLowerCase().includes(search.toLowerCase())
    )
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  return (
      <>
          <Navbar currentRoute={ROUTES.HOMEOWNERS} />
          <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
            <Input bg="white" color="gray.800" placeholder='Ubicación' value={search} onChange={searcher}/>
              {result.map((homeowner) => {
                  return <TarjetaHogar homeowner={homeowner} key={homeowner.username + homeowner.password} />
              })}
          </Container>
      </>
  )
}
