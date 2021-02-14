import { Router } from 'express';

import coursesRouter from '@modules/courses/infra/http/routes/courses.routes';
import usersRouter from '@modules/users/infra/http/routes//users.routes';
import sessionsRouter from '@modules/users/infra/http/routes//sessions.routes';

const routes = Router();

routes.use('/courses', coursesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;