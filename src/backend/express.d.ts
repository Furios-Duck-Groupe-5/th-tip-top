// types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;  // ou `userId: string` si vous êtes sûr que `userId` sera toujours présent
    }
  }
}
