import { injectable, inject } from 'tsyringe';

import Course from '@modules/courses/infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
}

@injectable()
class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ name }: Request): Promise<Course> {

    const findCourseInSameName = await this.coursesRepository.findByName(name);

    if (findCourseInSameName) {
      throw new AppError('This Course is already created');
    }

    const course = await this.coursesRepository.create({
      name,
    });

    return course;
  }
}

export default CreateCourseService;
