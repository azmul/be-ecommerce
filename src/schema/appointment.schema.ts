import { object, string, number, boolean, array } from "yup";

export const appointmentSchema = object({
    body: object({
      doctor_id: string().required("doctor_id is required"),
      doctor_name: string().required("doctor_name is required"),
      doctor_fees: number().required("doctor_fees is required"),
      patient_id: string().required("patient_id is required"),
      patient_name: string().required("patient_name is required"),
      patient_age: number().required("patient_age is required"),
      patient_gender: string().required("patient_gender is required"),
      patient_body_color: string().required("patient_body_color is required"),
      patient_body_weight: string().required("patient_body_weight is required"),
      patient_body_height: string().required("patient_body_height is required"),
      past_illnesses_vaccination_development_history: string().required("past_illnesses_vaccination_development_history is required"),
      patient_likes_dislike: string().required("patient_likes_dislike is required"),
      patient_mental_emotional_state: string().required("patient_mental_emotional_state is required"),
      patient_child: string().required("patient_child is required"),
      patient_body_affected: string().required("patient_body_affected is required"),
      created_at: string().required("created_at is required"),
      time_slot: string().required("time_slot is required"),
      patient_diseases_description: string().required("patient_diseases_description is required"),
      patient_type: string().required("patient_type is required"),
    }),
  });

  export const appointmentCancelSchema = object({
    body: object({
      is_cancel: boolean().required("is_cancel is required"),
      cancel_reason: string().required("cancel_reason is required"),
    }),
  });

  export const appointmentDoneSchema = object({
    body: object({
      patient_diseases_description: string().required("patient_diseases_description is required"),
      patient_rules_follow: string().required("patient_rules_follow is required"),
      patient_suggested_medicine: array(
        object({
            medicine_name: string().required("medicine_name is required"),
            medicine_power: string().required("medicine_power is required"),
            medicine_quantiy: string().required("medicine_quantiy is required"),
            use_rules: string().required("use_rules is required"),
        })
      )
    }),
  });

  export const paymentStatusSchema = object({
    body: object({
      is_payment_done: boolean().required("is_payment_done is required"),
    }),
  });

  export const shippingStatusSchema = object({
    body: object({
        medicine_shipping_status: string().required("medicine_shipping_status is required"),
    }),
  });

