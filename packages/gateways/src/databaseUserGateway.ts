import { UserGateway } from 'vizhub-use-cases';

import { User, UserId } from 'vizhub-entities';

export class DatabaseUserGateway implements UserGateway {
  database: any;

  constructor(database) {
    this.database = database;
  }

  async createUser(user: User): Promise<User> {
    return await this.database.createUser(user);
  }

  async getUser(id: UserId) {
    return await this.database.getUser(id);
  }

  async getUserByUserName(userName: string) {
    return await this.database.getUserByUserName(userName);
  }
}
