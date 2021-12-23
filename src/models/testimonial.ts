import mongoose from "mongoose";
export interface TestimonialsDocument extends mongoose.Document {
  title: string;
  subtitle: string;
  image: string;
  url: string;
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
    content: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    customerName: {
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
