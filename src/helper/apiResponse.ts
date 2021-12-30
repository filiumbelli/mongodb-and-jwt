import { Response } from "express";

const HTTP_SUCCESS = 200;
const HTTP_VALIDATION_ERROR = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_ERROR = 500;

export const successResponse = (res: Response,msg: string) => {
    const data = {
        status: 1,
        message: msg
    }
    return res.status(HTTP_SUCCESS).json(data);
}

export const successResponseWithData = (res: Response,msg: string, data: any) => {
    const resData = {
        status: 1,
        message: msg,
        data
    };
    return res.status(HTTP_SUCCESS).json(resData);
}

export const unAuthorizedUserResponse = (res: Response,msg: string)  => {
    const resData = {
        status:0,
        message: msg,
    }
    return res.status(HTTP_UNAUTHORIZED).json(resData);
}

export const notFoundResponse = (res: Response,msg: string) => {
    const resData = {
        status: 0,
        message: msg
    };

    return res.status(HTTP_NOT_FOUND).json(resData);
}
export const validationErrorWithData = (res: Response,msg: string, data:any) => {
    const resData = {
        status: 0,
        message: msg,
        data: data
    }
    res.status(HTTP_VALIDATION_ERROR).json(resData);
}

export const errorResponse = (res: Response,msg: string) => {
    const resData = {
        status: 0,
        message: msg
    }
    res.status(HTTP_INTERNAL_ERROR).json(resData);
}

export const validationError = (res: Response, msg: string) => {
    const resData = {
        status: 0,
        message: msg
    }
    return res.status(HTTP_VALIDATION_ERROR).json(resData);
}