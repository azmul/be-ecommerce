import mongoose from "mongoose";
export interface TestimonialsDocument extends mongoose.Document {
  title: string;
  title_local: string;
  content: string;
  content_local: string;
  image: string;
  customer_name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    title_local: {
      type: String,
      default: null,
    },
    content: {
        type: String,
        default: null,
    },
    content_local: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    public_id: {
      type: String,
      default: null,
    },
    customer_name: {
        type: String,
        default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Testimonial = mongoose.model<TestimonialsDocument>("Testimonial", testimonialSchema);

export default Testimonial;
