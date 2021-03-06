import express from 'express';
import { validate } from '../helpers/util';
import AuthCheck from '../helpers/validator';
import Movies from './services';
import validateMovieBody from './validator';

const route = express.Router();

route.route('/')
  .post(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkAuthStatus,
    validateMovieBody.createMovie,
    validate,
    Movies.createMovieList)
  .get(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkAuthStatus,
    Movies.getAllUserMovieList);

route.route('/:movieId')
  .get(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkAuthStatus,
    Movies.updateMovieList)
  .delete(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkAuthStatus,
    Movies.deleteMovieList);

export default route;