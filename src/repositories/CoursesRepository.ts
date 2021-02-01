import { EntityRepository, Repository } from 'typeorm';

import Course from '../models/Course';

@EntityRepository(Course)
class CoursesRepository extends Repository<Course> {
  public async findByName(name: string): Promise<Course | null> {
    const findCourse = await this.findOne({
      where: { name },
    });

    return findCourse || null;
  }
}

export default CoursesRepository;
