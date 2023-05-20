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
    FormHelperText,
    VStack,
    Container,
    useColorModeValue,
} from '@chakra-ui/react';
import { ROUTES } from '../routes';
import { useUser } from '../UserContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import './styles.css'

export function EditProfile() {
    const navigate = useNavigate();
    const { user: realUser, save, setUser: setRealUser } = useUser();

    useEffect(() => {
        if (!realUser) {
            navigate(ROUTES.LOGIN, { relative: 'path' });
        }
    }, [navigate, realUser]);

    const [user, setUser] = useState(realUser || {});

    return <>
        <Navbar title='Edit Profile' />
        <Container bg={useColorModeValue("gray.100", "gray.700")} p={10} borderRadius={2} maxW="80ch" h="fit-content">
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb={4}>
                @{user?.username}
            </Heading>
            <VStack spacing={4}>
                <Flex w="100%" gap={4} mb={4}>
                    <FormControl>
                        <FormLabel>
                            First name
                        </FormLabel>
                        <Input defaultValue={user?.firstName} placeholder="First name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Last name
                        </FormLabel>
                        <Input defaultValue={user?.lastName} placeholder="Last name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                    </FormControl>
                </Flex>
                <FormControl>
                    <FormLabel>
                        Email address
                    </FormLabel>
                    <Input defaultValue={user?.email} type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Phone
                    </FormLabel>
                    <Input defaultValue={user?.phone} type="tel" onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>
                        More info about me
                    </FormLabel>
                    <Textarea defaultValue={user?.description} onChange={(e) => setUser({ ...user, description: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>
                        Pets I took care of
                    </FormLabel>
                    <Textarea defaultValue={user?.petsCared} onChange={(e) => setUser({ ...user, petsCared: e.target.value })} />
                </FormControl>
            </VStack>

            <Heading
                mt={8}
                size="lg"
                bgGradient='linear(to-r, red.400,pink.400)'
                bgClip='text'
            >
                My Next Trip
            </Heading>

            <Card bgGradient='linear(to-r, red.400,pink.400)' p={4} m={2}>
                <FormLabel color="white">
                    Location
                </FormLabel>
                <Input bg="white" color="gray.800" defaultValue={user?.nextTrip?.location} onChange={(e) => setUser({ ...user, nextTrip: { ...user.nexTrip, location: e.target.value } })} />

                <Flex m={8} gap={8}>
                    <Box>
                        <FormLabel color="white">
                            From:
                        </FormLabel>
                        <DatePicker className="datePicker" selected={user.nextTrip?.from} onChange={(from) => {
                            setUser({ ...user, nextTrip: { ...(user.nextTrip), from } });
                        }} />
                    </Box>

                    <Box>
                        <FormLabel color="white">
                            To:
                        </FormLabel>
                        <DatePicker className="datePicker" selected={user.nextTrip?.to} onChange={(to) => {
                            setUser({ ...user, nextTrip: { ...(user.nextTrip), to } });
                        }} />
                    </Box>
                </Flex>
            </Card>

            <Flex gap={4} mt={8} justifyContent="center" >
                <Button
                    onClick={() => {
                        navigate(ROUTES.HOMEOWNERS);
                    }}
                >
                    Back
                </Button>

                <Button colorScheme="red" onClick={() => {
                    setRealUser(user);
                    save(user);
                    navigate(ROUTES.HOMEOWNERS);
                }}
                >
                    Save
                </Button>
            </Flex>
        </Container >
    </>

}
