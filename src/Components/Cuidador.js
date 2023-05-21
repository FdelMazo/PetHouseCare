import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { db } from '../db';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';

export const Cuidador = () => {
  let { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [ratingFormErrorMessage, setRatingFormErrorMessage] = useState('');

  useEffect(() => {
    const action = async () => {
      const _caretaker = await db.users.get(parseInt(id));
      setCaretaker(_caretaker);
      const ratings = await db.caretakerRatings.where('caretakerId').equals(_caretaker.id).toArray();
      const sum = ratings.reduce((a, b) => a.rating + b.rating, { rating: 0 });
      const count = ratings.length;
      const session = await db.session.toCollection().first();
      setCurrentUserId(session.userId);
      const myRating = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([_caretaker.id, session.userId]).first()
      setMyRating(myRating ? myRating.rating : '');
      setAvgRating(sum / count);
      setRatingCount(count);
    }
    action();
  }, [id, myRating]);

  const setRating = async (rating) => {
    rating = Number(rating);
    if (!rating || rating > 5 || rating < 1) {
      setRatingFormErrorMessage('La reseña es un número del 1 al 5');
      return;
    }
    const myRating = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([caretaker.id, currentUserId]).first();
    if (myRating) {
      myRating.rating = rating;
      await db.caretakerRatings.put(myRating);
    } else {
      await db.caretakerRatings.put({caretakerId: caretaker.id, homeownerId: currentUserId, rating: rating});
    }
    setMyRating(rating);
    setRatingFormErrorMessage('');
  };

  return (
    <>
      <Navbar backTo={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
        <Card width={700}>
          {caretaker ? (
            <>
              <CardHeader>
                <Heading size='lg'>{caretaker.firstName} {caretaker.lastName}</Heading>
                <Text fontSize='sm' color='grey'>Cuidador/a</Text>
              </CardHeader>
              <CardBody textAlign='left'>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Descripción
                    </Heading>
                    <Text paddingTop='2' fontSize='sm'>
                      {caretaker.description}
                    </Text>
                    <Heading size='xs' mt={2} textTransform='uppercase'>
                      Mascotas cuidadas
                    </Heading>
                  </Box>
                  {
                    caretaker.nextTrip &&
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                          Próximo viaje
                        </Heading>
                        <Box paddingTop='2' flexDirection='row' display='flex'>
                          <Box flexShrink='0' marginRight='2' color='darkslategrey'>
                            <span>{new Date(caretaker.nextTrip.from).toLocaleDateString('es-AR')} ➜ {new Date(caretaker.nextTrip.to).toLocaleDateString('es-AR')}</span>
                          </Box>
                          <Box flexBasis='0.7' flexGrow='1'>
                            {caretaker.nextTrip?.location}
                          </Box>
                        </Box>
                    </Box>
                  }
                  <Box>
                    <Text>{ratingCount > 0 ? `${ratingCount} reseñas. Promedio: ${avgRating.toFixed(1)}` : 'No hay puntuaciones'}</Text>
                    <br/>
                    <Text>Mi puntuación (del 1 al 5):</Text>
                    {myRating !== null && <Input type='number'
                            defaultValue={myRating}
                            onChange={(event) => setRating(event.target.value)}
                    />}
                    <Text color={'red'}>{ratingFormErrorMessage}</Text>
                  </Box>
                </Stack>
              </CardBody>
            </>
          ) : (
            <Text padding={5}>No se encontró cuidador/a</Text>
          )
          }
        </Card>
      </Container>
    </>
  );
}