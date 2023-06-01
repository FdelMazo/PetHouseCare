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
  VStack,
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
  const [myRating, setMyRating] = useState(0);
  const [myTextEvaluation, setMyTextEvaluation] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [pacts, setPacts] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
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
      const sum = ratingsWithNumber.map(rating => rating.rating).reduce((a, b) => a + b, 0);
      const count = ratingsWithNumber.length;
      const session = await db.session.toCollection().first();
      setCurrentUserId(session.userId);
      setAvgRating(sum / count);
      setRatingCount(count);

      if (user) {
        const pakts = (await db.pakts.toArray()).filter((pakt) => pakt.caretakerId === _caretaker.id);
        setPacts(pakts.filter((pakt) => itsMyPact(pakt, user)))
      }
    }
    action();
  }, [id, myRating, myTextEvaluation, user]);

  useEffect(() => {
    const action = async () => {
      if (!caretaker) return
      const session = await db.session.toCollection().first();
      const alreadyRated = await db.caretakerRatings.where('[caretakerId+homeownerId]').equals([caretaker.id, session.userId]).first()
      if (alreadyRated) {
        setMyRating(alreadyRated.rating);
        setMyTextEvaluation(alreadyRated.text);
      }
    }
    action()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caretaker?.id, id])

  const submitReview = async () => {
    const rating = { caretakerId: caretaker.id, homeownerId: currentUserId }
    if (myRating) {
      rating.rating = myRating;
    }
    if (myTextEvaluation) {
      rating.text = myTextEvaluation;
    }
    await db.caretakerRatings.put(rating);
  }

  return (
    <>
      <Navbar backTo={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent mb={4} p={10} borderRadius={2} maxW="80%" h="fit-content">
        <Card width="100%">
          {caretaker ? (
            <>
              <CardHeader>
                <Flex>
                  <Icon as={IoIosPaw} boxSize={7} mr={1} />
                  <Heading size='lg'>{caretaker.firstName} {caretaker.lastName}</Heading>
                </Flex>
                <Text fontSize='sm' color='grey'>Cuidador/a</Text>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={6}>
                  {caretaker.description && <>
                    <VStack align="flex-start">
                      <Heading fontSize='md' textTransform='uppercase'>
                        Descripción
                      </Heading>
                      <Text fontSize='lg'>
                        {caretaker.description}
                      </Text>
                    </VStack>
                  </>}
                  {caretaker.nextTrip &&
                    <VStack align="flex-start">
                      <Heading fontSize='md' textTransform='uppercase'>
                        Próximo viaje
                      </Heading>
                      <Flex alignItems={"center"} fontSize={"lg"}>
                        <Text>{caretaker.nextTrip?.location}</Text>
                        <Icon as={IoIosAirplane} boxSize={4} mx={2} />
                        <Text>
                          {new Date(caretaker.nextTrip.from).toLocaleDateString('es-AR')}
                          <Icon as={IoIosArrowDroprightCircle} boxSize={3} mx={1} />
                          {new Date(caretaker.nextTrip.to).toLocaleDateString('es-AR')}
                        </Text>
                      </Flex>
                      <Button
                        _hover={{ bgGradient: 'linear(to-r, red.400,pink.400)' }}
                        leftIcon={<Icon as={FaHandshake} boxSize={5} />}
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
                    </VStack>
                  }

                  <VStack align="flex-start" spacing={0}>
                    <Box css={{
                      "& *": {
                        fontSize: "larger !important",
                      }
                    }}>
                      <ReactStars edit={false} value={avgRating} />
                    </Box>
                    <Text fontSize="sm !important" >{ratingCount > 0 ? `${ratingCount} reseña(s)` : 'No hay puntuaciones'}</Text>
                    <VStack align="flex-start" spacing={1}>
                      {ratings.filter(rating => rating.text && rating.text.trim()).length &&
                        ratings.map((rating) => (rating.text && rating.text.trim() &&
                          <Text
                            border="solid 1px lightgrey"
                            borderRadius={2}
                            p={2}
                            key={`${rating.caretakerId}${rating.homeownerId}`}
                          >
                            "{rating.text}"
                          </Text>
                        ))
                      }
                    </VStack>
                  </VStack>

                  {pacts.some((pact) => pact.endDate < (new Date())) &&
                    <VStack align="flex-start">
                      <Text fontSize="md" fontWeight={"600"}>Contanos tu experiencia con {caretaker.firstName}!</Text>
                      <Box>
                        <Box css={{
                          "& *": {
                            fontSize: "x-large !important",
                          }
                        }}>
                          <ReactStars
                            onChange={(stars) => setMyRating(stars)}
                            color2={'#ffd700'}
                            value={myRating} />
                        </Box>
                        <Input
                          defaultValue={myTextEvaluation}
                          placeholder='Comentario'
                          onChange={(event) => setMyTextEvaluation(event.target.value)}
                        />
                      </Box>
                      <Button
                        onClick={async () => {
                          await submitReview();
                          navigate(ROUTES.CARETAKERS)
                        }}
                        isDisabled={!myRating || !myTextEvaluation}
                      >Enviar</Button>

                    </VStack>
                  }
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
