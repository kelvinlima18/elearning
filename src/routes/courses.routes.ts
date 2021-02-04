import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CoursesRepository from '../repositories/CoursesRepository';
import CreateCourseService from '../services/CreateCourseService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateFileService from '../services/UpdateFileService';

const coursesRouter = Router();

coursesRouter.use(ensureAuthenticated);
const upload = multer(uploadConfig);

coursesRouter.get('/', async (request, response) => {
  const coursesRepository = getCustomRepository(CoursesRepository);
  const courses = await coursesRepository.find();

  return response.json(courses);
});

coursesRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createCourse = new CreateCourseService();

  const course = await createCourse.execute({ name });

  return response.json(course);
});

coursesRouter.patch('/image', upload.single('image'), async (request, response) => {
  const { course_id } = request.body;

  const updateFileService = new UpdateFileService();

  const course = await updateFileService.exeImage({
    course_id,
    imageFileName: request.file.filename,
  });

  return response.json(course);
});


export default coursesRouter;
