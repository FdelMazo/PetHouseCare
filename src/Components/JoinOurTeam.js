import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    ButtonGroup,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../db';
import { IoIosPaw, IoIosHome } from "react-icons/io";
import React from 'react';

const Roles = {
    CUIDADOR: 'cuidador',
    DUEÑO: 'dueño'
};

export const JoinOurTeam = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
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
                    <Stack direction={'row'} spacing={4} align={'center'}>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Join PetHouseCare
                            <Text
                                as={'span'}
                                bgGradient='linear(to-r, red.400,pink.400)'
                                bgClip='text'>
                                !
                            </Text>
                        </Heading>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            {error &&
                                <Text
                                    fontFamily={'heading'}
                                    color="red"
                                    fontSize="smaller"
                                >
                                    {error}
                                </Text>
                            }
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
                                isAttached>
                                <Tooltip
                                    closeOnClick={false}
                                    label={<Text textAlign={"center"}>I'm a home owner <br />with pets to take care of</Text>}
                                    hasArrow
                                    placement={'left'}
                                >
                                    <IconButton
                                        {...(role === Roles.DUEÑO ? {
                                            _hover: { bgGradient: 'linear(to-r, red.400,pink.400)' },
                                            bgGradient: 'linear(to-r, red.400,pink.400)',
                                        } : {})}
                                        onClick={() => setRole(Roles.DUEÑO)}
                                        icon={<IoIosHome />}
                                        {...(!role && {
                                            borderRight: '1px dashed lightslategray'
                                        })}
                                    />
                                </Tooltip>
                                <Tooltip
                                    closeOnClick={false}
                                    label={<Text textAlign={"center"}>I'm a world traveller <br />pet care taker</Text>}
                                    hasArrow
                                    placement={'right'}>
                                    <IconButton
                                        {...(role === Roles.CUIDADOR ? {
                                            _hover: { bgGradient: 'linear(to-r, red.400,pink.400)' },
                                            bgGradient: 'linear(to-r, red.400,pink.400)',
                                        } : {})}
                                        onClick={() => setRole(Roles.CUIDADOR)}
                                        icon={<IoIosPaw />}
                                    />
                                </Tooltip>
                            </ButtonGroup>
                        </Stack>
                        <Button
                            onClick={async () => {
                                if (!username) {
                                    setError('Username cannot be empty')
                                    return
                                }
                                if (!password) {
                                    setError('Password cannot be empty')
                                    return
                                }
                                if (!role) {
                                    setError('Role cannot be empty')
                                    return
                                }
                                setError('')
                                await db.users.add(
                                    { username: username, password: password, role: role }
                              )
                                navigate('/home', { relative: 'path' });
                            }}
                            fontFamily={'heading'}
                            mt={4}
                            w={'full'}
                            bgGradient='linear(to-r, red.400,pink.400)'
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}>
                            Join now
                        </Button>
                        <Button
                            onClick={async () => {
                                if (!username) {
                                    setError('Username cannot be empty')
                                    return
                                }
                                if (!password) {
                                    setError('Password cannot be empty')
                                    return
                                }

                                const u = await db.users.where('username').equals(username).first()
                                if (!u) {
                                    setError('Username not found')
                                    return
                                }
                                if (u.password !== password) {
                                    setError('Incorrect password')
                                    return
                                }
                                setError('')
                                navigate('/home', { relative: 'path' });
                            }}
                            fontFamily={'heading'}
                            mt={2}
                            colorScheme="gray"
                            w={"20ch"}
                        >
                            Log in
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
        </Box>

    );
}
