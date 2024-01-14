import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { Employee } from '@prisma/client';

import { GetEmployeeQuery } from '../../employee/queries/get-employee';

import { SignInDto } from '../../common/types/dtos';
import { VerifyPasswordCommand } from './verify-password';

export class SignInCommand {
  constructor(public readonly dto: SignInDto) {}
}

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  async execute({ dto }: SignInCommand): Promise<Employee> {
    const { login, password } = dto;

    const user = await this.queryBus.execute<GetEmployeeQuery, Employee>(
      new GetEmployeeQuery({
        login,
      })
    );

    await this.commandBus.execute<VerifyPasswordCommand, boolean>(
      new VerifyPasswordCommand({
        password,
        hashed: user.password,
      })
    );

    return user;
  }
}
