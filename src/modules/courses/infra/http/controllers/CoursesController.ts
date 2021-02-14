import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourseService from '@modules/courses/services/CreateCourseService';

export default class CoursesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ name });

    return response.json(course);
  }
}
