import { object, string, number } from "yup";

  export const updateProfileSchema = object({
    body: object({
      name: string().required("Name is required"),
      email: string()
      .email("Must be a valid email")
      .required("Email is required"),
      gender: string().required("Gender is required"),
      birth_day: string().required("birth_day is required"),
      city: string().required("city is required"),
      thana: string().required("thana is required"),
      street: string().required("street is required"),
      post_code: number().required("post_code is required"),
      about_your_self: string().required("about_your_self is required"),
    }),
  });


