import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image_id: string;
}

export default Course;
