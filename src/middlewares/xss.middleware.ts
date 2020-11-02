import { Request, Response } from 'express';

export function XSS() {
  return function (req: Request, res: Response, next: Function) {
    res.setHeader('X-XSS-Protection', '1');
    next();
  }
}