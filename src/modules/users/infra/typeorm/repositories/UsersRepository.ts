import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  async create(data: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create(data);

    this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }
}
