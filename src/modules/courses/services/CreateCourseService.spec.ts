import AppError from '@shared/errors/AppError';

import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import CreateCourseService from '../services/CreateCourseService';

describe('CreateCourse', () => {
  it('should be able to create a new course', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const createCourseService = new CreateCourseService(fakeCoursesRepository);

    const course = await createCourseService.execute({
      name: 'Ciência'
    });

    expect(course).toHaveProperty('id');
  });

  it('should not be able to create a new course in the same name', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const createCourseService = new CreateCourseService(fakeCoursesRepository);

    await createCourseService.execute({
      name: 'Ciência'
    });

    expect(
      createCourseService.execute({
        name: 'Ciência'
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
