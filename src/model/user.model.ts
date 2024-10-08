import mongoose, { Schema, Document } from "mongoose";

//Extending Document type from mongoose
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
  resetVerifyCode: string;
  resetVerifyCodeExpiration: Date;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    require: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
      "Please use valid email address",
    ],
  },
  password: {
    type: String,
    require: [true, "Password is require"],
  },
  verifyCode: {
    type: String,
    require: [true, "Verify code is require"],
  },
  verifyCodeExpiry: {
    type: Date,
    require: [true, "Verify code expiry is require"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
  resetVerifyCode: {
    type: String,
  },
  resetVerifyCodeExpiration: {
    type: Date,
  },
});
 // Next Js is edge framework so we have to check everytime before connect
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
