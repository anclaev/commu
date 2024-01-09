import { CreateSessionCommand, CreateSessionHandler } from './create-session';

/**
 * @ignore
 */
export const AuthCommandHandlers = [CreateSessionHandler];

/**
 * @ignore
 */
export const AuthCommands = [CreateSessionCommand];
