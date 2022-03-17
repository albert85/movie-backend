import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const UserModel = model('users', userSchema);

export default UserModel;
