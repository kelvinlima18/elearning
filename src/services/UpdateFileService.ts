import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import Course from '../models/Course';
import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';

interface RequestAvatar {
  user_id: string;
  avatarFileName: string;
}

interface RequestImage {
  course_id: string;
  imageFileName: string;
}

class UpdateFileService {
  public async exeAvatar({ user_id, avatarFileName }: RequestAvatar): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }

  public async exeImage({ course_id, imageFileName }: RequestImage): Promise<Course> {
    const coursesRepository = getRepository(Course);

    const course = await coursesRepository.findOne(course_id);

    if (!course) {
      throw new AppError('Cant set image', 401);
    }

    if (course.image) {
      const courseImageFilePath = path.join(uploadConfig.directory, course.image);
      const couserImageFileExistis = await fs.promises.stat(courseImageFilePath);

      if (couserImageFileExistis) {
        await fs.promises.unlink(courseImageFilePath);
      }
    }

    course.image = imageFileName;

    await coursesRepository.save(course);

    return course;
  }
}

export default UpdateFileService;
