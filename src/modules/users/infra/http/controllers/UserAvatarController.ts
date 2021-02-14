import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateFileService = container.resolve(UpdateAvatarService);

  const user = await updateFileService.execute({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  });

  // @ts-expect-error
  delete user.password;

  return response.json(user);
  }
}
