import TarjetaCuidador from './TarjetaCuidador';
import { Box, Button, Container, Flex, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css';
import { ROUTES } from '../routes';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

export function ListaCuidadores() {
  
  const [cuidadores, setCuidadores] = useState([]);
  const [search, setSearch] = useState("");
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);

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

  if (startingDate && endingDate && (startingDate <= endingDate)) {
    result = result.filter((cuidador) => {
      if (!cuidador.nextTrip || !cuidador.nextTrip.from || !cuidador.nextTrip.to) return false;

      return parseISO(cuidador.nextTrip.from) <= endingDate && parseISO(cuidador.nextTrip.to) >= startingDate;
    })
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <Navbar currentRoute={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} p={10} borderRadius={2} maxW="80ch" h="fit-content">
        <Input bg="white" color="gray.800" placeholder='Ubicación' value={search} onChange={searcher}/>
        <Text marginTop="10px">Fecha de viaje:</Text>
        <Flex>
          <Box marginRight="10px">
            <FormLabel>
              Desde:
            </FormLabel>
            <DatePicker className="datePicker" selected={startingDate} onChange={(from) => {
              setStartingDate(from);
            }} />
          </Box>
          <Box marginRight="10px">
            <FormLabel>
              Hasta:
            </FormLabel>
            <DatePicker className="datePicker" selected={endingDate} onChange={(to) => {
              setEndingDate(to);
            }} />
          </Box>
          <Box alignSelf="end">
            <Button height="24px" background={"lightgrey"} onClick={() => {
              setStartingDate(null);
              setEndingDate(null);
            }}>Reiniciar</Button>
          </Box>
        </Flex>
        {startingDate && endingDate && (startingDate > endingDate) && <Text color="red">La fecha de inicio no puede ser mayor a la de fin</Text>}
        {result.map((cuidador) => {
          return <TarjetaCuidador cuidador={cuidador} key={cuidador.username + cuidador.password} />
        })}
      </Container>
    </>
  )
}
