import mongoose from "mongoose";
export interface BlogDocument extends mongoose.Document {
  title: string;
  url: string;
  title_local: string;
  content: string;
  content_local: string;
  content_items: Array<object>;
  admin_message: string;
  creator_name: string;
  like_count: number;
  picture_url: string;
  category: string;
  id: number;
  comment: string;
  last_updated_by: string;
  is_active: boolean;
  product_url: string;
  comments: Array<Object>;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    title_local: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    content: {
      type: Object,
      default: null,
    },
    content_local: {
      type: Object,
      default: null,
    },
    content_items: [{
      type: Object,
      default: null,
    }],
    admin_message: {
      type: Object,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    like_count: {
      type: Number,
      default: 0,
    },
    creator_name: {
      type: String,
      default: null,
    },
    product_url: {
      type: String,
      default: null,
    },
    picture_url: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    last_updated_by: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
    comments: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Blog = mongoose.model<BlogDocument>("Blog", blogSchema);

export default Blog;
