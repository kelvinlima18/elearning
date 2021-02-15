import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com.br',
      password: '123456',
      user_type: 'adm'
    });

    const response = await authUser.execute({
      email: 'johndoe@email.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(
      authUser.execute({
        email: 'johndoe@email.com.br',
        password: '123456',
      })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com.br',
      password: '123456',
      user_type: 'adm'
    });

    expect(
      authUser.execute({
        email: 'johndoe@email.com.br',
        password: 'wrong-password',
      })).rejects.toBeInstanceOf(AppError);
  });
})
