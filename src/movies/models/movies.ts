import mongoose, { Schema, model } from 'mongoose';

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
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
});

const MovieModel = model('movies', movieSchema);

export default MovieModel;
