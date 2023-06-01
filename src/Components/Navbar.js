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
  Icon,
  Text,
  Box
} from '@chakra-ui/react';
import { CUIDADOR_ROUTES, DUEÑO_ROUTES, PUBLIC_ROUTES, ROUTE_TITLES, ROUTES } from '../routes';
import { useNavigate, Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoIosHome, IoIosPaw, IoIosArrowBack } from 'react-icons/io';
import { db, ROLES } from '../db';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

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

export const Navbar = ({ backTo, currentRoute }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const [user, setUser] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const average = (ratings) => {
    return ratings.length ? ratings.map((rating) => rating.rating).reduce((suma, rating) => suma + rating, 0) / ratings.reduce((suma, rating) => suma + 1, 0) : 0
  }

  useEffect(() => {
    async function fetchUser () {
      const session = await db.session.toCollection().first();
      const _user = session && (await db.users.where('id').equals(session.userId).first());
      setUser(_user);
      switch (_user && _user.role) {
        case 'dueño':
          setRoutes(DUEÑO_ROUTES)
          setAvgRating(average(await db.homeownerRatings.where('homeownerId').equals(_user.id).toArray()));
          break;
        case 'cuidador':
          setRoutes(CUIDADOR_ROUTES)
          setAvgRating(average(await db.caretakerRatings.where('caretakerId').equals(_user.id).toArray()));
          break;
        default:
          setRoutes(PUBLIC_ROUTES)
      }
    }
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? (
    <Flex px={4} h={20} alignItems={'center'} justifyContent="space-between">
      <Heading fontSize={'2xl'} display="flex">
        {backTo && <Icon as={IoIosArrowBack} cursor="pointer" color="pink.500" onClick={() => navigate(backTo, { relative: 'path' })} mr={2} />}
        {routes.map(route => {
          const title = ROUTE_TITLES[route];
          return (title && currentRoute &&
            <Link
              key={route}
              to={route}
              style={{ fontWeight: currentRoute === route ? 800 : 400, paddingRight: '10px' }}
            >{title}</Link>
          );
        })}
      </Heading>
      <Flex>
        <ColorModeSwitcher px={4} />
        {user &&
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              _hover={{ textDecoration: 'none' }}
            >
              <Avatar size="sm">
                <AvatarBadge
                  as={user.role === ROLES.CUIDADOR ? IoIosPaw : IoIosHome}
                  color={colorMode === 'light' ? 'black' : 'pink.500'}
                  boxSize={5}
                  border="none"
                />
              </Avatar>
              <Text fontSize="xs" alignSelf='center' mt={1}>
                {`@${user?.username}`}
                {avgRating > 0 && (
                  <Box css={{
                    "& span": {
                      fontSize: "large !important",
                    },
                    "& div": {
                      display: "flex",
                      justifyContent: "center",

                    }
                  }}>
                    <ReactStars value={avgRating} edit={false} />
                  </Box>
                )}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={async () => {
                  await db.session.clear();
                  navigate(ROUTES.LOGIN, { relative: 'path' })
                }}
              >Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        }
      </Flex>
    </Flex>
  ) : <></>
}
