import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: String,
  },
  movieId: {
    type: String,
  },
  type: {
    type: String,
  },
  poster: {
    type: String,
  },
});

const MovieModel = model('movies', movieSchema);

export default MovieModel;
