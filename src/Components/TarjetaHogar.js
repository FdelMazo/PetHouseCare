import { Box, Card, CardBody, CardHeader, Flex, Heading, Image, Text } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

const TarjetaHogar = ({ homeowner }) => {
  // const navigate = useNavigate();
  return <Card width="80%" m={8} px={8} py={2}
  // cursor="pointer" onClick={() => {
  // navigate(`/homeowners/${homeowner.id}`, { relative: 'path' });
  // }}
  >
    <CardHeader>
      <Heading size='md'>
        Hogar de @{homeowner.username}
      </Heading>
      {homeowner.home &&
        <Text bgGradient='linear(to-r, red.400,pink.400)' bgClip='text'>
          {homeowner.home.pets} necesita/n cuidador/a en {homeowner.home.location}
        </Text>}
    </CardHeader>
    <CardBody>
      <Flex gap={'30px'}>
        <Image src={process.env.PUBLIC_URL + '/home.png'} boxSize="100px" objectFit='cover' alt={"Perro"} />
        <Box>
          <Text>{homeowner.firstName} {homeowner.lastName}</Text>
          <Text>{homeowner.description}</Text>
        </Box>
      </Flex>


    </CardBody>
  </Card>
}

export default TarjetaHogar
