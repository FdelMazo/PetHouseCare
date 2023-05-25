import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, ROLES } from './db';
import { Navbar } from './Components/Navbar';
import { ROUTES } from './routes';
import { FaHandshake } from 'react-icons/fa';

function itsMyPact(pacto, user) {
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

            const _pacto = pactos.find((pacto) => fechaActual >= pacto.startDate && fechaActual <= pacto.endDate && itsMyPact(pacto, user))
            setPacto(_pacto);
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
        return find(pacto).username;
    };

    const findNumber = (find, pacto) => {
        return find(pacto).phone;
    };

    const findEmail = (find, pacto) => {
        return find(pacto).email;
    };


    const finder = user && user.role === ROLES.DUEÑO ? findCaretaker : findHomeOwner


    return <>
        <Navbar currentRoute={ROUTES.MIS_PACTOS} />
            <Container bg='gray.100' centerContent marginBottom={'30px'} borderRadius={2}
                       minW='75vw'
                       maxW='75vw' fontWeight={'700'} minH={'80vh'}>
                {pacto && user? <><Heading>Pacto actual</Heading>
                    <Flex flexDirection={'row'} alignItems={'center'} bg={'gray.300'} padding={'14px'} borderRadius={'10px'}
                          minW={'40%'} justifyContent={'space-between'}>
                        <Flex flexDirection={'column'}>
                        <Text>Nombre: {findName(finder,pacto)}</Text>
                        <Text>Numero: {findNumber(finder, pacto)}</Text>
                        <Text>Email: {findEmail(finder, pacto)}</Text>
                        <Text>From: {pacto.startDate.toLocaleDateString('es-AR')}</Text>
                        <Text>To: {pacto.endDate.toLocaleDateString('es-AR')}</Text>
                        </Flex>
                        <Icon as={FaHandshake} boxSize={'85px'} marginX={'3rem'} color={'blackAlpha.700'}/>
                    </Flex>
                    </>
                    : <Text>No tenés pactos activos</Text>
                }
            </Container>
    </>;
}