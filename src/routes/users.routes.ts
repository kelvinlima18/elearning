import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateFileService from '../services/UpdateFileService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password, user_type } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    user_type,
  });

  // @ts-expect-error
  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateFileService = new UpdateFileService();

  const user = await updateFileService.exeAvatar({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  });

  // @ts-expect-error
  delete user.password;

  return response.json(user);
});

export default usersRouter;
