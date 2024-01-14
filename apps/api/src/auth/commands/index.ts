import { CreateSessionCommand, CreateSessionHandler } from './create-session';
import { CreateCookieCommand, CreateCookieHandler } from './create-cookie';
import { SignInCommand, SignInHandler } from './sign-in';

import {
  VerifyPasswordCommand,
  VerifyPasswordHandler,
} from './verify-password';

import { RemoveSessionCommand, RemoveSessionHandler } from './remove-session';

/**
 * @ignore
 */
export const AuthCommandHandlers = [
  CreateSessionHandler,
  VerifyPasswordHandler,
  SignInHandler,
  CreateCookieHandler,
  RemoveSessionHandler,
];

/**
 * @ignore
 */
export const AuthCommands = [
  CreateSessionCommand,
  VerifyPasswordCommand,
  SignInCommand,
  CreateCookieCommand,
  RemoveSessionCommand,
];
