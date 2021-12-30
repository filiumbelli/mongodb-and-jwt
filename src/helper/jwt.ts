import e from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "winston";

const HOUR = 60 * 60;
export interface Session {
    id?: number;
    dateCreated?: number;
    username?: string;
    issued?: number;
    expiresIn?: number;
}
export type PartialSession = Omit<Session, "issued" | "expiresIn">;

export interface EncodeResult {
    token: string;
    expiresIn: number;
    issued: number;
}

export type DecodeResult = 
{
    type: "valid";
    session: Session;
} |
{
    type: "integrity-error"
} |
{
    type: "invalid-token"
};

export type ExpirationStatus = "expired" | "active" | "grace";

export const generateToken = (partialSession: PartialSession): string => {
    const issued = Date.now();
    const expiresIn = HOUR * 6;
    const session : Session = {
        ...partialSession,
        issued: issued,
        expiresIn: expiresIn
    }
    const token = jwt.sign(session, process.env.SECRET_KEY_JWT!);
    return token;
    // return {
    //     token: token,
    //     issued: issued,
    //     expiresIn: expiresIn
    // }
}

export const verifyToken = (token: string) => {

    let result :  Session
    try{
        result = JSON.parse(String(jwt.verify(token,process.env.SECRET_KEY_JWT!)));
    }catch(error:  any | Error) {
        if (error.message === "No token supplied" || error.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (error.message === "Signature verification failed" || error.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (error.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }

        throw e;
    }
    return {
        type: "valid",
        session: result
    }
}