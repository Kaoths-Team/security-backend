import { Request, Response } from 'express';

export function NoCache() {
  return function (req: Request, res: Response, next: Function) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
  }
}