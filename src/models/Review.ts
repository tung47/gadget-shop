import mongoose, { Document } from 'mongoose'

export type ReviewDocument = Document & {
  name: string;
  rating: number;
  comment: string;
  user: mongoose.Types.ObjectId;
}

export const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ReviewDocument>('Review', reviewSchema)
