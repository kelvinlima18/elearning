import { container } from 'tsyringe';

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICourseRepository>('CoursesRepository', CoursesRepository);

container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
