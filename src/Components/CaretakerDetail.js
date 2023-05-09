import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { db } from '../db';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CARETAKER = {
  id: '1',
  name: 'Paris Hilton',
  bio: 'Me gustan mucho los perros, en especial los que caben en carteras.',
  trip: {
    startDate: parseISO('2022-01-02T00:00:00'),
    endDate: parseISO('2022-01-22T00:00:00'),
    location: {
      city: 'Buenos Aires',
      country: 'Argentina'
    },
  }
};

const formatDate = (date) =>
  format(date, 'dd/MM/yyyy');

const formatLocation = (location) =>
  `${location.city}, ${location.country}`;

export const CaretakerDetail = () => {
  let { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);

  useEffect(() => {
    async function fetchCaretaker() {
      await db.caretakers.put(CARETAKER);
      setCaretaker(await db.caretakers.get(id));
    }
    fetchCaretaker();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Card>
        {caretaker ? (
          <>
            <CardHeader>
              <Heading size='lg'>{caretaker.name}</Heading>
              <Text fontSize='sm' color='grey'>CUIDADOR/A</Text>
            </CardHeader>
              <CardBody textAlign='left'>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Descripción
                  </Heading>
                  <Text paddingTop='2' fontSize='sm'>
                    {caretaker.bio}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Fechas aproximadas de viaje
                  </Heading>
                  <Box paddingTop='2' flexDirection='row' display='flex'>
                    <Box flexShrink='0' marginRight='2' color='darkslategrey'>
                      <b>{formatDate(caretaker.trip.startDate)}</b>
                      <span> ➜ </span>
                      <b>{formatDate(caretaker.trip.endDate)}</b>
                    </Box>
                    <Box flexBasis='0.7' flexGrow='1'>
                      {`${formatLocation(caretaker.trip.location)}`}
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </CardBody>
          </>
        ) : (
          <Text>No se encontró cuidador/a</Text>
        )
      }
      </Card>
    </Container>
  );
}