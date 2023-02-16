import { NextFunction, Request, Response } from 'express';

export function sessionPolyfill(req: Request, res: Response, next: NextFunction) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (callback: Function) => {
      callback();
    };
  }

  if (req.session && !req.session.save) {
    req.session.save = (callback: Function) => {
      callback();
    };
  }

  return next();
}
