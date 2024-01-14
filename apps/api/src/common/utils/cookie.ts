import { Cookie } from '@shared/interfaces/cookie';

export const cookieToString = (cookie: Cookie): string =>
  `${cookie.key}=${cookie.value}; ${cookie.httpOnly ? 'HttpOnly;' : ''} ${
    cookie.secure ? 'Secure;' : ''
  } Path=${cookie.path}; Max-Age=${cookie.maxAge}`;
