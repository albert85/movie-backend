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

  const movie = await MovieModel.create(moviePayload);

  return handleResponse(res, 201, true, 'Movie was successfully saved', movie);
 }
}

export default Movies