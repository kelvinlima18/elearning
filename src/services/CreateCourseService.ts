import { getCustomRepository } from 'typeorm';

import Course from '../models/Course';
import CoursesRepository from '../repositories/CoursesRepository';

interface Request {
  name: string;
  image_id: string;
}

class CreateCourseService {
  public async execute({ name, image_id }: Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository);

    const findCourseInSameName = await coursesRepository.findByName(name);

    if (findCourseInSameName) {
      throw Error('This Course is already created');
    }

    const course = coursesRepository.create({
      name,
      image_id,
    });

    await coursesRepository.save(course);

    return course;
  }
}

export default CreateCourseService;
