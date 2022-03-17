import express from 'express';
import { validate } from '../helpers/util';
import AuthCheck from '../helpers/validator';
import Movies from './services';
import validateMovieBody from './validator';

const route = express.Router();

route.post('/',
  AuthCheck.checkAuthStatus,
  AuthCheck.checkAuthStatus,
  validateMovieBody.createMovie,
  validate,
  Movies.createMovieList);
  
route.get('/', AuthCheck.checkAuthStatus, AuthCheck.checkAuthStatus, Movies.getAllUserMovieList);

export default route;