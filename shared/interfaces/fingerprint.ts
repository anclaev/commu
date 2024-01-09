import { FingerprintResult } from 'express-fingerprint';
import { Request as ExpressRequest } from 'express';

export type Fingerprint = FingerprintResult;

export interface IRequest extends ExpressRequest {
  fingerprint: Fingerprint;
}
