import { Select, Table, Text, Tbody, Th, Thead, Tr, Button, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db } from '../db';
import { Roles } from './JoinOurTeam';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';


export default function ListaHogares() {
  const navigate = useNavigate();
  const [dueños, setDueños] = useState([]);

  useEffect(() => {
    const action = async () => {
        setDueños(await db.users.where('role').equals(Roles.DUEÑO).toArray());
      }
    action();

  },[]);


  return (

    <Flex style={{height: "90vh" }} flexDir="column">
        <Button alignSelf={"start"} onClick={() => navigate(ROUTES.PROFILE, {relative: 'path'})}>Edit Profile</Button>

        <Box height={"10rem"}/>


        <Select placeholder='Pais' size='md'>
            <option value='opt1'>Argentina</option>
        </Select>

        <Select placeholder='Ciudad' size='md'>
            <option value='opt1'>Buenos Aires</option>
            <option value='opt2'>Santa Fe</option>
        </Select>

        <Select placeholder='Calificación' size='md'>
                <option value='opt1'>1 estrella</option>
                <option value='opt2'>5 estrellas</option>
        </Select>

        <Select placeholder='Tipo de Mascota' size='md'>
                <option value='opt1'>Gatos</option>
                <option value='opt2'>Perros</option>
        </Select>
        <Text>
            .....
        </Text>
        <Table>
            <Thead>
                <Tr>
                    <Th> Dueño </Th>
                    <Th> Pais </Th>
                    <Th> Ciudad </Th>
                    <Th> Mascota </Th>
                    <Th> Calificación </Th>
                </Tr>
            </Thead>

            <Tbody>
                { dueños.map((dueño) => (
                <Tr>
                    { dueño.username }
                </Tr>
                ))}
            </Tbody>
        </Table>
    </Flex>
  );
}
