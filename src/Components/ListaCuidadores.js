import TarjetaCuidador from './TarjetaCuidador';
import { Box, Container, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftAddon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';
import { parseISO } from 'date-fns';
import { IoIosAirplane, IoIosArrowDroprightCircle, IoMdPin } from 'react-icons/io';
import ReactStars from 'react-stars';
import { SmallCloseIcon } from '@chakra-ui/icons';

export function ListaCuidadores() {
  const [cuidadores, setCuidadores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingSearch, setRatingSearch] = useState(0);
  const [startingDate, setStartingDate] = useState((new Date(new Date().setDate(new Date().getDate() - 1))).toISOString().split("T")[0]);
  const [endingDate, setEndingDate] = useState((new Date(new Date().setFullYear(new Date().getFullYear() + 1))).toISOString().split("T")[0]);

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
      cuidador.nextTrip?.location.toLowerCase().includes(search.toLowerCase())
    )
  }
  if (startingDate && endingDate && (startingDate <= endingDate)) {
    result = result.filter((cuidador) => {
      if (!cuidador.nextTrip || !cuidador.nextTrip.from || !cuidador.nextTrip.to) return false;
      return cuidador.nextTrip.from <= parseISO(endingDate) && cuidador.nextTrip.to >= parseISO(startingDate);
    })
  }

  return (
    <>
      <Navbar currentRoute={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent mb={4} p={10} borderRadius={2} maxW="80%" h="fit-content">
        <Heading mb={2}>Buscar cuidadores</Heading>
        <VStack mx={4} w="90%" align={"flex-start"}>
          <InputGroup w="70%">
            <InputLeftAddon>
              <Icon as={IoMdPin} boxSize={5} />
            </InputLeftAddon>
            <Input placeholder='Filtrar por ubicación' onChange={(e) => { setSearch(e.target.value) }} />
          </InputGroup>
          <InputGroup alignItems={"center"} w="80%">
            <InputLeftAddon>
              <Icon as={IoIosAirplane} boxSize={5} />
            </InputLeftAddon>
            <Input type="date" onChange={(e) => { setStartingDate(e.target.value); }} value={startingDate} />
            <Icon as={IoIosArrowDroprightCircle} mx={1} />
            <Input type="date" onChange={(e) => { setEndingDate(e.target.value); }} value={endingDate} />
          </InputGroup>
          {startingDate && endingDate && (startingDate > endingDate) && <Text fontSize="xs" color="red">La fecha de inicio no puede ser mayor a la de fin</Text>}
          <Flex alignItems="center">
            <Text mr={2} color="grey" fontSize="lg">
              {ratingSearch > 0 && <Icon mr={1} cursor="pointer" color="red.400" as={SmallCloseIcon} boxSize={5} onClick={() => setRatingSearch(0)}></Icon>}
              Calificación mayor a
            </Text>
            <Box css={{
              "& *": {
                fontSize: "larger !important",
              }
            }}>
              <ReactStars value={ratingSearch} onChange={setRatingSearch}></ReactStars>
            </Box>
          </Flex>

          <Divider border="1px dashed black" />
        </VStack>
        {!result.length &&
          <Text mt={4} fontSize="xl" color="gray.500">No se encontraron cuidadores</Text>
        }
        {result.map((cuidador) => {
          return <TarjetaCuidador ratingFilter={ratingSearch} cuidador={cuidador} key={cuidador.username + cuidador.password} />
        })}
      </Container>
    </>
  )
}
