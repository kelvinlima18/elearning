import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  user_type: string;
}

class CreateUserService {
  public async execute({ name, email, password, user_type }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
      user_type,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
