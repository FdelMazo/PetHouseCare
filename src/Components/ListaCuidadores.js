import TarjetaCuidador from './TarjetaCuidador';
import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Icon, Input, InputGroup, InputLeftAddon, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css';
import { ROUTES } from '../routes';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import { FaSearch } from 'react-icons/fa';
import { IoIosAirplane, IoIosArrowDroprightCircle, IoIosArrowForward, IoIosArrowRoundForward, IoMdArrowForward, IoMdPaperPlane, IoMdPin, IoMdSearch } from 'react-icons/io';

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
    result = cuidadores.filter((cuidador) =>
                cuidador.nextTrip.location.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (startingDate && endingDate && (startingDate <= endingDate)) {
    result = result.filter((cuidador) => {
      if (!cuidador.nextTrip || !cuidador.nextTrip.from || !cuidador.nextTrip.to) return false;
      return parseISO(cuidador.nextTrip.from) <= parseISO(endingDate) && parseISO(cuidador.nextTrip.to) >= parseISO(startingDate);
    })
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <Navbar currentRoute={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} p={10} borderRadius={2} maxW="80ch" h="fit-content">
        <InputGroup mx={4} w="90%">
          <InputLeftAddon>
            <Icon as={IoMdPin} boxSize={5} />
          </InputLeftAddon>
          <Input bg="white" color="gray.800" placeholder='Ubicación' value={search} onChange={searcher} />
        </InputGroup>
        <InputGroup alignItems={"center"} my={2} mx={4} w="80%">
          <InputLeftAddon>
            <Icon as={IoIosAirplane} boxSize={5} />
          </InputLeftAddon>
          no te olvides fede de agregar un min/max value y un default
          <Input type="date" onChange={(e) => { setStartingDate(e.target.value); }} />
          <Icon as={IoIosArrowDroprightCircle} mx={1} />
          <Input type="date" onChange={(e) => { setEndingDate(e.target.value); }} />
        </InputGroup>
        {startingDate && endingDate && (startingDate > endingDate) && <Text fontSize="xs" color="red">La fecha de inicio no puede ser mayor a la de fin</Text>}
        <Divider border="1px dashed black" />
        {result.map((cuidador) => {
          return <TarjetaCuidador cuidador={cuidador} key={cuidador.username + cuidador.password} />
        })}
      </Container>
    </>
  )
}
