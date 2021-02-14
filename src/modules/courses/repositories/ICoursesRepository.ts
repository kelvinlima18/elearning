import Course from '@modules/courses/infra/typeorm/entities/Course';
import ICreateCourseDTO from '../dtos/ICreateCourseDTO';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  save(course: Course): Promise<Course>;
  findByName(name: string): Promise<Course | undefined>;
  findById(id: string): Promise<Course | undefined>;
}
