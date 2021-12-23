import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../environment"

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, JWT_PRIVATE_KEY, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error?.message === "jwt expired",
      decoded: null,
    };
  }
}
