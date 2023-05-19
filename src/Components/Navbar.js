import {
  Box,
  Flex,
  Avatar,
  IconButton,
  useColorModeValue,
  Heading,
  useColorMode,
  AvatarBadge,
} from '@chakra-ui/react';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoIosHome, IoIosPaw } from 'react-icons/io';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};


export const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <Flex px={4} h={16} alignItems={'center'} justifyContent="space-between">
      <Box />
      <Heading
        fontSize={'2xl'}>
        {title}
      </Heading>
      <Flex alignItems={'center'}>
        <ColorModeSwitcher px={4} />
        {user &&
          <Avatar
            cursor="pointer"
            size="sm"
            onClick={() => navigate(ROUTES.PROFILE, { relative: 'path' })}
          >
            <AvatarBadge
              as={user.role === 'cuidador' ? IoIosPaw : IoIosHome}
              color="black"
              boxSize={5}
              border="none"
            />
          </Avatar>
        }
      </Flex>
    </Flex>
  );
}
