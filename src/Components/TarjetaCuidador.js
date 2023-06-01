import { Box, Card, CardBody, CardHeader, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoIosPaw } from 'react-icons/io';
import { db } from '../db';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';

const TarjetaCuidador = ({ cuidador, ratingFilter }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const action = async () => {
      const _ratings = await db.caretakerRatings.where('caretakerId').equals(cuidador.id).toArray();
      setRatings(_ratings);
    };
    action();
  }, [cuidador.id]);

  const navigate = useNavigate();

  let avgRating = 0;
  if (ratings.length) {
    avgRating = (ratings.map((rating) => rating.rating).reduce((suma, rating) => suma + rating, 0) / ratings.reduce((suma, rating) => suma + 1, 0));
  }


  return (avgRating < ratingFilter) ? <></> : <>
    <Card width="80%" m={8} px={8} py={2} cursor="pointer" onClick={() => {
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
        <Flex gap={'30px'} alignItems={"center"}>
          <Icon as={IoIosPaw} boxSize="3em" />
          <Box>
            {avgRating > 0 && (
              <Box css={{
                "& *": {
                  fontSize: "larger !important",
                }
              }}>
                <ReactStars value={avgRating} edit={false} />
              </Box>
            )}
            <Text>{cuidador.firstName} {cuidador.lastName}</Text>
            <Text color='grey'>{cuidador.description}</Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  </>
}

export default TarjetaCuidador
