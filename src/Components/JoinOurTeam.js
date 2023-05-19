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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../db';
import { IoIosPaw, IoIosHome } from "react-icons/io";
import React from 'react';
import { useUser } from '../UserContext';
import { ROUTES } from '../routes';

export const Roles = {
    CUIDADOR: 'cuidador',
    DUEÑO: 'dueño'
};

export const JoinOurTeam = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useUser();

    async function register(role) {
        if (!username) {
            setError('Username cannot be empty');
            return;
        }
        if (!password) {
            setError('Password cannot be empty');
            return;
        }
        setError('');
        await db.users.add(
            { username: username, password: password, role: role },
        );
        const u = await db.users.where('username').equals(username).first();
        setUser(u);
        if (u.role === Roles.DUEÑO) {
            navigate(ROUTES.OWNER_HOME, { relative: 'path' });
        } else {
            navigate(ROUTES.CARETAKER_HOME, { relative: 'path' });
        }
    }

    async function login() {
        if (!username) {
            setError('Username cannot be empty');
            return;
        }
        if (!password) {
            setError('Password cannot be empty');
            return;
        }

        const u = await db.users.where('username').equals(username).first();
        if (!u) {
            setError('Username not found');
            return;
        }
        if (u.password !== password) {
            setError('Incorrect password');
            return;
        }
        setError('');
        setUser(u);
        if (u.role === Roles.DUEÑO) {
            navigate(ROUTES.OWNER_HOME, { relative: 'path' });
        } else {
            navigate(ROUTES.CARETAKER_HOME, { relative: 'path' });
        }
    }

    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack
                    spacing={{ base: 10, md: 20 }}
                    justifyContent={'center'}
                >
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        The app that connects pet lovers all over the{' '}
                        <Text
                            as={'span'}
                            bgGradient='linear(to-r, red.400,pink.400)'
                            bgClip='text'>
                            world
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
                        Join PetHouseCare
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
                                placeholder='Username'
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder='Enter your password'
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
                                    label={<Text textAlign={"center"}>I'm a home owner <br />with pets to take care of</Text>}
                                    hasArrow
                                    placement={'top'}
                                >
                                    <Button
                                        onClick={async () => {
                                            await register(Roles.DUEÑO);
                                        }}
                                        _hover={{
                                            bgGradient: 'linear(to-r, red.400,pink.400)',
                                            boxShadow: 'xl',
                                        }}
                                        leftIcon={<IoIosHome />}
                                        borderRight='1px dashed lightslategray'
                                    >
                                        <Text>Join as a homeowner</Text>
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    closeOnClick={false}
                                    label={<Text textAlign={"center"}>I'm a world traveller <br />pet care taker</Text>}
                                    hasArrow
                                    placement={'top'}>
                                    <Button
                                        onClick={async () => {
                                            await register(Roles.CUIDADOR);
                                        }}
                                        _hover={{
                                            bgGradient: 'linear(to-r, red.400,pink.400)',
                                            boxShadow: 'xl',
                                        }}
                                        borderLeft='1px dashed lightslategray'
                                        rightIcon={<IoIosPaw />}
                                    >
                                        Join as a caretaker
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
                            Log in instead
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>

    );
}
