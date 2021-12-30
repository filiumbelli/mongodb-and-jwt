import User from "database/models/User";
import { Request, Response } from "express";
import { body, sanitizeBody, validationResult } from "express-validator";
import { errorResponse, successResponseWithData, validationErrorWithData } from "helper/apiResponse";
import logger from "winston";
export const register = [
    body("firstName").isLength({min: 2})
        .trim()
            .withMessage("First name must be specified")
        .isAlphanumeric()
            .withMessage("First name has non-alphanumeric characters."),
    body("username").isLength({min: 3})
        .trim()
            .withMessage("Username must be specified"),
    body("email").isLength({min: 1})
        .trim()
            .withMessage("Email must be specified")
        .isEmail()
            .withMessage("Email must be a valid email address.")
            .custom((value)=> {
                return User.findOne({email: value}).then((user)=> {
                    if(user) {
                        return Promise.reject("Account is already taken");
                    }
                })
            }),
    body("birthday")
        .isDate()
            .withMessage("Birthday must be valid")
        .custom((age: Date) => {
            const isAdult = (new Date().getFullYear() - age.getFullYear()) >= 18;
            if(!isAdult) {
                return Promise.reject("This app has age restriction.");
            }
        }),
    sanitizeBody("firstName").escape(),
    sanitizeBody("username").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("birthday").escape(),
    (req: Request, res: Response) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return validationErrorWithData(res,"Validation Error", errors.array());
            }else {
                var user = new User({
                    firstName: req.body.firstName,
                    username: req.body.username,
                    email: req.body.email,
                    birthday: req.body.birthday,
                });
                return successResponseWithData(res, "Registration is successfull!", user);
            }
        }catch(error: any | unknown | Error) {
            logger.error(error.message());
            return errorResponse(res,error);
        }
    }
];


