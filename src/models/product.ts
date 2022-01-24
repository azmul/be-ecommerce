import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  sku: string;
  name: string;
  name_local: string;
  price: number;
  discount: number;
  offerEnd: string;
  new: boolean;
  rating: number;
  saleCount: number;
  category: Array<string>;
  tag: Array<string>;
  variation: Array<object>;
  image: Array<string>;
  images: Array<object>;
  condition: string;
  isHomePage: boolean;
  shortDescription: string;
  shortDescription_local: string;
  fullDescriptionTitle: string;
  fullDescription: string;
  leftSide: Array<object>;
  rightSide: Array<object>;
  youtubeLink: string;
  id: number;
  is_active: boolean;
  is_normal_sell: boolean;
  is_flash_sell: boolean;
  is_campaign_sell: boolean;
  comment: string;
  last_updated_by: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProduuctSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    name_local: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    offerEnd: {
      type: String,
      default: null,
    },
    new: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    saleCount: {
      type: Number,
      default: 1,
    },
    category: [
      {
        type: String,
      },
    ],
    tag: [
      {
        type: String,
      },
    ],
    variation: {
      type: Object,
      default: null
    },
    image: [
      {
        type: String,
      },
    ],
    images: [
        {
          type: Object,
        },
      ],
    condition: {
      type: String,
      default: null,
    },
    isHomePage: {
       type: Boolean,
       default: false,
    },
    shortDescription: {
      type: String,
      default: null,
    },
    shortDescription_local: {
      type: String,
      default: null,
    },
    fullDescriptionTitle: {
      type: String,
      default: null,
    },
    fullDescription: {
      type: String,
      default: null,
    },
    youtubeLink: {
      type: String,
      default: null,
    },
    leftSide: [{
      type: Object,
      default: null,
    }],
    rightSide: [{
      type: Object,
      default: null,
    }],
    id: {
        type: Number,
    },
    is_active: {
       type: Boolean,
       default: true,
    },
    last_updated_by: {
        type: String,
        default: null,
    },
    comment: {
        type: String,
        default: null,
    },
    stock: {
      type: Number,
      default: 10,
    },
    is_normal_sell: {
      type: Boolean,
      default: true,
    },
    is_flash_sell: {
      type: Boolean,
      default: false,
    },
    is_campaign_sell: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model<ProductDocument>("Product", ProduuctSchema);

export default Product;
