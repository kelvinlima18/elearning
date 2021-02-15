import { inject, injectable } from 'tsyringe';

import Course from '@modules/courses/infra/typeorm/entities/Course';
import AppError from '@shared/errors/AppError';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface RequestImage {
  course_id: string;
  imageFileName: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvaider: IStorageProvider
  ) {}

  public async execute({ course_id, imageFileName }: RequestImage): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Cant set image', 401);
    }

    if (course.image) {
      await this.storageProvaider.deleteFile(course.image);
    }

    const fileName = await this.storageProvaider.saveFile(imageFileName);

    course.image = fileName;

    await this.coursesRepository.save(course);

    return course;
  }
}

export default UpdateImageService;
