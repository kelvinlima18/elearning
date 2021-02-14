import { getRepository, Repository } from 'typeorm';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';

import Course from '@modules/courses/infra/typeorm/entities/Course';

class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const findCourse = await this.ormRepository.findOne({
      where: { name },
    });

    return findCourse;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const findCourse = await this.ormRepository.findOne(id);

    return findCourse;
  }

  public async create({ name }: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create({ name });

    await this.ormRepository.save(course);

    return course;
  }

  public async save(course: Course): Promise<Course> {
    return await this.ormRepository.save(course);
  }
}

export default CoursesRepository;
