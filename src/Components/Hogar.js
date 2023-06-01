import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { db } from '../db';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';
import ReactStars from 'react-stars';
import { itsMyPact } from '../MisPactos';
import { IoIosHome } from 'react-icons/io';

export const Hogar = () => {
  let { id } = useParams();
  const [homeOwner, setHomeOwner] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [myTextEvaluation, setMyTextEvaluation] = useState(null);
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
      const _homeOwner = await db.users.get(parseInt(id));
      setHomeOwner(_homeOwner);
      const ratings = await db.homeownerRatings.where('homeownerId').equals(_homeOwner.id).toArray();
      setRatings(ratings);
      const ratingsWithNumber = ratings.filter(rating => rating.rating);
      const sum = ratingsWithNumber.map(rating => rating.rating).reduce((a, b) => a + b, 0);
      const count = ratingsWithNumber.length;
      const session = await db.session.toCollection().first();
      setCurrentUserId(session.userId);
      setAvgRating(sum / count);
      setRatingCount(count);

      if (user) {
        const pakts = (await db.pakts.toArray()).filter((pakt) => pakt.homeownerId === _homeOwner.id);
        setPacts(pakts.filter((pakt) => itsMyPact(pakt, user)))
      }
    }
    action();
  }, [id, myRating, myTextEvaluation, user]);

  useEffect(() => {
    const action = async () => {
      if (!homeOwner) return
      const session = await db.session.toCollection().first();
      const alreadyRated = await db.homeownerRatings.where('[homeownerId+caretakerId]').equals([homeOwner.id, session.userId]).first()
      if (alreadyRated) {
        setMyRating(alreadyRated.rating);
        setMyTextEvaluation(alreadyRated.text);
      }
    }
    action()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeOwner?.id, id])

  const submitReview = async () => {
    const rating = { caretakerId: currentUserId, homeownerId: homeOwner.id }
    if (myRating) {
      rating.rating = myRating;
    }
    if (myTextEvaluation) {
      rating.text = myTextEvaluation;
    }
    await db.homeownerRatings.put(rating);
  }

  return (
    <>
      <Navbar backTo={ROUTES.HOMEOWNERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent mb={4} p={10} borderRadius={2} maxW="80%" h="fit-content">
        <Card width="100%">
          {homeOwner ? (
            <>
              <CardHeader>
                <Flex>
                  <Icon as={IoIosHome} boxSize={7} mr={1} />
                  <Heading size='lg'>{homeOwner.firstName} {homeOwner.lastName}</Heading>
                </Flex>
                <Text fontSize='sm' color='grey'>Dueño/a</Text>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={6}>

                  {homeOwner.description && <VStack align="flex-start">
                    <Heading fontSize='md' textTransform='uppercase'>
                      Descripción
                    </Heading>
                    <Text fontSize='lg'>
                      {homeOwner.description}
                    </Text>
                  </VStack>}
                  {homeOwner.home?.pets && <VStack align="flex-start">
                    <Heading fontSize='md' textTransform='uppercase'>
                      Mascotas
                    </Heading>
                    <Text fontSize='lg'>
                      {homeOwner.home.pets}
                    </Text>
                  </VStack>}
                  {homeOwner.home?.location && <VStack align="flex-start">
                    <Heading fontSize='md' textTransform='uppercase'>
                      Ubicación
                    </Heading>
                    <Text fontSize='lg'>
                      {homeOwner.home.location}
                    </Text>
                  </VStack>}

                  <VStack align="flex-start" spacing={0}>
                    <Box css={{
                      "& *": {
                        fontSize: "larger !important",
                      }
                    }}>
                      <ReactStars edit={false} value={avgRating} />
                    </Box>
                    <Text fontSize="sm !important">{ratingCount > 0 ? `${ratingCount} reseña(s)` : 'No hay puntuaciones'}</Text>
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
                      <Text fontSize="md" fontWeight={"600"}>Mi puntuación:</Text>
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
                          navigate(ROUTES.HOMEOWNERS)
                        }}
                        isDisabled={!myRating || !myTextEvaluation}
                      >Enviar</Button>
                    </VStack>
                  }
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
