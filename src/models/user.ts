import mongoose, { Schema, Document, Model } from 'mongoose';
import Koa from 'koa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser {
  username: string;
  hashedPassword?: string;
}

interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  serialize: () => any;
  generateToken: () => string;
}

interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password: string) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password: string) {
  const result = await bcrypt.compare(password, this.hashedPassword!);
  return result; // true / false
};

UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.statics.findByUsername = function(username: string) {
  return this.findOne({ username });
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
      {
        _id: this.id,
        username: this.username,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: '7d',
      },
  );
  return token;
}


const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default User;