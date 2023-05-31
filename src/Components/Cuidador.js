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
  Flex,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { db } from '../db';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';
import ReactStars from 'react-stars';
import { itsMyPact } from '../MisPactos';
import { IoIosAirplane, IoIosArrowDroprightCircle, IoIosPaw } from 'react-icons/io';
import { FaHandshake } from 'react-icons/fa';

export const Cuidador = () => {
  let { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [myTextEvaluation, setMyTextEvaluation] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [ratingFormErrorMessage, setRatingFormErrorMessage] = useState('');
  const [pacts, setPacts] = useState([]);
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
      const _caretaker = await db.users.get(parseInt(id));
      setCaretaker(_caretaker);
      const ratings = await db.caretakerRatings.where('caretakerId').equals(_caretaker.id).toArray();
      setRatings(ratings);
      const ratingsWithNumber = ratings.filter(rating => rating.rating);
      const sum = ratingsWithNumber.reduce((a, b) => a.rating + b.rating, { rating: 0 });
      const count = ratingsWithNumber.length;
      const session = await db.session.toCollection().first();
      setCurrentUserId(session.userId);
      const myRating = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([_caretaker.id, session.userId]).first()
      setMyRating(myRating ? myRating.rating : '');
      setMyTextEvaluation(myRating ? myRating.text : '');
      setAvgRating(sum / count);
      setRatingCount(count);

      if (user) {
        const pakts = await db.pakts.toArray();
        setPacts(pakts.filter((pakt) => itsMyPact(pakt, user)))
      }
    }
    action();
  }, [id, myRating, myTextEvaluation, user]);

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

  const setTextEvaluation = async (text) => {
    const myRating = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([caretaker.id, currentUserId]).first();
    if (myRating) {
      myRating.text = text;
      await db.caretakerRatings.put(myRating);
    } else {
      await db.caretakerRatings.put({caretakerId: caretaker.id, homeownerId: currentUserId, text: text});
    }
    setMyTextEvaluation(text);
  }

  return (
    <>
      <Navbar backTo={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
        <Card width={700}>
          {caretaker ? (
            <>
              <CardHeader>
                <Flex>
                  <Icon as={IoIosPaw} boxSize={7} mr={1} />
                  <Heading size='lg'>{caretaker.firstName} {caretaker.lastName}</Heading>
                </Flex>
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
                          <Icon as={IoIosAirplane} boxSize={3} mr={1} />
                          Próximo viaje
                        </Heading>
                        <Box paddingTop='2' flexDirection='row' display='flex'>
                          <Box flexBasis='0.7' flexShrink='0' mr={2}>
                            {caretaker.nextTrip?.location}
                          </Box>
                          <Box flexGrow='1' color='darkslategrey'>
                            <span>
                              {new Date(caretaker.nextTrip.from).toLocaleDateString('es-AR')}
                              <Icon as={IoIosArrowDroprightCircle} boxSize={3} mx={1} />
                              {new Date(caretaker.nextTrip.to).toLocaleDateString('es-AR')}
                            </span>
                          </Box>
                        </Box>
                        <Button
                          leftIcon={<Icon as={FaHandshake} />}
                          onClick={async () => {
                        let storeName = {
                          homeownerId: user.id,
                          caretakerId: caretaker.id,
                          accepted: false,
                          startDate: caretaker.nextTrip.from,
                          endDate: caretaker.nextTrip.to,
                        };
                        await db.pakts.put(storeName)
                        navigate(ROUTES.CARETAKERS)
                      }}>Pactar</Button>
                    </Box>
                  }
                  {pacts.some((pact) => pact.endDate < (new Date())) && <Box>
                    <Text>Mi puntuación :</Text>
                    {myRating !== null &&
                        <ReactStars
                            count={5}
                            onChange={(stars) => setRating(stars)}
                            size={24}
                            color2={'#ffd700'}
                            value={myRating} />
                    }
                    <br />
                    <Text>Comentario sobre {caretaker.firstName}:</Text>
                    <Input
                        defaultValue={myTextEvaluation}
                        placeholder='Comentario'
                        onChange={(event) => setTextEvaluation(event.target.value)}
                    />
                    <Text color={'red'}>{ratingFormErrorMessage}</Text>
                  </Box>}
                  <Box>
                    <Text>{ratingCount > 0 ? `${ratingCount} reseña(s). Promedio: ${avgRating.toFixed(1)}` : 'No hay puntuaciones'}</Text>
                    {ratings.filter(rating => rating.text && rating.text.trim()).length ?
                      <>
                        {ratings.map((rating) => (rating.text && rating.text.trim() &&
                          <>
                            <Text>Comentarios:</Text>

                          <Text
                            border="solid 1px lightgrey"
                            padding="5px"
                            marginTop="5px"
                            key={`${rating.caretakerId}${rating.homeownerId}`}
                          >
                            "{rating.text}"
                            </Text>
                          </>))
                        }
                      </> :
                      <Text>No hay comentarios</Text>
                    }
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
