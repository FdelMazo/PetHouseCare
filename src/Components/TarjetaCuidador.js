import { Card, CardBody, CardHeader, Flex, Heading, Image } from '@chakra-ui/react';

const TarjetaCuidador = ({cuidador}) => {
  return <Card width={"50%"} margin={"20px"}>
    <CardHeader>
      <Heading size='md'>
        Caretaker
      </Heading>
    </CardHeader>
    <CardBody>
      <Flex gap={'30px'}>
        <Image src={process.env.PUBLIC_URL + '/watcher.png'} boxSize="100px" objectFit='cover' alt={"Perro"}/>
          <h1 style={{
            textAlign: 'center',
            verticalAlign: 'middle'
          }}>{cuidador.username}</h1>
      </Flex>

    </CardBody>
  </Card>
}

export default TarjetaCuidador
