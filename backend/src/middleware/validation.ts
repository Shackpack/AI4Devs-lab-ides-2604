import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        return res.status(400).json({
          error: 'Validation error',
          details: (error as any).errors
        });
      }
      return res.status(400).json({ error: 'Validation error' });
    }
  };
};
