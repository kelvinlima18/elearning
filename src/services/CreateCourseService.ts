import { getCustomRepository } from 'typeorm';

import Course from '../models/Course';
import CoursesRepository from '../repositories/CoursesRepository';

import AppError from '../errors/AppError';
interface Request {
  name: string;
}

class CreateCourseService {
  public async execute({ name }: Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository);

    const findCourseInSameName = await coursesRepository.findByName(name);

    if (findCourseInSameName) {
      throw new AppError('This Course is already created');
    }

    const course = coursesRepository.create({
      name,
    });

    await coursesRepository.save(course);

    return course;
  }
}

export default CreateCourseService;
