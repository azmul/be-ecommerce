import { object, string, boolean, array, ref } from "yup";

export const registerSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    phone: string().required("Phone is required"),
  }),
});

export const loginSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    phone: string().required("Phone is required"),
  }),
});

export const recoverPasswordSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    phone: string().required("Phone is required"),
    code: string().required("Code is required"),
  }),
});

export const changePasswordSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    confirm: string().oneOf([ref("password"), null], "Passwords must match"),
    current: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
  }),
});

export const sliderSchema = object({
  body: object({
    title: string()
      .required("title is required"),
    title_local: string().required("title is required"),
    subtitle: string()
      .required("subtitle is required"),
    subtitle_local: string().required("subtitle is required"),
    image: string()
      .required("image is required"),
    public_id: string()
      .required("public_id is required"),
    url: string()
      .required("url is required"),
  }),
});

export const testimonialSchema = object({
  body: object({
    title: string()
      .required("title is required"),
    title_local: string().required("title is required"),
    customer_name: string()
      .required("subtitle is required"),
    image: string()
      .required("image is required"),
    public_id: string()
      .required("public_id is required"),
    content: string()
      .required("url is required"),
    content_local: string().required("url is required"),
  }),
});

export const messageSchema = object({
  body: object({
    name: string()
      .required("title is required")
      .matches(/^[a-zA-Z0-9_.-]*$/, "title can only contain Latin letters."),
    phone: string()
      .required("subtitle is required")
      .matches(/^[a-zA-Z0-9_.-]*$/, "subtitle can only contain Latin letters."),
    message: string()
      .required("image is required")
      .matches(/^[a-zA-Z0-9_.-]*$/, "image can only contain Latin letters."),
  }),
});

export const activeSchema = object({
  body: object({
    is_active: boolean().required("is_active is required"),
  }),
});

export const emergencyCheckSchema = object({
  body: object({
    is_emergency: boolean().required("is_active is required"),
  }),
});

export const schedulesSchema = object({
  body: object({
    schedules: object({
      friday: array(),
      monday: array(),
      saturday: array(),
      sunday: array(),
      tuesday: array(),
      wednesday: array(),
      thursday: array(),
    }),
  }),
});
