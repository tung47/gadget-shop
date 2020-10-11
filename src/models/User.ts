import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    email: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<UserDocument>('User', userSchema)
