import mongoose from 'mongoose'

export interface ReviewDocument extends mongoose.Document {
  product_name: string;
  product_id: string;
  product_image: string;
  product_numeric_id: number;
  reviews: Array<Object>;
  createdAt: Date;
  updatedAt: Date;
}

// {
//   is_approved: false,
//   cutomer_name: '',
//   cutomer_phone: '',
//   rating: null,
//   id: number, 
//   message: string,
// }

const reviewSchema = new mongoose.Schema({
    product_name: {
      type: String,
      default: null,
    },
    product_id: {
        type: String,
        default: null,
    },
    product_numeric_id: {
        type: Number,
        default: null,
    },
    product_image: {
      type: String,
      default: false,
    },   
    reviews: [{
      type: Object
    }]
}, {timestamps: true, versionKey: false });

const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);

export default Review;
