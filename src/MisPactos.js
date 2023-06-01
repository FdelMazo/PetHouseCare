import { Box, Card, CardBody, CardHeader, Container, Flex, Heading, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, ROLES } from './db';
import { Navbar } from './Components/Navbar';
import { ROUTES } from './routes';
import { FaEnvelope, FaHandshake, FaPhoneAlt } from 'react-icons/fa';

export function itsMyPact(pacto, user) {
    if (!user) return false;
    if (user.role === ROLES.DUEÑO) {
        return pacto.homeownerId === user.id
    }
    return pacto.caretakerId === user.id;
}

export function MisPactos() {
    const [pacto, setPacto] = useState(null);
    const navigate = useNavigate();
    const [homeowners, sethomeowners] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [user, setUser] = useState(null);
    const [misPactos, setMisPactos] = useState([]);

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
            sethomeowners(await db.users.where('role').equals(ROLES.DUEÑO).toArray());
            setCaretakers(await db.users.where('role').equals(ROLES.CUIDADOR).toArray());
            const pactos = await db.pakts.toArray();
            const fechaActual = new Date();

            const _pacto = pactos.find((pacto) => fechaActual >= pacto.startDate && fechaActual <= pacto.endDate && itsMyPact(pacto, user) && pacto.accepted)
            setPacto(_pacto);
            setMisPactos(pactos.filter(pact => itsMyPact(pact, user)));
        };
        action();
    }, [user]);

    function findHomeOwner(pacto) {
        return homeowners.find((homeowner) => homeowner.id === pacto.homeownerId);
    }

    function findCaretaker(pacto) {
        return caretakers.find((caretaker) => caretaker.id === pacto.caretakerId);
    }

    const findName = (find, pacto) => {
        return find(pacto).firstName ? (find(pacto).firstName + " " + find(pacto).lastName) : `@${find(pacto).username}`;
    };

    const findNumber = (find, pacto) => {
        return find(pacto).phone;
    };

    const findEmail = (find, pacto) => {
        return find(pacto).email;
    };


    const finder = user && user.role === ROLES.DUEÑO ? findCaretaker : findHomeOwner

    const Pacto = ({ pacto }) => {
        return <Card width="80%" m={8} px={8} py={2}>
            <CardHeader>
                <Heading size='md'>
                    {findName(finder, pacto)}
                </Heading>
                <Text bgGradient='linear(to-r, red.400,pink.400)' bgClip='text'>
                    Pacto desde el {new Date(pacto.startDate).toLocaleDateString('es-AR')} hasta el {new Date(pacto.endDate).toLocaleDateString('es-AR')}
                </Text>
            </CardHeader>
            <CardBody>
                <Flex gap={'30px'} alignItems={"center"}>
                    <Icon as={FaHandshake} boxSize="3em" />
                    <Box>
                        {findNumber(finder, pacto) && <Flex alignItems={"center"} mb={1}>
                            <Icon as={FaPhoneAlt} color="pink.400" boxSize={4} mr={2} />
                            <Text color='grey'>{findNumber(finder, pacto)}</Text>
                        </Flex>}
                        {findEmail(finder, pacto) && <Flex alignItems={"center"} mb={1}>
                            <Icon as={FaEnvelope} color="pink.400" boxSize={4} mr={2} />
                            <Text color='grey'>{findEmail(finder, pacto)}</Text>
                        </Flex>}
                    </Box>
                </Flex>
            </CardBody>
        </Card>


    }


    return <>
        <Navbar currentRoute={ROUTES.MIS_PACTOS} />
        <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent mb={4} p={10} borderRadius={2} maxW="80%" h="fit-content">
            <VStack w="80%">
                {(pacto && user) &&
                    <>
                        <Heading>Pacto actual</Heading>
                        <Pacto pacto={pacto} key={pacto.id} />
                    </>}

                {!!(misPactos.filter(pacto => pacto.startDate > (new Date()) && pacto.accepted).length) &&
                    <>
                        <Heading>Pactos a futuro</Heading>
                    {misPactos.filter(pacto => pacto.startDate > (new Date()) && pacto.accepted).map((pacto) => {
                        return <Pacto pacto={pacto} key={pacto.id} />
                    })
                    }
                    </>}

                {!!(misPactos.filter(pacto => pacto.endDate < (new Date()) && pacto.accepted).length) &&
                    <>
                        <Heading>Pactos pasados</Heading>
                        {misPactos.filter(pacto => pacto.endDate < (new Date()) && pacto.accepted).map((pacto) => {
                            return <Pacto pacto={pacto} key={pacto.id} />
                        })
                        }
                    </>}
            </VStack>
        </Container>

    </>
}
