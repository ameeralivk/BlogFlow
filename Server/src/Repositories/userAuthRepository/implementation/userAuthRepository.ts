import { BaseRepository } from "../../BaseRepository";
import { IUserAuthRepository } from "../interface/IUserAuthRepository";
import { User, UserDocuments } from "../../../models/User";

export class UserAuthRepository
  extends BaseRepository<UserDocuments>
  implements IUserAuthRepository
{
  constructor() {
    super(User);
  }
  async createUser(data: Partial<UserDocuments>): Promise<UserDocuments> {
    return await this.create(data);
  }

  async findByEmail(email: string): Promise<UserDocuments | null> {
    return await this.findOne({ email } as any);
  }

  async findById(id: string): Promise<UserDocuments | null> {
    return await super.findById(id);
  }

  async updateUser(id: string, data: Partial<UserDocuments>): Promise<UserDocuments | null> {
    return await this.update(id, data);
  }
}
