import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Flex,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Container,
    useColorModeValue,
} from '@chakra-ui/react';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { db, ROLES } from '../db';

export function MiPerfil() {
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
    const bg = useColorModeValue("gray.100", "gray.700");

    return user ? (<>
        <Navbar currentRoute={ROUTES.PROFILE} />
        <Container bg={bg} p={10} borderRadius={2} maxW="80ch" h="fit-content">
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb={4}>
                @{user?.username}
            </Heading>
            <VStack spacing={4}>
                <Flex w="100%" gap={4} mb={4}>
                    <FormControl>
                        <FormLabel>
                            Nombres
                        </FormLabel>
                        <Input defaultValue={user?.firstName} placeholder="First name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Apellidos
                        </FormLabel>
                        <Input defaultValue={user?.lastName} placeholder="Last name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                    </FormControl>
                </Flex>
                <FormControl>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <Input defaultValue={user?.email} type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Teléfono
                    </FormLabel>
                    <Input defaultValue={user?.phone} type="tel" onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>
                        Más información sobre mí
                    </FormLabel>
                    <Textarea defaultValue={user?.description} onChange={(e) => setUser({ ...user, description: e.target.value })} />
                </FormControl>
            </VStack>

            {user.role === ROLES.CUIDADOR && (
                <>
                    <Heading
                        mt={8}
                        size="lg"
                        bgGradient='linear(to-r, red.400,pink.400)'
                        bgClip='text'
                    >
                        Mi siguiente viaje
                    </Heading>

                    <Card bgGradient='linear(to-r, red.400,pink.400)' p={4} m={2}>
                        <FormLabel color="white">
                            Ubicación
                        </FormLabel>
                        <Input bg="white" color="gray.800" defaultValue={user?.nextTrip?.location} onChange={(e) => setUser({ ...user, nextTrip: { ...user.nexTrip, location: e.target.value } })} />

                        <Flex m={8} gap={8}>
                            <Box>
                                <FormLabel color="white">
                                    Desde:
                                </FormLabel>
                                <Input type="date" color="white" onChange={(e) => {
                                    setUser({ ...user, nextTrip: { ...(user.nextTrip), from: new Date(e.target.value) } });
                                }} value={user.nextTrip?.from.toISOString().split("T")[0]} />
                            </Box>

                            <Box>
                                <FormLabel color="white">
                                    Hasta:
                                </FormLabel>
                                <Input type="date" color="white" onChange={(e) => {
                                    setUser({ ...user, nextTrip: { ...(user.nextTrip), to: new Date(e.target.value) } });
                                }} value={user.nextTrip?.to.toISOString().split("T")[0]} />
                            </Box>
                        </Flex>
                    </Card>
                </>)}

            {user.role === ROLES.DUEÑO && (
                <>
                    <Heading
                        mt={8}
                        size="lg"
                        bgGradient='linear(to-r, red.400,pink.400)'
                        bgClip='text'
                    >
                        Mi Hogar
                    </Heading>

                    <Card bgGradient='linear(to-r, red.400,pink.400)' p={4} m={2}>
                        <FormLabel color="white">
                            Ubicación
                        </FormLabel>
                        <Input bg="white" color="gray.800" defaultValue={user?.home?.location} onChange={(e) => setUser({ ...user, home: { ...user.home, location: e.target.value } })} />

                        <Box m={8}>
                            <FormLabel color="white">
                                Mis Mascotas
                            </FormLabel>
                            <Input bg="white" color="gray.800" defaultValue={user?.home?.pets} onChange={(e) => setUser({ ...user, home: { ...user.home, pets: e.target.value } })} />
                        </Box>
                    </Card>
                </>)}

            <Flex gap={4} mt={8} justifyContent="center" >
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Atrás
                </Button>

                <Button colorScheme="red" onClick={async () => {
                    await db.users.put(user);
                    navigate(ROUTES.HOME);
                }}
                >
                    Guardar
                </Button>
            </Flex>
        </Container >
    </>) : <></>;
}
