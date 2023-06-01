import {
    Text,
    Box,
    Stack,
    Heading,
    Container,
    Input,
    Button,
    SimpleGrid,
    ButtonGroup,
    Tooltip,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db, ROLES } from '../db';
import { IoIosPaw, IoIosHome } from "react-icons/io";
import React from 'react';
import { ROUTES } from '../routes';
import { Navbar } from './Navbar';

export const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(role) {
        if (!username) {
            setError('El usuario es obligatorio');
            return;
        }
        if (!password) {
            setError('La contraseña es obligatoria');
            return;
        }
        if (await db.users.where('username').equalsIgnoreCase(username).first()) {
            setError('El usuario ya existe');
            return;
        }
        setError('');
        await db.users.add(
            { username: username, password: password, role: role },
        );
        const u = await db.users.where('username').equalsIgnoreCase(username).first();
        await db.session.clear();
        await db.session.add({userId: u.id});
        if (u.role === ROLES.DUEÑO) {
            navigate(ROUTES.CARETAKERS, { relative: 'path' });
        } else {
            navigate(ROUTES.HOMEOWNERS, { relative: 'path' });
        }
    }

    async function login() {
        if (!username) {
            setError('El usuario es obligatorio');
            return;
        }
        if (!password) {
            setError('La contraseña es obligatoria');
            return;
        }

        const u = await db.users.where('username').equalsIgnoreCase(username).first();
        if (!u || u.password !== password) {
            setError('Usuario o contraseña incorrectos');
            return;
        }
        setError('');
        await db.session.clear();
        await db.session.add({userId: u.id});
        if (u.role === ROLES.DUEÑO) {
            navigate(ROUTES.CARETAKERS, { relative: 'path' });
        } else {
            navigate(ROUTES.HOMEOWNERS, { relative: 'path' });
        }
    }

    return (
        <>
            <Navbar currentRoute={ROUTES.LOGIN} />
            <Box
                position={'relative'}
                textAlign='center'
                fontSize='xl'
            >
                <Container
                    as={SimpleGrid}
                    maxW={'7xl'}
                    columns={{ base: 1, md: 2 }}
                    spacing={12}
                    py={{ base: 10, sm: 20, lg: 32 }}>
                    <Stack
                        spacing={{ base: 10, md: 20 }}
                        justifyContent={'center'}
                    >
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                            La aplicación que conecta fans de las mascotas en{' '}
                            <Text
                                as={'span'}
                                bgGradient='linear(to-r, red.400,pink.400)'
                                bgClip='text'>
                                todo el mundo
                            </Text>
                        </Heading>
                    </Stack>
                    <Stack
                        bg={'gray.50'}
                        rounded={'xl'}
                        pb={4}
                        pt={8}
                        px={8}
                        spacing={2}
                        maxW={'lg'}
                        margin={'auto'}
                    >
                        <Heading
                            color={'gray.800'}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Sumate a Pet House Care
                            <Text
                                as={'span'}
                                bgGradient='linear(to-r, red.400,pink.400)'
                                bgClip='text'>
                                !
                            </Text>
                        </Heading>
                        <Text
                            fontFamily={'heading'}
                            color="red"
                            fontSize="smaller"
                            mb="12px !important"
                        >
                            {error || <br />}
                        </Text>
                        <Box as={'form'}>
                            <Stack spacing={4}>
                                <Input
                                    onChange={(event) => setUsername(event.target.value)}
                                    placeholder='Usuario'
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <Input
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder='Contraseña'
                                    type={'password'}
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />

                                <ButtonGroup
                                    justifyContent={'center'}
                                    isAttached
                                    w={'full'}
                                    color={useColorModeValue('var(--chakra-colors-chakra-body-text)', 'gray.800')}
                                >
                                    <Tooltip
                                        closeOnClick={false}
                                        label={<Text textAlign={"center"}>Soy dueño/a de hogar <br />con mascotas para cuidar</Text>}
                                        hasArrow
                                        placement={'top'}
                                    >
                                        <Button
                                            w={"22ch"}
                                            fontSize="sm"
                                            h={14}
                                            noOfLines={2}
                                            onClick={async () => {
                                                await register(ROLES.DUEÑO);
                                            }}
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                                boxShadow: 'xl',
                                            }}
                                            leftIcon={<Icon as={IoIosHome} boxSize={18} />}
                                            borderRight='1px dashed lightslategray'
                                        >
                                            <Text>Soy dueño de hogar</Text>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        closeOnClick={false}
                                        label={<Text textAlign={"center"}>Soy un viajero/a <br />con ganas de cuidar mascotas</Text>}
                                        hasArrow
                                        placement={'top'}
                                    >
                                        <Button
                                            w={"22ch"}
                                            h={14}
                                            noOfLines={2}
                                            fontSize="sm"
                                            onClick={async () => {
                                                await register(ROLES.CUIDADOR);
                                            }}
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                                boxShadow: 'xl',
                                            }}
                                            borderLeft='1px dashed lightslategray'
                                            rightIcon={<Icon as={IoIosPaw} boxSize={18} />}
                                        >
                                            <Text>Soy cuidador/a</Text>
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </Stack>

                            <Button
                                alignSelf={'flex-end'}
                                onClick={async () => {
                                    await login();
                                }}
                                mt={8}
                                variant={'link'}
                                colorScheme="gray"
                                w={"20ch"}
                                color={useColorModeValue('var(--chakra-colors-chakra-body-text)', 'gray.800')}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box >
        </>
    );
}
