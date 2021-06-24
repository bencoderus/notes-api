import {
  okResponse,
  badRequestResponse,
  validationErrorResponse,
  serverErrorResponse,
  notFoundResponse,
  createdResponse,
} from "../../utils/response/index";
import { Response, Request } from "express";
import { extractValidationMessage, slugify } from "../../utils/helpers/index";
import NoteRepository from "../../repositories/note.repository";
import { getCustomRepository } from "typeorm";
import Note from "../../entity/note.entity";
import NoteValidator from "../validators/note.validator";

export default class NoteController {
  public static async index(
    request: Request,
    response: Response
  ): Promise<Response> {
    const NoteRepo = getCustomRepository(NoteRepository);
    const notes: Note[] = await NoteRepo.find();

    return okResponse(response, "Notes retrieved successfully", notes);
  }

  public static async create(
    request: Request,
    response: Response
  ): Promise<Response> {
    const NoteRepo = getCustomRepository(NoteRepository);
    const user = request.user;
    const data = request.body;

    const { error } = NoteValidator.validate(data);

    if (error) {
      const message: string = extractValidationMessage(error);
      return validationErrorResponse(response, "Validation error", {
        error: message,
      });
    }

    const note = NoteRepo.create({
      title: data.title,
      content: data.content,
      userId: user,
    });

    const created = await NoteRepo.save(note);

    return createdResponse(response, "Note created successfully", created);
  }

  public static async show(
    request: Request,
    response: Response
  ): Promise<Response> {
    const id = request.params.id;
    const NoteRepo = getCustomRepository(NoteRepository);

    const note: Note | undefined = await NoteRepo.findOne({ id });

    if (!note) {
      return notFoundResponse(response, "Note was not found");
    }

    return okResponse(response, "Note retrieved successfully", note);
  }

  public static async update(
    request: Request,
    response: Response
  ): Promise<Response> {
    const id = request.params.id;
    const NoteRepo = getCustomRepository(NoteRepository);
    const note: Note | undefined = await NoteRepo.findOne({ id });

    if (!note) {
      return notFoundResponse(response, "Note was not found");
    }

    const data = request.body;

    const { error } = NoteValidator.validate(data);

    if (error) {
      const message: string = extractValidationMessage(error);
      return validationErrorResponse(response, "Validation error", {
        error: message,
      });
    }

    await NoteRepo.update(
      { id: note.id },
      {
        title: data.title,
        content: data.content,
      }
    );

    return okResponse(response, "Note updated successfully", note);
  }

  public static async delete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const id = request.params.id;
    const NoteRepo = getCustomRepository(NoteRepository);
    const note: Note | undefined = await NoteRepo.findOne({ id });

    if (!note) {
      return notFoundResponse(response, "Note was not found");
    }

    await NoteRepo.delete({ id: note.id });

    return okResponse(response, "Note deleted successfully");
  }
}
