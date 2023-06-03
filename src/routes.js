export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    HOMEOWNERS: '/homeowners',
    CARETAKERS: '/caretakers',
    CARETAKER: '/caretakers/:id',
    HOMEOWNER: '/homeowners/:id',
    PROFILE: '/profile',
    MIS_PACTOS: '/pacts',
    FORO: '/forum'
}

export const ROUTE_TITLES = {
  [ROUTES.LOGIN]: "Iniciar Sesión",
  [ROUTES.HOMEOWNERS]: "Hogares",
  [ROUTES.CARETAKERS]: "Cuidadores",
  [ROUTES.PROFILE]: "Mi Perfil",
  [ROUTES.MIS_PACTOS]: "Mis pactos",
  [ROUTES.FORO]: "Foro",
}

export const DUEÑO_ROUTES = [
  ROUTES.HOME,
  ROUTES.CARETAKERS,
  ROUTES.CARETAKER,
  ROUTES.PROFILE,
  ROUTES.MIS_PACTOS,
  ROUTES.FORO
]

export const CUIDADOR_ROUTES = [
    ROUTES.HOME,
    ROUTES.HOMEOWNERS,
    ROUTES.PROFILE,
    ROUTES.MIS_PACTOS,
    ROUTES.FORO
]

export const PUBLIC_ROUTES = [
    ROUTES.HOME,
    ROUTES.LOGIN
]
