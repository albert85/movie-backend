import { check } from 'express-validator';

const validateBody = {
  register: [
    check('firstName')
      .notEmpty()
      .withMessage('first name must not be empty'),
    check('lastName')
      .notEmpty()
      .withMessage('last name must not be empty'),
    check('password')
      .notEmpty()
      .withMessage('password must not be empty')
      .isLength({ min: 8})
      .withMessage('The password must be minimum of 8 characters')
      .isAlphanumeric()
      .withMessage('It must contain a combination atleast an alphabet and number'),
    check('email')
      .notEmpty()
      .withMessage('email must not be empty')
      .isEmail()
      .withMessage('Please supply a valid email address'),
  ],
  login: [
    check('email')
      .notEmpty()
      .withMessage('agentId must not be empty'),
    check('password')
      .notEmpty()
      .withMessage('password must not be empty'),
  ],
};

export default validateBody;
