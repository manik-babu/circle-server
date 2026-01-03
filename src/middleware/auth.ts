import { NextFunction, Request, Response } from "express"
import { auth as betterAuth } from '../lib/auth';

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })

            if (!session) {
                return res.status(401).json({
                    message: "You are not authorized"
                });
            }
            if (!roles.includes(session.user.role as UserRole)) {
                return res.status(401).json({
                    success: false,
                    message: "You don't have permission to access"
                });
            }

            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified
            }
            console.log(req.user);

            next();
        } catch (error: any) {
            console.error('Server error: ', error.message);
            res.status(500).json({
                success: false,
                message: 'Internal server error!',
                errors: error.message
            });
        }

    }
}

export default auth;