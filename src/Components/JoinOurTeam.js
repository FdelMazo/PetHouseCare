import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    useBreakpointValue,
    Icon, Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../db';

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
                            <Select
                                placeholder={'Selecciona rol'}
                                bg={'gray.100'}
                                color={'gray.500'}
                                onChange={(event) => setRole(event.target.value)}>
                                <option value={Roles.CUIDADOR}>CUIDADOR/A</option>
                                <option value={Roles.DUEÑO}>DUEÑO/A</option>
                            </Select>
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
                            mt={8}
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

export const Blur = (props) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height='560px'
            viewBox='0 0 528 560'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}>
            <circle cx='71' cy='61' r='111' fill='#F56565' />
            <circle cx='244' cy='106' r='139' fill='#ED64A6' />
            <circle cy='291' r='139' fill='#ED64A6' />
            <circle cx='80.5' cy='189.5' r='101.5' fill='#ED8936' />
            <circle cx='196.5' cy='317.5' r='101.5' fill='#ECC94B' />
            <circle cx='70.5' cy='458.5' r='101.5' fill='#48BB78' />
            <circle cx='426.5' cy='-0.5' r='101.5' fill='#4299E1' />
        </Icon>
    );
};
