import TarjetaHogar from './TarjetaHogar';
import { Input, Container, useColorModeValue, Text, Flex, Heading, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { db, ROLES } from '../db';
import { Navbar } from './Navbar';
import './styles.css';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router-dom';

export function ListaHogares() {
    const [homeowners, sethomeowners] = useState([]);
    const [search, setSearch] = useState('');
    const [pactos, setPactos] = useState([]);
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
            homeowner.home.location.toLowerCase().includes(search.toLowerCase()),
        );
    }


    function findHomeOwner(pacto) {
        return homeowners.find((homeowner) => homeowner.id === pacto.homeownerId);
    }

    const findName = (pacto) => {
        return findHomeOwner(pacto).username;
    };
    const searcher = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Navbar currentRoute={ROUTES.HOMEOWNERS} />
            <Container bg={useColorModeValue('gray.100', 'gray.700')} centerContent p={10} borderRadius={2} minW='75vw'
                       maxW='75vw' h='fit-content'>

                <Heading>Estos cuidadores quieren hacer un pacto contigo</Heading>
                <Container bgGradient='linear(to-r, red.400,pink.400)' padding='17px' margin='17px' borderRadius='14px'>
                    {(!pactos.filter((pacto) => !pacto.accepted && pacto.caretakerId === user.id).length) ? <Text color={'white'}>No hay pactos para aceptar</Text>
                        : pactos.filter((pacto) => !pacto.accepted && pacto.caretakerId === user.id).map((pacto) => {
                        return <Flex justifyContent={'space-between'}>
                            <Text color={'white'} fontSize={'25'} fontWeight={'800'}>{findName(pacto)}</Text>
                            <Button color={'white'} backgroundColor={'transparent'} borderWidth={3} onClick={() => {
                                db.pakts.put({ ...pacto, accepted: true });
                                navigate(0);
                            }}>Aceptar</Button>
                        </Flex>;
                    })}
                </Container>
                <Heading>Buscar cuidadores</Heading>
                <Input bg='white' color='gray.800' placeholder='Ubicación' value={search} onChange={searcher} />
                {result.map((homeowner) => {
                    return <TarjetaHogar homeowner={homeowner} key={homeowner.username + homeowner.password} />;
                })}
            </Container>
        </>
    );
}
