import { container } from 'tsyringe';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import UpdateImageService from '@modules/courses/services/UpdateImageService';
import CoursesController from '../controllers/CoursesController';

const coursesRouter = Router();
const coursesController = new CoursesController();

coursesRouter.use(ensureAuthenticated);
const upload = multer(uploadConfig);

// coursesRouter.get('/', async (request, response) => {
//   const courses = await coursesRepository.find();

//   return response.json(courses);
// });

coursesRouter.post('/', coursesController.create);

coursesRouter.patch('/image', upload.single('image'), async (request, response) => {
  const { course_id } = request.body;

  const updateFileService = container.resolve(UpdateImageService);

  const course = await updateFileService.execute({
    course_id,
    imageFileName: request.file.filename,
  });

  return response.json(course);
});


export default coursesRouter;
