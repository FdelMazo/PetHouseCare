import { Box, Card, CardBody, CardHeader, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';
import { db } from '../db';
// import { useNavigate } from 'react-router-dom';

const TarjetaHogar = ({ homeowner, ratingFilter }) => {

  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const action = async () => {
      const _ratings = await db.homeownerRatings.where('homeownerId').equals(homeowner.id).toArray();
      setRatings(_ratings);
    };
    action();
  }, [homeowner.id]);


  const navigate = useNavigate();
  let avgRating = 0;
  if (ratings.length) {
    avgRating = (ratings.map((rating) => rating.rating).reduce((suma, rating) => suma + rating, 0) / ratings.reduce((suma, rating) => suma + 1, 0));
  }

  console.log(avgRating)
  console.log(avgRating < ratingFilter)
  return (avgRating < ratingFilter) ? <></> : <>
    <Card width='80%' m={8} px={8} py={2}
          cursor='pointer' onClick={() => {
      navigate(`/homeowners/${homeowner.id}`, { relative: 'path' });
    }}
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
          <Image src={process.env.PUBLIC_URL + '/home.png'} boxSize='100px' objectFit='cover' alt={'Perro'} />
          <Box>
            <Text>{homeowner.firstName} {homeowner.lastName}</Text>
            <Text>{homeowner.description}</Text>
            {<ReactStars
              value={avgRating} onChange={() => {}} edit={false}/>}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  </>;
};

export default TarjetaHogar;
