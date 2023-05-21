export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    HOMEOWNERS: '/homeowners',
    CARETAKERS: '/caretakers',
    CARETAKER: '/caretakers/:id',
    // HOMEOWNER: '/homeowners/:id',
    PROFILE: '/profile',
}

export const ROUTE_TITLES = {
  [ROUTES.LOGIN]: "Iniciar Sesión",
  [ROUTES.HOMEOWNERS]: "Hogares",
  [ROUTES.CARETAKERS]: "Cuidadores",
  [ROUTES.PROFILE]: "Mi Perfil",
}

export const DUEÑO_ROUTES = [
  ROUTES.HOME,
  ROUTES.CARETAKERS,
  ROUTES.CARETAKER,
  ROUTES.PROFILE
]

export const CUIDADOR_ROUTES = [
    ROUTES.HOME,
    ROUTES.HOMEOWNERS,
    ROUTES.PROFILE
]

export const PUBLIC_ROUTES = [
    ROUTES.HOME,
    ROUTES.LOGIN
]
