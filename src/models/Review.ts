import mongoose, { Document } from 'mongoose'

export type ReviewDocument = Document & {
  name: string;
  rating: number;
  comment: string;
}

export const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
