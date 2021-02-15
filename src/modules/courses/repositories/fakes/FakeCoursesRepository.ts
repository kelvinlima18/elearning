import { v4 as uuid } from 'uuid';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';

import Course from '@modules/courses/infra/typeorm/entities/Course';

class CoursesRepository implements ICoursesRepository {
  private courses: Course[] = [];

  public async findByName(name: string): Promise<Course | undefined> {
    const findCourse = this.courses.find(course => course.name === name);

    return findCourse;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const findCourse = this.courses.find(course => course.id === id);

    return findCourse;
  }

  public async create({ name }: ICreateCourseDTO): Promise<Course> {
    const course = new Course();

    Object.assign(course, { id: uuid(), name });

    this.courses.push(course);

    return course;

  }

  public async save(course: Course): Promise<Course> {
    const findIndex = this.courses.findIndex(findUser => findUser.id === course.id);

    this.courses[findIndex] = course;

    return course;
  }
}

export default CoursesRepository;
