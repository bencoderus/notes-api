import { EntityRepository, Repository } from "typeorm";
import User from "../database/entity/user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findByUsername(username: string) {
    return this.findOne({ username });
  }
}
