import { object, string, number, boolean, array } from "yup";

export const createMedicineOrderSchema = object({
    body: object({
      medicine_list: array(
        object({
            name: string().required("name is required"),
            power: string().required("power is required"),
            quantity: string().required("quantiy is required"),
            country: string().required("country is required"),
        })
      ),
      delivery_status: number().required("delivery_status is required"),
      customer_name: string().required("customer_name is required"),
      customer_id: string().required("customer_id is required"),
      customer_numeric_id: number().required("customer_numeric_id is required"),
      customer_address:  string().required("customer_address is required"),
      created_at:  string().required("created_at is required"),
    }),
  });