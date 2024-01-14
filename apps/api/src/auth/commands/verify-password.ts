import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

export type VerifyPasswordDto = {
  password: string;
  hashed: string;
};

export class VerifyPasswordCommand {
  constructor(public readonly dto: VerifyPasswordDto) {}
}

@CommandHandler(VerifyPasswordCommand)
export class VerifyPasswordHandler
  implements ICommandHandler<VerifyPasswordCommand>
{
  async execute({ dto }: VerifyPasswordCommand): Promise<boolean> {
    const { password, hashed } = dto;

    const isPassowrdMatching = await bcrypt.compare(password, hashed);

    if (!isPassowrdMatching)
      throw new BadRequestException('Wrong credentials provided');

    return isPassowrdMatching;
  }
}
