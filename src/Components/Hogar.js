import {
  Box, Button,
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
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';

export const Hogar = () => {
  let { id } = useParams();
  const [homeOwner, setHomeOwner] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [ratingFormErrorMessage, setRatingFormErrorMessage] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser () {
      const session = await db.session.toCollection().first();
      const _user = await db.users.where('id').equals(session.userId).first();
      if (!_user) {
        navigate(ROUTES.LOGIN, { relative: 'path' });
      }
      setUser(_user);
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const action = async () => {
      const _homeOwner = await db.users.get(parseInt(id));
      setHomeOwner(_homeOwner);
      const ratings = await db.caretakerRatings.where('caretakerId').equals(_homeOwner.id).toArray();
      const sum = ratings.reduce((a, b) => a.rating + b.rating, { rating: 0 });
      const count = ratings.length;
      const session = await db.session.toCollection().first();
      setCurrentUserId(session.userId);
      const myRating = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([_homeOwner.id, session.userId]).first()
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
    const myRating = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([homeOwner.id, currentUserId]).first();
    if (myRating) {
      myRating.rating = rating;
      await db.caretakerRatings.put(myRating);
    } else {
      await db.caretakerRatings.put({caretakerId: homeOwner.id, homeownerId: currentUserId, rating: rating});
    }
    setMyRating(rating);
    setRatingFormErrorMessage('');
  };

  return (
    <>
      <Navbar backTo={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
        <Card width={700}>
          {homeOwner ? (
            <>
              <CardHeader>
                <Heading size='lg'>{homeOwner.firstName} {homeOwner.lastName}</Heading>
                <Text fontSize='sm' color='grey'>Dueño/a</Text>
              </CardHeader>
              <CardBody textAlign='left'>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Descripción
                    </Heading>
                    <Text paddingTop='2' fontSize='sm'>
                      {homeOwner.description}
                    </Text>
                    <Heading size='xs' mt={2} textTransform='uppercase'>
                      Sus mascotas
                    </Heading>
                    <Text paddingTop='2' fontSize='sm'>
                      {homeOwner.home.pets}
                    </Text>
                    <Heading size='xs' mt={2} textTransform='uppercase'>
                      Ubicación
                    </Heading>
                    <Text paddingTop='2' fontSize='sm'>
                      {homeOwner.home.location}
                    </Text>
                  </Box>
                  {
                    homeOwner.nextTrip &&
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                          Próximo viaje
                        </Heading>
                        <Box paddingTop='2' flexDirection='row' display='flex'>
                          <Box flexShrink='0' marginRight='2' color='darkslategrey'>
                            <span>{new Date(homeOwner.nextTrip.from).toLocaleDateString('es-AR')} ➜ {new Date(homeOwner.nextTrip.to).toLocaleDateString('es-AR')}</span>
                          </Box>
                          <Box flexBasis='0.7' flexGrow='1'>
                            {homeOwner.nextTrip?.location}
                          </Box>
                        </Box>
                      <Button onClick={async () => {
                        let storeName = {
                          homeownerId: user.id,
                          caretakerId: homeOwner.id,
                          accepted: false
                        };
                        await db.pakts.put(storeName)
                        navigate(ROUTES.CARETAKERS)
                      }}>Pactar</Button>
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
            <Text padding={5}>No se encontró dueño/a</Text>
          )
          }
        </Card>
      </Container>
    </>
  );
}
