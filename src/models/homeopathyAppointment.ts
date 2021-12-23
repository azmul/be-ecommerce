import mongoose from 'mongoose'
export interface HomeopathyAppointmentDocument extends mongoose.Document {
    numeric_id: string;
    doctor_id: string;
    doctor_numeric_id: string;
    doctor_name: string;
    doctor_fees: number;
    schedule_id: string;
    doctor_profile_url: string;
    patient_id: string;
    patient_numeric_id: string;
    patient_name: string;
    patient_profile_url: string;
    link: string;
    created_at: string;
    time_slot: string;
    patient_type: string;
    patient_age: number;
    patient_gender: string;
    patient_body_color: string;
    patient_body_weight: string;
    patient_body_height: string;
    patient_diseases_description: string;
    patient_suggested_medicine: object;
    patient_rules_follow: string;
    past_illnesses_vaccination_development_history: string;
    patient_likes_dislike: string;
    patient_mental_emotional_state: string;
    patient_child: string;
    patient_body_affected: string;
    patient_disease_picture_url: String;
    is_cancel: boolean;
    cancel_reason: string;
    cancel_role: string;
    is_done_by_doctor: boolean;
    is_update_profile: boolean;
    is_payment_done: boolean;
    is_payment_check: boolean;
    payment_method: number;
    transaction_id: string;
    medicine_shipping_status: string;
    createdAt: Date;
    updatedAt: Date;
  }

const homeopathyAppointmentSchema = new mongoose.Schema({
    numeric_id: {
      type: String,
      default: null,
    },
    doctor_id: {
      type: String,
      default: null,
    },
    doctor_numeric_id: {
      type: String,
      default: null,
    },
    schedule_id: {
      type: String,
      default: null,
    },
    doctor_name: {
        type: String,
        default: null,
    },
    doctor_fees: {
        type: Number,
        default: null,
      },
      doctor_profile_url: {
        type: String,
        default: null,
      },
      patient_id: {
        type: String,
        default: null,
      },
      patient_numeric_id: {
        type: String,
        default: null,
      },
      patient_name: {
        type: String,
        default: null,
      },
      patient_gender: {
        type: String,
        default: null,
      },
      patient_age: {
        type: Number,
        default: null,
      },
      patient_body_color: {
        type: String,
        default: null,
      },
      patient_body_weight: {
        type: String,
        default: null,
      },
      patient_body_height: {
        type: String,
        default: null,
      },
      patient_profile_url: {
        type: String,
        default: null,
      },
    link: {
      type: String,
      default: null
    },
    created_at: {
        type: String,
        default: null
    },
    time_slot: {
      type: String,
      default: null
    },
    patient_type : {
      type: String,
      default: null
    },
    patient_diseases_description: {
        type: String,
        default: null,
    },
    patient_suggested_medicine: [
        {
            medicine_name: {
                type: String,
                default: null
            },
            medicine_power: {
                type: String,
                default: null
            },
            medicine_quantiy: {
                type: String,
                default: null
            },
            use_rules: {
                type: String,
                default: null 
            }
        }
    ],
    patient_rules_follow: {
        type: String,
        default: null,
    },
    past_illnesses_vaccination_development_history: {
       type: String,
       default: null
    },
    patient_likes_dislike: {
      type: String,
      default: null
   },
    patient_body_affected: {
        type: String,
        default: null
    },
    patient_child: {
      type: String,
      default: null
    },
    patient_mental_emotional_state: {
      type: String,
      default: null
    },
    patient_disease_picture_url: {
      type: String,
      default: null
    },
    is_cancel: {
        type: Boolean,
        default: false,
    },
    cancel_reason: {
        type: String,
        default: null,
    },
    cancel_role: {
        type: Number,
        default: null,
    },
    is_done_by_doctor: {
        type: Boolean,
        default: false,
    },
    is_payment_done: {
        type: Boolean,
        default: false,
    },
    is_payment_check: {
      type: Boolean,
      default: false,
    },
    payment_method: {
        type: Number,
        default: false,
    },
    transaction_id: {
        type: String,
        default: null,
        unique: true
    },
    medicine_shipping_status: {
        type: String,
        default: null,
    },
}, { timestamps: true, versionKey: false });

const HomeopathyAppointment = mongoose.model<HomeopathyAppointmentDocument>('HomeopathyAppointment', homeopathyAppointmentSchema);

export default HomeopathyAppointment;
