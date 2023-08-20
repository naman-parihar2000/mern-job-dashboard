import { param, body, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage(" COMPANY NAME IS REQUIRED "),
  body("position").notEmpty().withMessage(" POSITION IS REQUIRED "),
  body("jobLocation").notEmpty().withMessage(" JOB LOCATION IS REQUIRED "),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("INVALID STATUS VALUE "),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage(" INVALID JOB TYPE "),
]);

export const validIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("INVALID MONGODB ID");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`NO JOB WITH THIS ID: ${value} FOUND`);
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage(" NAME IS REQUIRED "),
  body("email")
    .notEmpty()
    .withMessage(" EMAIL IS REQUIRED ")
    .isEmail()
    .withMessage(" INVALID EMAIL FORMAT ")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("ERROR: USER ALREADY EXISTS");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("PASSWORD MUST BE 8 CHARACTERS LONG"),

  body("location").notEmpty().withMessage("LOCATION IS REQUIRED"),
  body("lastName").notEmpty().withMessage("LAST NAME IS REQUIRED"),
]);

export const validLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage(" EMAIL IS REQUIRED ")
    .isEmail()
    .withMessage(" INVALID EMAIL FORMAT "),
  body("password").notEmpty().withMessage(" PASSWORD IS REQUIRED "),
]);
