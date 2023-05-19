import {
  Flex,
  Avatar,
  IconButton,
  useColorModeValue,
  Heading,
  useColorMode,
  AvatarBadge,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoIosHome, IoIosPaw } from 'react-icons/io';
import { ROLES } from '../db';

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
  const { user, setUser } = useUser();
  return (
    <Flex px={4} h={16} alignItems={'center'} justifyContent="space-between">
      <Heading fontSize={'2xl'}>
        {title}
      </Heading>
      <Flex>
        <ColorModeSwitcher px={4} />
        {user &&
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
            >
              <Avatar size="sm">
                <AvatarBadge
                  as={user.role === ROLES.CUIDADOR ? IoIosPaw : IoIosHome}
                  color="black"
                  boxSize={5}
                  border="none"
                />
              </Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => navigate(ROUTES.PROFILE, { relative: 'path' })}
              >
                Edit profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setUser(null)
                  navigate(ROUTES.LOGIN, { relative: 'path' })
                }}
              >Log out</MenuItem>
            </MenuList>
          </Menu>
        }
      </Flex>
    </Flex>
  );
}
