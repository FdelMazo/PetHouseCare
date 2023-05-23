import TarjetaCuidador from './TarjetaCuidador';
import { Input, Container, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css'
import { ROUTES } from '../routes';

export function ListaCuidadores() {
  
  const [cuidadores, setCuidadores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const action = async () => {
      setCuidadores(await db.users.where('role').equals(ROLES.CUIDADOR).toArray());
    }
    action();
  }, []);

  let result = [];
  if (!search){
    result = cuidadores;
  } else {
    result = cuidadores.filter ( (cuidador) => 
                cuidador.nextTrip.location.toLowerCase().includes(search.toLowerCase())
    )
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <Navbar currentRoute={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
      <Input bg="white" color="gray.800" placeholder='Ubicación' value={search} onChange={searcher}/>
        {result.map((cuidador) => {
          return <TarjetaCuidador cuidador={cuidador} key={cuidador.username + cuidador.password} />
        })}
      </Container>
    </>
  )
}
