import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import Course from '@modules/courses/infra/typeorm/entities/Course';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

interface RequestImage {
  course_id: string;
  imageFileName: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository
  ) {}

  public async execute({ course_id, imageFileName }: RequestImage): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id);

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

    await this.coursesRepository.save(course);

    return course;
  }
}

export default UpdateImageService;
