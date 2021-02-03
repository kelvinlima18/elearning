import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import CoursesRepository from '../repositories/CoursesRepository';
import CreateCourseService from '../services/CreateCourseService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const coursesRouter = Router();

coursesRouter.use(ensureAuthenticated);

coursesRouter.get('/', async (request, response) => {
  const coursesRepository = getCustomRepository(CoursesRepository);
  const courses = await coursesRepository.find();

  return response.json(courses);
});

coursesRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const createCourse = new CreateCourseService();

    const course = await createCourse.execute({ name });

    return response.json(course);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

coursesRouter.patch('/image', async (request, response) => {
  return response.json({ ok: true });
});


export default coursesRouter;
