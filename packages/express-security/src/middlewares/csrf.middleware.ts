import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@astlaure/express-common';
import Tokens from 'csrf';

const ignoredMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];
const tokens = new Tokens();

export async function csrf(req: Request, res: Response, next: NextFunction) {
  // setup initial csrf data
  if (req.session && !req.session._csrf) {
    const secret = await tokens.secret();
    req.session._csrf = { secret };
  }

  res.cookie('XSRF-TOKEN', tokens.create(req.session!._csrf.secret), { httpOnly: false });

  if (ignoredMethods.includes(req.method.toUpperCase())) {
    return next();
  }

  const token = req.header('X-XSRF-TOKEN') || req.body._csrf;

  if (!token || !tokens.verify(req.session!._csrf.secret, token)) {
    return next(new HttpError(403, "BAD CSRF."));
  }

  return next();
}
