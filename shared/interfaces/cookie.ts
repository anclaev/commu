export interface Cookie {
  key: string;
  value: string;
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  path?: string;
  sameSite?: string;
}
