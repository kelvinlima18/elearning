import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com.br',
      password: '123456',
      user_type: 'adm'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com.br',
      password: '123456',
      user_type: 'adm'
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@email.com.br',
        password: '123456',
        user_type: 'adm'
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
