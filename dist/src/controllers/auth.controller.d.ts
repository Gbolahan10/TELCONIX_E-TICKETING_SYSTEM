import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import DatabaseService from '../services/database.service';
declare class AuthController {
    authService: AuthService;
    userService: DatabaseService;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthController;
