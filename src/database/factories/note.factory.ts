import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import NoteRepository from '../../repositories/note.repository';
import User from '../entity/user.entity';
import Note from '../entity/note.entity';

export default class NoteFactory {
  public static async create(user: User): Promise<Note> {
    const NoteRepo = getCustomRepository(NoteRepository);

    const created = NoteRepo.create({
      title: faker.lorem.sentence(5),
      content: faker.lorem.sentence(5),
      userId: user.id,
    });

    const saved = await NoteRepo.save(created);

    return saved;
  }
}
