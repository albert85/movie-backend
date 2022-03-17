import { Request, Response} from 'express';
import MovieModel from './models/movies';
import { handleResponse } from '../helpers/util';

class Movies {
 static async createMovieList(req: Request, res: Response) {
   const moviePayload = {
     title: req.body.title,
     year: req.body.year,
     movieId: req.body.movieId,
     type: req.body.type,
     poster: req.body.poster,
   }

  //  check if movie as exceeded 10
  const movieCount = await MovieModel.countDocuments();

  if(movieCount >= 10){
    return handleResponse(res, 400, false, 'You have exceeded your Movie list either replace or delete one')
  }

  const checkIfExist = await MovieModel.findOne({ movieId: req.body.movieId });


  if(checkIfExist){
    return handleResponse(res, 400, false, 'Movie already exist on your list');
  }

  const movie = await MovieModel.create(moviePayload);

  return handleResponse(res, 201, true, 'Movie was successfully saved', movie);
}

static async getAllUserMovieList(req: Request, res: Response){
  const movies = MovieModel.find({
    userId: req.user.userId
  })
  return handleResponse(res, 201, true, 'Movie was successfully retrived', movies);
 }


static async updateMovieList(req: Request, res: Response){
  const checkIfExist = await MovieModel.findOne({ movieId: req.params.movieId, userId: req.user.userId });

  if(!checkIfExist){
    return handleResponse(res, 400, false, 'Movie do not exist on your list');
  }

  const moviePayload = {
    title: req.body.title,
    year: req.body.year,
    movieId: req.body.movieId,
    type: req.body.type,
    poster: req.body.poster,
  }

  await MovieModel.updateOne({
    movieId: req.params.movieId,
    userId: req.user.userId
  }, {
    ...moviePayload
  })
  return handleResponse(res, 201, true, 'Movie was successfully updated');
 }

static async deleteMovieList(req: Request, res: Response){
  const checkIfExist = await MovieModel.findOne({ movieId: req.params.movieId, userId: req.user.userId });

  if(!checkIfExist){
    return handleResponse(res, 400, false, 'Movie do not exist on your list');
  }


  await MovieModel.deleteOne({
    movieId: req.params.movieId,
    userId: req.user.userId
  })
  return handleResponse(res, 201, true, 'Movie was successfully deleted');
 }


}

export default Movies