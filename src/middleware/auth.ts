import { Request, Response, NextFunction, response } from "express";
import { unAuthorizedUserResponse, validationError, validationErrorWithData } from "helper/apiResponse";
import { verifyToken } from "helper/jwt";
import { request } from "http";
import { Session } from "inspector";
import jwt from "jsonwebtoken";


const authMiddleware = (req: Request, res: Response, next: NextFunction)  => {
    try {
        const requestHeader = "X-JWT-Token";
        const responseHeader = "X-Renewed-JWT-Token";
        const token = req.header(requestHeader);
        
        if(!token || !token?.startsWith("Bearer")) {
            unAuthorizedUserResponse(res, "Unauthorized user");
            return;
        }

        const decodedSession = verifyToken(token);

        if(decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
            unAuthorizedUserResponse(res,"Failed to decode or validate authorization token.");
            return;
        }
        const expiration: ExpirationStatus = checkTokenExpiration(decodedSession);

        if(expiration === "expired") {
            unAuthorizedUserResponse(res, "Token is expired");
            return;
        }
        
        let session : Session;

        if(expiration === "refresh") {
            const { token, expires, issued } = encodeSession(decodedSession);
            session = {
                ...decodedSession.session,
                expires: expires,
                issued: issued
            }
            res.setHeader(responseHeader, token);
        }else {
            session = decodedSession.session;
        }
        response.locals = {
            ...response.locals,
            session: session
        };
        next();
    } catch(error) {
        validationError(res, "Invalid data.");
    }
}

export default authMiddleware;