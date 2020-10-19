import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: Function;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model<UserDocument>('User', userSchema)
