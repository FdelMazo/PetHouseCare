import { Box, Card, CardBody, CardHeader, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const TarjetaCuidador = ({cuidador}) => {
  const navigate = useNavigate();
  return <Card width="80%" m={8} px={8} py={2} cursor="pointer" onClick={() => {
    navigate(`/caretakers/${cuidador.id}`, { relative: 'path' });
  }}>
    <CardHeader>
      <Heading size='md'>
        Cuidador/a @{cuidador.username}
      </Heading>
      {cuidador.nextTrip &&
        <Text bgGradient='linear(to-r, red.400,pink.400)' bgClip='text'>
          Viaja{cuidador.nextTrip.location ? ` a ${cuidador.nextTrip.location}` : ''} desde el {new Date(cuidador.nextTrip.from).toLocaleDateString('es-AR')} hasta el {new Date(cuidador.nextTrip.to).toLocaleDateString('es-AR')}
        </Text>}
    </CardHeader>
    <CardBody>
      <Flex gap={'30px'}>
        <Image src={process.env.PUBLIC_URL + '/watcher.png'} boxSize="100px" objectFit='cover' alt={"Perro"}/>
        <Box>
          <Text>{cuidador.firstName} {cuidador.lastName}</Text>
          <Text>{cuidador.description}</Text>
        </Box>
      </Flex>


    </CardBody>
  </Card>
}

export default TarjetaCuidador
