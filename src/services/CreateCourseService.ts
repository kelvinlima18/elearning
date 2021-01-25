import Course from '../models/Course';
import CoursesRepository from '../repositories/CoursesRepository';

interface Request {
  name: string;
  image: string;
}

class CreateCourseService {
  private coursesRepository: CoursesRepository;

  constructor(coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  public execute({ name, image }: Request): Course {
    const findCourseInSameName = this.coursesRepository.findByName(name);

    if (findCourseInSameName) {
      throw Error('This Course is already created');
    }

    const course = this.coursesRepository.create({
      name,
      image,
    });

    return course;
  }
}

export default CreateCourseService;
