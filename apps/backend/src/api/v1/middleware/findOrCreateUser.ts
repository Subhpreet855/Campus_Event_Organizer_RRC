import type { User } from "@prisma/client";
import prisma from "../../../prismaClient";
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

/**
 * If a sessionToken is included in Authorization header, get userId from Clerk.
 * If user does not exist in the back-end database, add the user.
 */
export const findOrCreateUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const auth = getAuth(req);
        const clerkUserId = auth.userId;

        let backendUser: User | null = null;

        if (clerkUserId) {
            backendUser = await prisma.user.findUnique({
                where: { clerkUserId }
            });

            if (!backendUser) {
                backendUser = await prisma.user.create({
                    data: { clerkUserId }
                });
            }
        }

        (req as any).currentUser = backendUser;

        next();
    } catch (error) {
        next(error);
    }
};
