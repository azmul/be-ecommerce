import mongoose from 'mongoose'

export interface HomeopathyMedicineOrderDocument extends mongoose.Document {
  order_numeric_id: number;
  medicine_list: object;
  medicine_bill: number;
  delivery_status: number;
  customer_name: string;
  customer_id: string;
  customer_numeric_id: string;
  customer_address: string;
  customer_phone: string;
  created_at: string;
  is_payment: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const homeopathyMedicineOrder = new mongoose.Schema({
   order_numeric_id: {
      type: Number,
      default: null,
    },
    medicine_list: [
        {
            name: {
                type: String,
                default: null
            },
            power: {
                type: String,
                default: null
            },
            quantity: {
                type: String,
                default: null
            },
            country: {
                type: String,
                default: null 
            }
        }
    ],
    medicine_bill: {
      type: Number,
      default: 0,
    },   
    delivery_status: {
      type: Number,
      default: null
    },   
    customer_name: {
      type: String,
      default: null
    },  
    customer_id: {
      type: String,
      default: null
    },   
    customer_numeric_id: {
      type: String,
      default: null
    },   
    customer_address: {
      type: String,
      default: null
    },
    customer_phone: {
        type: String,
        default: null
    },
    created_at: {
      type: String,
      default: null
    },
    is_payment: {
      type: Boolean,
      default: false
    }
}, {timestamps: true, versionKey: false });

const HomeopathyMedicineOrder = mongoose.model<HomeopathyMedicineOrderDocument>('HomeopathyMedicineOrder', homeopathyMedicineOrder);

export default HomeopathyMedicineOrder;
