import TarjetaHogar from './TarjetaHogar';
import { Box, Button, Container, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftAddon, Text, VStack, useColorModeValue, Card, StackDivider } from '@chakra-ui/react';
import { IoIosHome, IoMdPin } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { FaHandshake } from 'react-icons/fa';

export function ListaHogares() {
    const [homeowners, sethomeowners] = useState([]);
    const [search, setSearch] = useState('');
    const [ratingSearch, setRatingSearch] = useState(0);
    const [pactos, setPactos] = useState([]);
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
    const navigate = useNavigate();


    useEffect(() => {
        const action = async () => {
            sethomeowners(await db.users.where('role').equals(ROLES.DUEÑO).toArray());
            setPactos(await db.pakts.toArray());
        };
        action();
    }, []);


    let result = [];
    if (!search) {
        result = homeowners;
    } else {
        result = homeowners.filter((homeowner) =>
            homeowner.home?.location.toLowerCase().includes(search.toLowerCase()),
        );
    }


    function findHomeOwner(pacto) {
        return homeowners.find((homeowner) => homeowner.id === pacto.homeownerId);
    }

    const findName = (pacto) => {
        return findHomeOwner(pacto).username;
    };

    return (
        <>
            <Navbar currentRoute={ROUTES.HOMEOWNERS} />
            <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent mb={4} p={10} borderRadius={2} maxW="80%" h="fit-content">
                {!!pactos.filter((pacto) => !pacto.accepted && pacto.caretakerId === user.id).length && <>
                    <Heading textAlign={"center"}>Estos dueños de hogares quieren hacer un pacto contigo</Heading>
                    <Card w="60%" bgGradient='linear(to-r, red.400,pink.400)' p={4} m={2}>
                        <VStack align={'space-between'} divider={<StackDivider borderStyle={"dashed"} />} spacing={2}>
                            {pactos.filter((pacto) => !pacto.accepted && pacto.caretakerId === user.id).map((pacto) => {
                                return <Flex justifyContent={'space-between'}>
                                    <Flex>
                                        <Icon color="white" as={IoIosHome} boxSize={7} mr={1} />
                                        <Text color={'white'} fontSize={'25'} fontWeight={'800'}>@{findName(pacto)}</Text>
                                    </Flex>
                                    <Button
                                        leftIcon={<Icon as={FaHandshake} boxSize={5} />}
                                        color={'white'} backgroundColor={'transparent'} borderWidth={2} onClick={() => {
                                            db.pakts.put({ ...pacto, accepted: true });
                                            navigate(0);
                                        }}>Aceptar</Button>
                                </Flex>
                            })}
                        </VStack>
                    </Card>
                    <Divider border="1px dashed black" mb={4} />
                </>
                }
                <Heading mb={2}>Buscar hogares</Heading>
                <VStack mx={4} w="90%">
                    <InputGroup w="70%">
                        <InputLeftAddon>
                            <Icon as={IoMdPin} boxSize={5} />
                        </InputLeftAddon>
                        <Input placeholder='Filtrar por ubicación' onChange={(e) => { setSearch(e.target.value) }} />
                    </InputGroup>
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

                {result.map((homeowner) => {
                    return <TarjetaHogar ratingFilter={ratingSearch} homeowner={homeowner} key={homeowner.username + homeowner.password} />;
                })}
            </Container>
        </>
    );
}
