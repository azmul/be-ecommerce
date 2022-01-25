import mongoose from "mongoose";

export interface SettingDocument extends mongoose.Document {
  call_us_number: string;
  free_delivery_money: string;
  contact_number1: string;
  contact_number2: string;
  business_email: string;
  business_site: string;
  business_main_address: string;
  facebook_link: string;
  youtube_link: string;
  twitter_link: string;
  instagram_link: string;
  pinterest_link: string;
  bkash_number: string;
  nagad_number: string;
  rocket_number: string;
  bkash_discount: number;
  nagad_discount: number;
  rocket_discount: number;
  is_campaign_sell: boolean;
  is_flash_sell: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const settingSchema = new mongoose.Schema(
  {
    call_us_number: {
      type: String,
      default: null,
    },
    free_delivery_money: {
      type: String,
      default: null,
    },
    contact_number1: {
      type: String,
      default: null,
    },
    contact_number2: {
      type: String,
      default: null,
    },
    business_email: {
      type: String,
      default: null,
    },
    business_site: {
      type: String,
      default: null,
    },
    business_main_address: {
      type: String,
      default: null,
    },
    facebook_link: {
      type: String,
      default: null,
    },
    youtube_link: {
      type: String,
      default: null,
    },
    twitter_link: {
      type: String,
      default: null,
    },
    instagram_link: {
      type: String,
      default: null,
    },
    pinterest_link: {
      type: String,
      default: null,
    },
    bkash_number: {
      type: String,
      default: null,
    },
    nagad_number: {
      type: String,
      default: null,
    },
    rocket_number: {
      type: String,
      default: null,
    },
    bkash_discount: {
      type: String,
      default: null,
    },
    nagad_discount: {
      type: String,
      default: null,
    },
    rocket_discount: {
      type: String,
      default: null,
    },
    is_campaign_sell: {
      type: Boolean,
      default: false,
    },
    is_flash_sell: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true, versionKey: false }
);

const Setting = mongoose.model<SettingDocument>("Setting", settingSchema);

export default Setting;
