import React, { useState } from 'react';
import {
    Button,
    Card,
    Editable,
    EditableInput,
    EditablePreview,
    EditableTextarea,
    Flex,
    Text,
    Heading,
} from '@chakra-ui/react';
import { ROUTES } from '../routes';
import { useUser } from '../UserContext';
import * as PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';

function EditableField({ onChange, value, name }) {
    return <Card variant='filled' width='60%' p={1}>
        <Flex alignItems='center' justifyContent='space-between'>
            <Text>
                {name}:
            </Text>
            <Editable
                defaultValue={value}
                onChange={onChange}
                backgroundColor='white'
                minW='xs'
                borderRadius='7px'
                overflow='visible'
                px={1}
            >
                <EditablePreview minW='100%'>
                </EditablePreview>
                <EditableInput minW='100%'>
                </EditableInput>
            </Editable>
        </Flex>
    </Card>;
}

function EditableAreaField({ onChange, value, name, filled = true }) {
    return <Card variant='filled' width='60%' p={4}>
        <Flex flexDir='column'>
            <Text>
                {name}:
            </Text>
            <Editable
                defaultValue={value}
                onChange={onChange}
                width='md'
                backgroundColor='white'
                borderRadius='7px'
                m={2}
                px={1}
                overflow='visible'
            >
                <EditablePreview minW='100%' display='block' minH='10' backgroundColor='white'>
                </EditablePreview>
                <EditableTextarea backgroundColor='white'>
                </EditableTextarea>
            </Editable>
        </Flex>
    </Card>;
}


EditableField.propTypes = {
    user: PropTypes.any,
    onChange: PropTypes.func,
};

export function EditProfile() {
    const { user: realUser, save, setUser: setRealUser } = useUser();
    const [user, setUser] = useState(realUser);
    const navigate = useNavigate();

    return <>
        <Navbar title='Edit Profile' />
        <Flex backgroundColor={'gray.50'} justifyContent='center' padding='10'>
            <Card width='80%' padding={8}>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb={4}>
                    {user.username}
                </Heading>
                <Flex flexDir='column' alignItems='center' gap='7'>
                    <EditableField name='Email' value={user.email} onChange={(email) => setUser({ ...user, email })} />
                    <EditableField name='Phone' value={user.phone} onChange={(phone) => setUser({ ...user, phone })} />
                <EditableAreaField name='Pets that I took care of' value={user.petsCared} onChange={(petsCared) => setUser({ ...user, petsCared })} />
                <EditableAreaField name='More info about me' value={user.moreInfo} onChange={(moreInfo) => setUser({ ...user, moreInfo })} />
                <Card bgGradient='linear(to-r, red.400,pink.400)'>
                    <Flex alignItems='start' justifyContent='space-between' flexDir='column' minW='50%' height='100%' marginX='10' marginY='7'>
                        <Text color='white' fontWeight='bold' marginBottom='4'>
                            Next trip:
                        </Text>

                        <Flex alignItems='start' justifyContent='space-between' flexDir='column' minW='50%' height='100%' marginY='3' marginX='5'>
                            <Text>
                                Location:
                            </Text>
                            <Editable defaultValue={user.nextTrip?.location} width='md' backgroundColor='gray.50' borderRadius='7px' margin='4' overflow='visible' onChange={(location) => setUser({ ...user, nextTrip: { ...user.nexTrip, location } })}>
                                <EditablePreview minW='100%' display='block' minH='10' />
                                <EditableInput />
                            </Editable>
                            </Flex>
                            <Flex>
                                <Flex alignItems='start' justifyContent='space-between' flexDir='column' minW='50%' height='100%' marginX='5'>
                                    <Text>
                                        Beggining Date:
                                    </Text>
                                    <DatePicker borderRadius='7px' selected={user.nextTrip?.begginingDate} onChange={(begginingDate) => {
                                        setUser({ ...user, nextTrip: { ...(user.nextTrip), begginingDate } });
                                    }} />
                                </Flex>
                                <Flex alignItems='start' justifyContent='space-between' flexDir='column' minW='50%' height='100%' marginX='5'>
                                    <Text>
                                        End Date:
                                    </Text>
                                    <DatePicker borderRadius='7px' selected={user.nextTrip?.endDate} onChange={(endDate) => setUser({ ...user, nextTrip: { ...(user.nextTrip), endDate } })} />
                                </Flex>
                        </Flex>
                    </Flex>
                </Card>

                    <Flex gap={4}>
                        <Button
                            onClick={() => {
                                navigate(ROUTES.HOMEOWNERS);
                            }}
                        >
                            Back
                        </Button>

                        <Button backgroundColor='pink.400' color={'white'} onClick={() => {
                            setRealUser(user);
                            save(user);
                            navigate(ROUTES.HOMEOWNERS);
                        }}
                        >Save
                        </Button>
                    </Flex>
            </Flex>
        </Card>
        </Flex>
    </>
}
