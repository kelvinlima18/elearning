import Course from '../models/Course';

interface CreateCourseDTO {
  name: string;
  image: string;
}

class CoursesRepository {
  private courses: Course[];

  constructor() {
    this.courses = [];
  }

  public all(): Course[] {
    return this.courses;
  }

  public findByName(name: string): Course | null {
    const findCourse = this.courses.find(course => course.name === name);

    return findCourse || null;
  }

  public create({ name, image }: CreateCourseDTO): Course {
    const course = new Course({ name, image });

    this.courses.push(course);

    return course;
  }
}

export default CoursesRepository;
