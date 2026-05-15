import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement JWT authentication
  // For now, allow all requests - will implement actual JWT later
  next();
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement RBAC - check if user has required role
    // For now, allow all requests - will implement actual RBAC later
    next();
  };
};
