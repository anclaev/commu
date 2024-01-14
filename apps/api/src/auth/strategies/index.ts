import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

export const AuthStrategies = [LocalStrategy, JwtStrategy, JwtRefreshStrategy];
