/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document } from 'mongoose'

import { reviewSchema, ReviewDocument } from './Review'

export type ProductDocument = Document & {
  user: any[];
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: ReviewDocument[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  users: mongoose.Schema.Types.ObjectId[];
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ProductDocument>('Product', productSchema)
