import { Box, Card, CardBody, CardHeader, Flex, Heading, Icon, Text, Badge } from '@chakra-ui/react';
import { IoIosPaw } from 'react-icons/io';
import ReactStars from 'react-stars';

const AdCard = () => {

  // ty chatgpt.
  const ads = [
    {
      "ad": "WingsAway",
      "text": "¡Despega hacia nuevas aventuras! Con WingsAway, descubre destinos increíbles para ti y tu mascota."
    },
    {
      "ad": "Pawsport",
      "text": "Viaja con estilo y comodidad. Pawsport, la aerolínea que cuida de tu mascota en cada vuelo."
    },
    {
      "ad": "PetJet",
      "text": "El viaje perfecto para tu fiel compañero. PetJet, donde el confort de tu mascota es nuestra prioridad."
    },
    {
      "ad": "FurFly",
      "text": "Explora el mundo con tu peludo amigo. FurFly, la agencia de viajes que hace realidad tus sueños de aventuras juntos."
    },
    {
      "ad": "WhiskAir",
      "text": "Vuela sin preocupaciones con tu gato consentido. WhiskAir, la aerolínea que entiende las necesidades felinas."
    },
    { "ad": "PetHeaven", "text": "Cuida el paraíso de tu mascota. En PetHeaven, encontramos todo lo que necesita para ser feliz y saludable." }, { "ad": "Paws & Claws", "text": "Más que una tienda de mascotas. Paws & Claws, donde tu amor por los animales se encuentra con productos de calidad." }, { "ad": "VetCare", "text": "El amor de un dueño, la experiencia de un veterinario. En VetCare, nos preocupamos por la salud y el bienestar de tu mascota." }, { "ad": "Happy Tails", "text": "Colas felices y dueños aún más felices. En Happy Tails, cuidamos de tu mascota como si fuera parte de nuestra familia." }, { "ad": "Purrfect Pets", "text": "Haz que tu mascota se sienta purrfecta. En Purrfect Pets, ofrecemos productos y servicios de alta calidad para tu fiel compañero." }, { "ad": "Bark Avenue", "text": "El lugar donde los perros son las estrellas. Bark Avenue, donde la elegancia y el estilo canino se encuentran." }, { "ad": "Whisker World", "text": "Explora el mundo felino en Whisker World. Tenemos todo lo que necesitas para consentir a tu gatito consentido." }, { "ad": "PawSolutions", "text": "Soluciones prácticas para dueños de mascotas. En PawSolutions, facilitamos tu vida y la de tu peludo amigo." }, { "ad": "Furry Friends", "text": "Porque los amigos peludos merecen lo mejor. Furry Friends, tu tienda de confianza para mimar a tu mascota." }, { "ad": "PetParadise", "text": "Un paraíso para tu mascota. En PetParadise, creamos experiencias mágicas para tu fiel compañero." }
  ]
  const idx = Math.floor(Math.random() * ads.length)
  return <>
    <Card width="80%" m={8} px={8} py={2} cursor="pointer"
      onClick={() => {
        window.open("https://github.com/FdelMazo/PetHouseCare/", "_blank")
      }}>
      <CardHeader py={2}>
        <Heading size='md'>
          <Badge colorScheme={"purple"} p={1}>Sponsored</Badge>
        </Heading>
      </CardHeader>
      <CardBody py={0}>
        <Flex gap={'30px'} alignItems={"center"}>
          <Icon as={IoIosPaw} boxSize="3em" />
          <Box>
            <Box css={{
              "& *": {
                fontSize: "larger !important",
              }
            }}>
              <ReactStars value={5} edit={false} />
            </Box>
            <Text>
              {ads[idx].ad}
            </Text>
            <Text color="grey">
              {ads[idx].text}
            </Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  </>
}

export default AdCard
