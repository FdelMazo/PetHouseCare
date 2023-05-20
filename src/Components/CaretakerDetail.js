import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, StackDivider, Text, useColorModeValue } from '@chakra-ui/react';
import { db } from '../db';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ROUTES } from '../routes';

export const CaretakerDetail = () => {
  let { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);

  useEffect(() => {
    const action = async () => {
      setCaretaker(await db.users.get(parseInt(id)));
    }
    action();
  }, [id]);

  return (
    <>
      <Navbar title={`@${caretaker?.username}`} backTo={ROUTES.CARETAKERS} />
      <Container bg={useColorModeValue("gray.100", "gray.700")} centerContent p={10} borderRadius={2} maxW="80ch" h="fit-content">
        <Card>
          {caretaker ? (
            <>
              <CardHeader>
                <Heading size='lg'>{caretaker.firstName} {caretaker.lastName}</Heading>
                <Text fontSize='sm' color='grey'>Caretaker</Text>
              </CardHeader>
              <CardBody textAlign='left'>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Description
                    </Heading>
                    <Text paddingTop='2' fontSize='sm'>
                      {caretaker.description}
                    </Text>
                    <Heading size='xs' mt={2} textTransform='uppercase'>
                      Pets cared for
                    </Heading>
                  </Box>
                  {
                    caretaker.nextTrip &&
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                          Next trip
                        </Heading>
                        <Box paddingTop='2' flexDirection='row' display='flex'>
                          <Box flexShrink='0' marginRight='2' color='darkslategrey'>
                            <span>{new Date(caretaker.nextTrip.from).toLocaleDateString('es-AR')} ➜ {new Date(caretaker.nextTrip.to).toLocaleDateString('es-AR')}</span>
                          </Box>
                          <Box flexBasis='0.7' flexGrow='1'>
                            {caretaker.nextTrip?.location}
                          </Box>
                        </Box>
                    </Box>}
                </Stack>
              </CardBody>
            </>
          ) : (
            <Text>No se encontró cuidador/a</Text>
          )
          }
        </Card>
      </Container>
    </>
  );
}
