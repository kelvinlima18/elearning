import { v4 as uuid } from 'uuid';
import { Entity } from 'typeorm';

@Entity('courses')
class Course {
  id: string;

  name: string;

  image: string;

  constructor({ name, image }: Omit<Course, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.image = image;
  }
}

export default Course;
