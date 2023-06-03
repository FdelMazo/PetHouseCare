import React, { useEffect, useState } from 'react';
import { db } from '../db';
import { ROUTES } from '../routes';
import { Navbar } from './Navbar';
import { Text, Box, Button, Container, Heading, Input, useColorModeValue, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Foro = () => {
  const [user, setUser] = useState(null);
  const [myComment, setMyComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const submitComment = async () => {
    await db.forumComments.add(
      { comment: myComment, name: `${user.firstName} ${user.lastName}` },
    );
  };

  const fetchComments = async () => {
    const comments = await db.forumComments.toArray();
    setAllComments(comments.sort((comment) => -comment.id));
  }

  useEffect(() => {
    async function fetch () {
      const session = await db.session.toCollection().first();
      const _user = await db.users.where('id').equals(session.userId).first();
      if (!_user) {
        navigate(ROUTES.LOGIN, { relative: 'path' });
      }
      setUser(_user);
      await fetchComments();
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <Navbar currentRoute={ROUTES.FORO} />
      <Container
        bg={useColorModeValue("gray.100", "gray.700")}
        centerContent
        mb={4}
        p={10}
        borderRadius={2}
        maxW="80%"
        h="fit-content"
      >
        <Heading mb={2}>Foro de comentarios</Heading>
        <Flex marginTop="30px" marginBottom="40px">
          <Input
            width="500px"
            placeholder='Comentario'
            background="#f8fcff"
            value={myComment}
            onChange={(event) => setMyComment(event.target.value)}
          />
          <Button marginLeft="8px" isDisabled={!myComment.trim()} onClick={async () => {
            await submitComment();
            setMyComment("");
            await fetchComments();
          }}>Publicar</Button>
        </Flex>
        {allComments.map(comment =>
          <Box
            key={comment.id}
            width="600px"
            border="solid 1px lightgrey"
            background="#f8fcff"
            borderRadius="5px"
            marginBottom="15px"
            padding="5px"
          >
            <Text fontSize="12px" fontWeight="bold" color="darkslategrey">{comment.name}</Text>
            <Text>{comment.comment}</Text>
          </Box>
        )}
      </Container>
    </>
  );
}