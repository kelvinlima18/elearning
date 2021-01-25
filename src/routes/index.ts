import { Router } from 'express';
import coursesRouter from './courses.routes';

const routes = Router();

routes.use('/courses', coursesRouter);

export default routes;
