import mongoose from "mongoose"
export interface OrderDocument extends mongoose.Document {
  cartTotalPrice: number;
  shippingStatus: number;
  products: Array<object>;
  userAddress: object;
  userRegistered: boolean;
  comment: string;
  paymentMethod: number;
  isPaymentDone: boolean;
  isPaymentCheck: boolean;
  transactionId: string;
  last_updated_by: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    cartTotalPrice: {
        type: Number,
        default: 0,
    },
    paymentMethod: {
        type: Number,
        default: 1,
    },
    shippingStatus: {
        type: Number,
        default: 1,
    },
    products: [{
        type: Object,
        default: null
    }],
    userAddress: {
        type: Object,
        default: null
    },
    comment: {
        type: String,
        default: null,
    },
    last_updated_by: {
        type: String,
        default: null,
    },
    userRegistered: {
        type: Boolean,
        default: false,
    },
    isPaymentDone: {
        type: Boolean,
        default: false,
    },
    isPaymentCheck: {
      type: Boolean,
      default: false,
    },
    transactionId: {
        type: String,
        default: null
    },
}, { timestamps: true, versionKey: false });

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;


