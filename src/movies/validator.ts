/* eslint-disable no-useless-escape */
import { check } from 'express-validator';

const validateMovieBody = {
  createMovie: [
    check('title')
      .notEmpty()
      .withMessage('title must not be empty'),
    check('year')
      .notEmpty()
      .withMessage('year must not be empty'),
    check('movieId')
      .notEmpty()
      .withMessage('movieId must not be empty'),
    check('type')
      .notEmpty()
      .withMessage('type must not be empty'),
    check('poster')
      .notEmpty()
      .withMessage('poster must not be empty'),
  ],
};

export default validateMovieBody;
