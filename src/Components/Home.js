import { useEffect } from 'react';
import { db } from '../db';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser () {
      const session = await db.session.toCollection().first();
      const user = session && (await db.users.where('id').equals(session.userId).first());
      let route;
      switch (user && user.role) {
        case 'dueño':
          route = ROUTES.CARETAKERS
          break;
        case 'cuidador':
          route = ROUTES.HOMEOWNERS
          break;
        default:
          route = ROUTES.LOGIN
      }
      navigate(route, { relative: 'path' });
    }
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
