import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import UpdateImageService from '../services/UpdateImageService';

describe('UpdateImageCourse', () => {
  it('should be able to update image course', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateImageCourse = new UpdateImageService(fakeCoursesRepository, fakeStorageProvider);

    const course = await fakeCoursesRepository.create({
      name: 'Inglês'
    });

    await updateImageCourse.execute({
      course_id: course.id,
      imageFileName: 'image.jpg'
    });

    expect(course.image).toBe('image.jpg');
  });

  it('should not be able to update from non existing course', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateImageCourse = new UpdateImageService(fakeCoursesRepository, fakeStorageProvider);

    expect(
      updateImageCourse.execute({
        course_id: 'non-existing-course',
        imageFileName: 'image.jpg'
      })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old image when updating new one', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateImageCourse = new UpdateImageService(fakeCoursesRepository, fakeStorageProvider);

    const course = await fakeCoursesRepository.create({
      name: 'Inglês'
    });

    await updateImageCourse.execute({
      course_id: course.id,
      imageFileName: 'image.jpg'
    });

    await updateImageCourse.execute({
      course_id: course.id,
      imageFileName: 'image2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('image.jpg')
    expect(course.image).toBe('image2.jpg');
  });
})
