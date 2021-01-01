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
      type: mongoose.Schema.Types.String,
      ref: 'User',
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ReviewDocument>('Review', reviewSchema)
