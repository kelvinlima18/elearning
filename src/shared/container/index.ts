import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ICourseRepository>('CoursesRepository', CoursesRepository);

container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
